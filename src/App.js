import "./App.css";
import { ListProducts } from "./list-products";
import { AddProduct } from "./add-product";
import placeholder_img from "./placeholder-image.png";

function App() {
  const products = [
    { id: 1, name: "product 1", image: placeholder_img },
    { id: 2, name: "product 2", image: placeholder_img },
    { id: 3, name: "product 3", image: placeholder_img },
    { id: 4, name: "product 4", image: placeholder_img },
  ];
  return (
    <div className="app">
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>
      <div className="product-wrapper">
        <AddProduct />
        <ListProducts products={products} />
      </div>
    </div>
  );
}

export default App;
