import "./add-product.css";

const AddProduct = (props) => (
  <div className="add-product">
    <h2 style={{ textAlign: "center" }}>Add a new product</h2>
    <form>
      <label htmlFor="product-id">ID:</label>
      <input
        id="product-id"
        name="product-id"
        type="text"
        placeholder="product id"
      />
      <label htmlFor="name">Name:</label>
      <input id="name" name="name" type="text" placeholder="product name" />
      <label htmlFor="description">Description:</label>
      <input
        id="description"
        name="description"
        type="text"
        placeholder="product description"
      />
      <label htmlFor="price">Price:</label>
      <input id="price" name="price" type="text" placeholder="product price" />
      <input type="submit" />
    </form>
  </div>
);

export { AddProduct };
