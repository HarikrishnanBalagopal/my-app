import "./list-products.css";

const Product = ({ product, deleteProduct, edittable }) => (
    <div className="inner-product-wrapper">
        <div className="product">
            <img src={product.image} alt="product" />
            <div>
                <div className="product-header">
                    <span>Price: {"$" + product.price.toFixed(2)}</span>
                    <span className="product-title">{product.name}</span>
                    <span>Stock: {product.quantity}</span>
                </div>
                <p className="product-description">{product.description}</p>
            </div>
        </div>
        {edittable && (
            <button
                onClick={() => deleteProduct(product._id)}
                className="product-delete-button"
            >
                X
            </button>
        )}
    </div>
);

const ListProducts = (props) => (
    <div className="products-wrapper">
        <div className="products">
            {props.products.map((product, idx) => (
                <Product
                    key={idx}
                    product={product}
                    edittable={props.edittable}
                    deleteProduct={props.deleteProduct}
                />
            ))}
        </div>
    </div>
);

export { ListProducts };
