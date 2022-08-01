import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Drawer from "@mui/material/Drawer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { getAllCategories } from "../Api/categories";
import "../Css/CartStyles.css";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import ProductCardItems from "./ProductCartItems";
import { currencyFormatter } from "../../utils/Money";
import { Paper } from "@mui/material";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBarComponent() {
  const { signOutUser, dataUser } = useAuth();
  const { qtyCart, cartList, totalAmount, cleanCart, getOrderToBd } = useCart();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [openProducts, setOpenProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const openProduct = Boolean(openProducts);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [loading, setLoading] = useState(false);

  console.log("Cuanto tengo en el carrito?", qtyCart);

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    if (cartList.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [cartList]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const handleSignOut = () => {
    signOutUser();
  };

  const handleCheckout = () => {
    Swal.fire({
      title: "Estas a punto de realizar esta compra",
      text: "¿Estas seguro de realizar la compra?",
      confirmButtonText: "Continuar",
      denyButtonText: "Cancelar",
      confirmButtonColor: "black",
      denyButtonColor: "white",
      preConfirm: () => {
        try {
          getOrderToBd();
          Swal.fire(
            "Orden de compra creada",
            "Orden de compra creada con exito",
            "success"
          );
          cleanCart();
        } catch (error) {
          Swal.fire(
            "Ha ocurrido un error",
            "No se ha podido generar la orden de compra",
            "error"
          );
        }
      },
    });
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        mt: "4%",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!dataUser ? (
        <MenuItem
          component={Link}
          to="/signin"
          sx={{
            backgroundColor: "black",
            color: "white",
            fontSize: 15,
            fontWeight: "500",
            fontFamily: "Poppins",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            },
          }}
        >
          iniciar sesión
        </MenuItem>
      ) : null}
      <MenuItem
        onClick={handleMenuClose}
        sx={{
          backgroundColor: "black",
          color: "white",
          fontSize: 15,
          fontWeight: "500",
          fontFamily: "Poppins",
          "&:hover": {
            backgroundColor: "white",
            color: "black",
          },
        }}
      >
        Carrito
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        sx={{
          backgroundColor: "black",
          color: "white",
          fontSize: 15,
          fontWeight: "500",
          fontFamily: "Poppins",
          "&:hover": {
            backgroundColor: "white",
            color: "black",
          },
        }}
      >
        FAQ
      </MenuItem>
      {dataUser ? (
        <MenuItem
          onClick={handleSignOut}
          sx={{
            backgroundColor: "black",
            color: "white",
            fontSize: 15,
            fontWeight: "500",
            fontFamily: "Poppins",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            },
          }}
        >
          Cerrar sesión
        </MenuItem>
      ) : null}
    </Menu>
  );

  const loadingData = () => {
    return (
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          py: "10%",
        }}
      >
        <CircularProgress
          sx={{
            width: 50,
            height: 50,
            color: "black",
          }}
        />
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: "500",
            fontFamily: "Poppins",
            color: "black",
          }}
        >
          NO hay productos aún el carrito
        </Typography>
      </Grid>
    );
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge
            badgeContent={qtyCart === undefined ? 0 : qtyCart}
            color="error"
          >
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Carrito</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notificaciones</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
      <MenuItem onClick={handleSignOut}>
        <IconButton
          size="large"
          aria-label="Sign out user"
          aria-controls="last-item-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Cerrar sesión</p>
      </MenuItem>
    </Menu>
  );

  const renderDrawerCarts = (
    <Drawer
      anchor={"right"}
      open={openDrawer}
      onClose={() => {
        setOpenDrawer(false);
      }}
    >
      <Box sx={{ width: 450 }} role="presentation">
        <Box
          sx={{
            display: "flex",
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 100,
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={8}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: 21,
                  fontWeight: "600",
                  fontFamily: "Poppins",
                  color: "black",
                  textAlign: "center",
                  pl: "5%",
                }}
              >
                Carrito de compra
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingRight: "5%",
                // backgroundColor: "white",
                width: "100%",
              }}
            >
              <IconButton
                color="error"
                aria-label="close-drawer"
                fontSize="large"
                onClick={() => {
                  setOpenDrawer(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            width: "100%",
            height: 700,
          }}
        >
          <Grid item>
            {cartList.length > 0
              ? cartList.map((item, index) => (
                  <ProductCardItems key={index} item={item} />
                ))
              : loadingData()}
          </Grid>
        </Grid>
        <Box
          component={Paper}
          elevation={9}
          direction="row"
          sx={{
            position: "absolute",
            bottom: 0,
            display: "flex",

            width: "100%",
            height: 100,
            paddingLeft: "5%",
            pt: "5%",
          }}
        >
          <Grid container spacing={2} direction="column">
            <Grid item xs>
              <Typography
                variant="body1"
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                SubTotal
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Total
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} direction="column">
            <Grid item xs>
              <Typography
                variant="body1"
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                {currencyFormatter(totalAmount, "$")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                {currencyFormatter(Math.round(totalAmount * 1.19), "$")}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{
              width: "100%",
            }}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {cartList.length > 0 ? (
              <Button
                onClick={handleCheckout}
                variant="contained"
                color="info"
                size="large"
                sx={{
                  backgroundColor: "black",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: 16,
                    fontFamily: "Poppins",
                    fontWeight: "600",
                  }}
                >
                  Pagar
                </Typography>
              </Button>
            ) : null}
          </Grid>
        </Box>
      </Box>
    </Drawer>
  );

  const handleOpenProducts = (event) => {
    setOpenProducts(event.currentTarget);
  };
  const handleCloseProducts = () => {
    setOpenProducts(false);
  };

  const getAllCategory = () => {
    getAllCategories().then((resp) => {
      if (resp.status === "ERROR") {
        console.warn("ERROR", resp);
      } else {
        console.log("TODAS LAS CATEGORIAS", resp);
        setCategories(resp);
      }
    });
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "10%" }}>
      <AppBar
        position="absolute"
        style={{
          backgroundColor: "black",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="p"
            noWrap
            component="div"
            sx={{
              display: {
                xs: "none",
                sm: "block",
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Poppins",
              },
            }}
          >
            Bodegas del sur
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Busqueda..."
              inputProps={{ "aria-label": "search" }}
              sx={{
                fontSize: 15,
                fontWeight: "500",
                fontFamily: "Poppins",
              }}
            />
          </Search>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Button
                component={Link}
                to={"/"}
                sx={{
                  color: "white",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: "600",
                  fontFamily: "Poppins",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
              >
                Inicio
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Button
                id="openProductsMenu"
                aria-controls={openProduct ? "product-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openProduct ? "true" : undefined}
                onClick={handleOpenProducts}
                sx={{
                  color: "white",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: "600",
                  fontFamily: "Poppins",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
              >
                Categorias
              </Button>
              <Menu
                id="product-menu"
                anchorEl={openProducts}
                open={openProduct}
                onClose={handleCloseProducts}
                MenuListProps={{
                  "aria-labelledby": "openProductsMenu",
                }}
              >
                {categories.map((item, index) => (
                  <MenuItem
                    key={index}
                    component={Link}
                    to={`/categorias/${item.id}`}
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      fontSize: 14,
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "black",
                      },
                    }}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="Tu carrito"
              color="inherit"
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              <Badge badgeContent={qtyCart ? qtyCart : 0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderDrawerCarts}
    </Box>
  );
}
