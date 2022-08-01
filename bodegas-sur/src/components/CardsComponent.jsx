import {
  Button,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Css/CardsStyles.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { currencyFormatter } from "../../utils/Money";

const CardsComponent = (props) => {
  const navigate = useNavigate();

  const { item } = props;

  console.log("ITEMS =Z?", item);

  const imageProduct = item.image[0];

  console.log("imagen? =>", imageProduct);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        py: "10%",

        flexWrap: "nowrap",
        maxWidth: "296px",

        "&:hover": {
          border: 5,
          borderColor: "rgba(200,200,200,0.5)",
          borderRadius: 10,
          backgroundColor: "#fffffff1",
        },
      }}
    >
      <Grid
        item
        md={12}
        sm={12}
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "296px",
          maxWidth: "400px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          sx={{
            py: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",

            width: "100%",
          }}
        >
          <Card
            sx={{
              display: "flex",
              width: 40,
              height: 40,
            }}
          >
            <IconButton
              variant="contained"
              sx={{
                borderRadius: 1,
              }}
            >
              <FavoriteIcon
                fontSize="medium"
                color="info"
                sx={{
                  opacity: 0.5,
                  "&:hover": {
                    color: "red",
                  },
                }}
              />
            </IconButton>
          </Card>
        </Grid>
        <CardMedia
          component="img"
          height="350"
          image={item.image}
          alt="image"
        />
        <Grid
          item
          xs={10}
          md={10}
          sm={10}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: 30,
            width: "100%",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: "Poppins",
              color: "darkGray",
            }}
          >
            {item.brand["name"]}
          </Typography>
        </Grid>
        <Grid>
          <Typography
            variant="body1"
            sx={{
              fontSize: 16,
              fontWeight: "500",
              fontFamily: "Poppins",
              color: "black",
            }}
          >
            {item.name}
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: 20,
              fontWeight: "600",
              fontFamily: "Poppins",
              color: "black",
            }}
          >
            Precio {currencyFormatter(item.cost, "$")}
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontSize: 12,
              fontWeight: "500",
              fontFamily: "Poppins",
            }}
          >
            Valoración
          </Typography>
          <Rating
            name="simple-controlled"
            value={0}
            onChange={(event, newValue) => {
              "";
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button
            component={Link}
            to={`/products/${item.id}`}
            variant="contained"
            sx={{
              borderRadius: 3,
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Poppins",
                fontSize: 15,
                fontWeight: "600",
                "&:hover": {
                  color: "black",
                },
              }}
            >
              Ver producto
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
    // <div className="card">
    //   <figure>
    //     <img src={item.image} alt="imagen" />
    //   </figure>
    //   <section className="details">
    //     <div className="product-name">
    //       <h1>
    //         <p>{item.name}</p>
    //       </h1>
    //       <h1 className="price">$ {item.cost}</h1>
    //     </div>

    //     <div className="options">
    //       <div className="product_description">
    //         <h1>formato</h1>
    //         <p>{item.capacity}ml</p>
    //       </div>

    //       <div className="product_description">
    //         <h1>Stock</h1>
    //         <p>{item.stock} unidades</p>
    //       </div>
    //     </div>
    //     <Link to={`/products/${item.id}`} className="btn">
    //       ver detalles
    //     </Link>
    //   </section>
    // </div>
  );
};

export default CardsComponent;
