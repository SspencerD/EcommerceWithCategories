export const getAllproducts = () => {
  return fetch("https://pg-delsur.herokuapp.com/products", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      const data = resp.json();
      return data;
    })
    .catch((err) => {
      let error = { data: { status: "ERROR", message: err.toString() } };
      return error.data;
    });
};
export const getProductsAboveId = (productId) => {
  return fetch(`https://pg-delsur.herokuapp.com/products/${productId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      const data = resp.json();
      return data;
    })
    .catch((err) => {
      let error = { data: { status: "ERROR", message: err.toString() } };
      return error.data;
    });
};
export const getProductsByCategory = (category) => {
  return fetch(
    `https://pg-delsur.herokuapp.com/products?categoryId=${category}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => {
      const data = resp.json();
      return data;
    })
    .catch((err) => {
      let error = { data: { status: "ERROR", message: err.toString() } };
      return error.data;
    });
};
export const UpdateProduct = (values) => {
  return fetch(`https://pg-delsur.herokuapp.com/products/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: values,
  })
    .then((resp) => {
      const data = resp.json();
      return data;
    })
    .catch((err) => {
      let error = { data: { status: "ERROR", message: err.toString() } };
      return error.data;
    });
};
