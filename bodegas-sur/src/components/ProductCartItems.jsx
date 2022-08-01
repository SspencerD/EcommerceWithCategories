import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, ButtonGroup } from "@mui/material";
import { currencyFormatter } from "../../utils/Money";
import { useCart } from "../hooks/useCart";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const ProductCardItems = (props) => {
  const { deleteProductCart } = useCart();
  const { item, index } = props;

  const [quantity, setQuantity] = useState(null);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteProductCart(item.id);
  };

  const addQuantity = (e) => {
    e.preventDefault();
    setQuantity(quantity + 1);
  };
  const lessQuantity = (e) => {
    e.preventDefault();
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    setQuantity(item.qty);
  }, [item]);

  return (
    <Paper
      elevation={6}
      key={index}
      sx={{
        p: 2,
        mt: 1,
        maxWidth: 480,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            pr: "5%",
            maxHeight: "30%",
          }}
        >
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="imagen producto" src={item.image} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{
                  fontSize: 16,
                  fontWeight: "500",
                  fontFamily: "Poppins",
                }}
              >
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                align="left"
                sx={{
                  width: 230,
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  fontSize: 12,
                  fontWeight: "500",
                  fontFamily: "Poppins",
                }}
              >
                {item.brand["name"]}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  fontSize: 12,
                  fontWeight: "Bold",
                  fontFamily: "Poppins",
                }}
              >
                {item.capacity}ml
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              sx={{
                pt: "5%",
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  fontSize: 14,
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  pr: "18%",
                }}
              >
                {quantity} unidades
              </Typography>
              <ButtonGroup
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  borderColor: "black",
                }}
              >
                <Button
                  size="small"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "green",
                    },
                  }}
                  onClick={addQuantity}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: 20,
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      color: "white",
                      "&:hover": {
                        color: "green",
                      },
                    }}
                  >
                    +
                  </Typography>
                </Button>
                <Button
                  onClick={lessQuantity}
                  size="small"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "red",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: 20,
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      color: "white",
                      "&:hover": {
                        color: "red",
                      },
                    }}
                  >
                    -
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                // backgroundColor: "yellow",
                width: "100%",
              }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                  sx={{
                    fontSize: 12,
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "white",
                    backgroundColor: "black",
                    "&:hover": {
                      backgroundColor: "red",
                      color: "white",
                    },
                  }}
                >
                  Eliminar
                </Button>
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: 15,
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                  }}
                >
                  Precio {currencyFormatter(item.cost * quantity, "$")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ProductCardItems;
