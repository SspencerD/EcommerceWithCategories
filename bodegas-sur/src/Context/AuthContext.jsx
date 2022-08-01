import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../utils/firebase-config";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  let navigate = useNavigate();

  const [dataUser, setDataUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (resp) => {
      setDataUser(resp);
    });
  }, []);

  useEffect(() => {
    if (dataUser) {
      setLoading(false);
    }
  }, [dataUser]);

  const signupUser = (email, password, name, lastName) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((resp) => {
        if (resp.status === "ERROR") {
          console.error(resp.message);
        } else {
          Swal.fire({
            title: "Sesión iniciada",
            text: `Bienvenido ${name} +{' '}  +  ${lastName}`,
            icon: "success",
            confirmButtonText: "Continuar",
            confirmButtonColor: "green",
            isConfirmed: navigate("/"),
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const signInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((resp) => {
        if (resp.status === "ERROR") {
          console.error("ERROR SIGNIN", resp);
        } else {
          Swal.fire({
            title: "Sesión iniciada",
            text: `¡Bienvenido!`,
            icon: "success",
            confirmButtonText: "Continuar",
            confirmButtonColor: "green",
            isConfirmed: navigate("/"),
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const signInGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(() => {
        Swal.fire({
          title: "Sesión iniciada",
          text: `¡Bienvenido!`,
          icon: "success",
          confirmButtonText: "Continuar",
          confirmButtonColor: "green",
          isConfirmed: navigate("/"),
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const signOutUser = () => {
    signOut(auth);
    Swal.fire({
      title: "Cerrando sesión",
      text: `haz cerrado sesión con exito`,
      icon: "success",
      confirmButtonText: "Cerrar",
      confirmButtonColor: "green",
      isConfirmed: navigate("/signin"),
    });
  };
  const forgottenpassword = (email) => {
    sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider
      value={{
        signupUser,
        signInUser,
        signOutUser,
        dataUser,
        loading,
        signInGoogle,
        forgottenpassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
