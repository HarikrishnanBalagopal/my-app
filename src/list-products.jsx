import "./list-products.css";

const Product = ({ product, deleteProduct }) => (
    <div className="inner-product-wrapper">
        <div className="product">
            <img src={product.image} alt="product" />
            <div>
                <div className="product-header">
                    <span>Price: {"$" + product.price.toFixed(2)}</span>
                    <span className="product-title">{product.name}</span>
                    <span>Stock: {product.quantity}</span>
                </div>
                <p>{product.description}</p>
            </div>
        </div>
        <button
            onClick={() => deleteProduct(product._id)}
            className="product-delete-button"
        >
            X
        </button>
    </div>
);

const ListProducts = (props) => (
    <div className="products-wrapper">
        <h2 style={{ textAlign: "center" }}>Products</h2>
        <div className="products">
            {props.products.map((product, idx) => (
                <Product
                    key={idx}
                    product={product}
                    deleteProduct={props.deleteProduct}
                />
            ))}
        </div>
    </div>
);

export { ListProducts };
