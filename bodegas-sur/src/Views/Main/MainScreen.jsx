import React from "react";
import CardsComponent from "../../components/CardsComponent";
import NavBarComponent from "../../components/NavBarComponent";

const MainScreen = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    getAllproducts()
      .then((resp) => {
        if (resp.status === "ERROR") {
          console.log("error");
        } else {
          console.log(resp);
          setProducts(resp.products);
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
        {products.length > 0
          ? products.map((item, index) => (
              <div
                key={index}
                style={{
                  marginLeft: "5%",
                }}
              >
                <CardsComponent item={item} />
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default MainScreen;
