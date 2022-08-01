import React, { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../../hooks/useAuth";
import { IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Error } from "@mui/icons-material";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Bodegas del sur
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInScreen() {
  const { signInUser, signInGoogle, forgottenpassword } = useAuth();
  const [dataUser, setdataUser] = useState({
    email: null,
    password: null,
  });
  const [error, setError] = useState(false);
  const focusInput = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    signInUser(dataUser.email, dataUser.password);
  };

  const handleForgottenPassword = async () => {
    if (!dataUser.email) {
      setError(true);
      focusInput.current.focus();
    } else {
      try {
        await forgottenpassword(dataUser.email);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh", width: "140vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://source.unsplash.com/random/collections?page=1&query=drinks)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontSize: 20,
              fontFamily: "Poppins",
              fontWeight: 500,
            }}
          >
            Inicia Sesión
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              ref={focusInput}
              error={error}
              helperText="debes ingresar un correo"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{
                fontSize: 15,
                fontFamily: "Poppins",
                fontWeight: 500,
                color: "black",
              }}
              onChange={(e) => {
                setdataUser({
                  ...dataUser,
                  email: e.target.value,
                });
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setdataUser({
                  ...dataUser,
                  password: e.target.value,
                });
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                fontSize: 15,
                fontFamily: "Poppins",
                fontWeight: 500,
                color: "white",
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  variant="p"
                  onClick={handleForgottenPassword}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="p">
                  {"¿No tienes cuenta?,¡Registrate!"}
                </Link>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  marginTop: "5%",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "200%",
                }}
              >
                <span>inicia con tus redes sociales</span>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  marginTop: "5%",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "200%",
                }}
              >
                <IconButton
                  color="error"
                  aria-label="google"
                  onClick={() => {
                    signInGoogle();
                  }}
                >
                  <GoogleIcon />
                </IconButton>
                <IconButton color="primary" aria-label="Facebook">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="info" aria-label="Twitter">
                  <TwitterIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Copyright
              sx={{
                mt: 5,
              }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
