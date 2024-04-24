const products = document.querySelector(".products-container");
const searchInput = document.querySelector(".search__input");
const buttons = [...document.querySelectorAll(".btn")]

const app = axios.create({
  baseURL: "http://localhost:3000/items/",
});

app.interceptors.request.use(
  (config) => {
    console.log("requset sent successfully");
    return config;
  },
  (err) => {
    console.log("something went wrong in request");
    return Promise.reject(err);
  }
);
app.interceptors.response.use(
  (response) => {
    console.log("API fetched successfully!");
    return response;
  },
  (err) => {
    console.log("something went wrong in response");
    return Promise.reject(err.response.data);
  }
);

const filters = {
  searchFilters: "",
};

let allProducts = [];

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  app
    .get("")
    .then(({ data }) => {
      allProducts = data;
      renderProducts(data, filters);
    })
    .catch((err) => console.log(err));
});

searchInput.addEventListener("input", (e) => {
  //   console.log(e.target.value);
  filters.searchFilters = e.target.value;
  renderProducts(allProducts, filters);
});

buttons.map(btn => {
    // console.log(btn.dataset.filter)
    btn.addEventListener("click", (e) => {
        filters.searchFilters = e.target.dataset.filter;
        renderProducts(allProducts , filters)
    })
})


function renderProducts(_products, _filters) {
  let result = "";
  const filteredProducts = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchFilters.toLowerCase());
  });
    filteredProducts.map((product) => {
      result += `<div class="product" data-id=${product.id}>
            <img src=${product.image} class="product__image" />
            <div class="product__desc">
              <span class="product__title">${product.title}</span>
              <span class="product__price">${product.price}$</span>
            </div>
          </div>`;
    });

    products.innerHTML = result;
}

