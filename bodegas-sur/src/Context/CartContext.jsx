import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import Swal from "sweetalert2";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  let navigate = useNavigate();

  const [cartList, setCartList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addItemCart = (item, qty) => {
    let amountTotalByItem = item.cost * qty;
    const filterData = cartList.filter((itemCart) => itemCart.id == item.id);
    if (filterData.length <= 0) {
      setCartList([
        ...cartList,
        {
          qty: qty,
          ...item,
          amountTotalByItem,
        },
      ]);
    } else {
      filterData[0].qty = filterData[0].qty + qty;
      amountTotalByItem = item.cost * filterData[0].qty;
      setCartList(filterData);
    }
    setTotalAmount(totalAmount + amountTotalByItem);
  };
  const qtyCart = cartList.length;

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const getOrderToBd = async () => {
    try {
      const docRef = await addDoc(collection(db, "orderPurchase"), {
        id: makeid(10),
        items: cartList,
      });
      console.log("Orden de compra guardada", docRef.id);
      Swal.fire({
        title: `Su Orden de compra es ${docRef.id}`,
      });
    } catch (error) {
      console.error(error, "ERROR orden de  compra");
    }
  };

  const deleteProductCart = (productId) => {
    const filterData = cartList.filter((item) => item.id !== productId);
    let amountTotalByItem = 0;
    filterData.map((element) => {
      amountTotalByItem += element.cost * element.qty;
    });
    setTotalAmount(amountTotalByItem);
    setCartList(filterData, { amountTotalByItem });
  };

  const cleanCart = () => {
    setCartList([]);
    setTotalAmount(0);
  };
  return (
    <CartContext.Provider
      value={{
        addItemCart,
        deleteProductCart,
        qtyCart,
        cartList,
        totalAmount,
        cleanCart,
        getOrderToBd,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
