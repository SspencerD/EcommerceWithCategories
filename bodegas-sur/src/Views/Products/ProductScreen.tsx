import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getProductsAboveId } from "../../Api/products";
import NavBarComponent from "../../components/NavBarComponent";
import { useCart } from "../../hooks/useCart";
import ShareIcon from '@mui/icons-material/Share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import Swal from "sweetalert2";
import { currencyFormatter } from "../../../utils/Money";

export const ProductScreen = () => {
  const { addItemCart } = useCart();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState("");
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  console.log("PRODUCT", product);

  useEffect(() => {
    getProductById();
  }, [loading]);

  const getProductById = () => {
    getProductsAboveId(productId).then((resp) => {
      setLoading(true);
      if (resp.status === "ERROR") {
        console.error("Hubo un error al buscar el producto");
      } else {
        setProduct(resp);
        setLoading(false);
      }
    });
  };

  const handleSubmitCart = (e) => {
    e.preventDefault();
    console.log("que mando de producto?", product);
    console.log("cantidad que mando?", quantity);
    addItemCart(product, quantity, product.cost * quantity);
  };

  let imageProduct = product ? product.image : null;

  return loading ? (
    <div>
      <h1>Cargando...</h1>
    </div>
  ) : (
    <Container maxWidth="md" fixed>
      <NavBarComponent />
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="flex-start"
        alignItems="justify"
        sx={{
          width: "109vh",
          height: "100vh",
        }}
      >
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          sx={{
            backgroundImage: `url(${imageProduct ? imageProduct : null})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition:'center',
          }}
        />
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          component={Paper}
          elevation={8}
          direction="column"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <Grid
            container
            xs={12}
            sm={12}
            md={12}
            sx={{
              order: 1,
              justifyContent: "center",
              alignItems: "center",
              maxHeight:'10%',
            }}
          >
            <Grid item xs={2} sm={2} md={2}>
              <IconButton component={Link} to={"/"}>
                <ArrowBackIcon fontSize="large" sx={{
                   '&:hover':{
                    color:'skyblue',
                    backgroundColor:'transparent',
                   }
                   }}/>
              </IconButton>
              </Grid>
              <Grid item xs={8} sm={8} md={8}>
              <Typography
                sx={{
                  fontFamily:'Poppins',
                  fontSize:22,
                  fontWeight: '600',
                  textAlign: 'left',
                  textHeight:20,
                  letterSpacing:0.46,
                }}
              >
                {product && product.name}
              </Typography>
            </Grid>
              <Grid
                item
                xs={2} sm={2} md={2}
                sx={{
                  pl: "5%",
                }}
              >
                <IconButton component={Link} to={"/"} size="large">
                  <FavoriteIcon fontSize="large" sx={{
                   '&:hover':{
                    color:'red',
                    backgroundColor:'transparent',
                   }
                  }} />
                </IconButton>
              </Grid>
          </Grid>
          <Grid container spacing={2}
          xs={12}
            sm={12}
            md={12}
            sx={{
              order: 2,
              display: 'flex',
              justifyContent: "flex-start",
              alignItems: "flex-start",
              height:'900px',
            }} >
              <Grid item sm={12}xs={12} md={12} sx={{
                order:1,
                pr:'3%',
              }}>
                <Typography sx={{
                  fontSize:16,
                  fontWeight: "500",
                  fontFamily:'Poppins',
                  textAlign: "justify",
                  color:"black",
                }}>
                  {product.description ? product.description :' Commodo dolor deserunt occaecat officia excepteur eiusmod sunt cupidatat non. Nulla consectetur qui laboris nisi pariatur. Cupidatat labore sunt cillum laborum enim duis ea elit irure irure esse est cupidatat. Dolore eiusmod fugiat non sint velit commodo cillum aliqua qui enim. Anim id fugiat occaecat reprehenderit dolore id elit consequat esse anim occaecat do. Esse velit eu mollit ut nostrud eu. Lorem eiusmod ipsum officia sit reprehenderit aliquip ut reprehenderit adipisicing.Sit mollit elit nostrud dolor quis cupidatat proident eiusmod minim duis elit pariatur.Velit nostrud ut excepteur cillum do voluptate nisi ipsum reprehenderit consequat quis dolor. Aliquip dolore laborum est est nulla dolor laboris reprehenderit veniam enim exercitation. In nisi anim officia nostrud quis elit ut sit exercitation minim.Quis aute occaecat proident eiusmod do ea consectetur non tempor commodo elit consectetur ea esse. Amet quis do aute veniam nostrud magna dolore aute occaecat do. Esse velit eu mollit ut nostrud eu. Lorem eiusmod ipsum officia sit reprehenderit aliquip ut reprehenderit adipisicing.Sit mollit elit nostrud dolor quis cupidatat proident eiusmod minim duis elit pariatur.Velit nostrud ut excepteur cillum do voluptate nisi ipsum reprehenderit consequat quis dolor. Aliquip dolore laborum est est nulla dolor laboris reprehenderit veniam enim exercitation. In nisi anim officia nostrud quis elit ut sit exercitation minim.Quis aute occaecat proident eiusmod do ea consectetur non tempor commodo elit consectetur ea esse. Amet quis do aute veniam nostrud magna dolore aute.'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} sx={{
                justifyContent: 'center',
                alignItems: 'center',
                order:2,
              
              }}>
                <Typography sx={{
                  fontSize:30,
                  fontWeight: 'bold',
                  fontFamily:'Poppins',
                  color:'black',
                  textAlign: 'right',
                  pr:'3%',
                }}>
                  {currencyFormatter(product.cost,'$')}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} sx={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                order:3,
              
              }}>
                <IconButton size="medium" color="primary" sx={{
                  pr:'5%',
                  '&:hover':{
                    color:'#f1f1f1f1',
                    backgroundColor:'transparent',
                  }
                }}>
                  <ShareIcon fontSize="medium"/>
                </IconButton >
                <IconButton size="medium" color="success"  sx={{
                  pr:'5%',
                  '&:hover':{
                    color:'lightGreen',
                    backgroundColor:'transparent',
                  }
                }}>
                <WhatsAppIcon fontSize="medium"/>
                </IconButton>
                <IconButton size="medium" color="primary"  sx={{
                  pr:'5%',
                  '&:hover':{
                    color:'lightBlue',
                    backgroundColor:'transparent',
                  }
                }}>
                <TelegramIcon fontSize="medium"/>
                </IconButton>

              </Grid>
              <Grid item xs={12} sm={12} md={12} sx={{
                order:4,
              }}>
                <Typography sx={{
                  fontSize:12,
                  fontWeight: "500",
                  fontFamily:'Poppins',
                  letterSpacing:0.46,
                  color:"gray",
                  textAlign: "left",
                  pb:'5%',
                }}>
                  {product.stock} unidades disponibles


                </Typography>
          </Grid>
          </Grid>
          <Grid container spacing={2}
          xs={12}
            sm={12}
            md={12}
            sx={{
              order: 5,
              mb:'5%',
              justifyContent: "flex-start",
              alignItems: "center",
              maxHeight:'80px',
            }} >
              <Grid xs={6} sm={6} md={6} sx={{
                pl:'5%',
              }}>
               <TextField 
               variant="outlined"
               label="Cantidad"
               type="number"
               onChange={(e) =>{
                let value = e.target.value
                setQuantity(value)
               }}
               />
              </Grid>
              <Grid xs={6} sm={6} md={6}>
               <Button variant="contained" color="primary" size="large" onClick={handleSubmitCart}>
                <Typography sx={{
                  fontSize:16,
                  fontFamily:'Poppins',
                  fontWeight:'600',
                  textAlign: 'center',
                  color:'white',

                }}>
                  Agregar
                </Typography>
               </Button>
              </Grid>

          </Grid>

        </Grid>
      </Grid>
    </Container>
  );
};
export default ProductScreen;
