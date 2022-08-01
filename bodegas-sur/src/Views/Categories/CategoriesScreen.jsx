import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllproducts, getProductsByCategory } from "../../Api/products";
import CardsComponent from "../../components/CardsComponent";
import NavBarComponent from "../../components/NavBarComponent";

const CategoriesScreen = (props) => {
  const { idCategory } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsByCategories();
  }, [idCategory]);

  const getProductsByCategories = () => {
    getProductsByCategory(idCategory)
      .then((resp) => {
        if (resp.status === "ERROR") {
          console.log("ERROR", resp);
        } else {
          const result = resp.products;
          console.log("RESULTADO FILTRO", result);

          setProducts(result);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <NavBarComponent />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {products.length > 0 ? (
          products.map((item, index) => (
            <div
              key={index}
              style={{
                marginLeft: "5%",
              }}
            >
              <CardsComponent item={item} />
            </div>
          ))
        ) : (
          <div>
            <h1>No hay productos en esta categoria</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriesScreen;
