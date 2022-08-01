import { ButtonBase, Grid, Paper, Button } from "@mui/material";
import React from "react";

const CartComponents = () => {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        marginBottom: "3%",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <img src={""} alt="no hay imagen" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <p>Nombre del producto</p>
            </Grid>
            <p>Descripción del producto</p>
            <p>Cantidad del producto debe ser un input</p>
          </Grid>
          <Grid item xs={12}>
            <Button>Quitar del carrito</Button>
          </Grid>
        </Grid>
        <Grid item>
          <p>Precio del producto</p>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartComponents;
