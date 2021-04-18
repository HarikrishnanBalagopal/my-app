import "./list-products.css";

const ListProducts = (props) => (
  <div className="products-wrapper">
    <h2 style={{ textAlign: "center" }}>Products</h2>
    <div className="products">
      {props.products.map((product, idx) => (
        <div key={idx} className="product">
          <img src={product.image} alt="product" />
          <div>{product.name}</div>
        </div>
      ))}
    </div>
  </div>
);

export { ListProducts };
