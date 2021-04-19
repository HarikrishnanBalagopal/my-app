import React from "react";
import "./add-product.css";
import { addProduct } from "./networking";

const newProduct = () => ({
    id: "product-id-1",
    name: "product 1",
    description: "this is the description for product 1",
    price: 10,
    quantity: 100,
    image: "/images/placeholder-image.png",
});

class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = newProduct();
    }
    onChangeValue(key, value) {
        this.setState({ [key]: value });
    }
    async onSubmit() {
        try {
            await addProduct(this.state);
            alert(`New product created.`);
            this.setState(newProduct());
            this.props.refresh();
        } catch (e) {
            console.error(e);
            alert(`Failed to create the product. ${e}`);
        }
    }
    render() {
        const { id, name, description, price, quantity, image } = this.state;
        return (
            <div className="add-product">
                <h2 style={{ textAlign: "center" }}>Add a new product</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.onSubmit();
                    }}
                >
                    <label htmlFor="product-id">ID:</label>
                    <input
                        id="product-id"
                        name="product-id"
                        type="text"
                        value={id}
                        onChange={(e) =>
                            this.onChangeValue("id", e.target.value)
                        }
                    />
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) =>
                            this.onChangeValue("name", e.target.value)
                        }
                    />
                    <label htmlFor="description">Description:</label>
                    <input
                        id="description"
                        name="description"
                        type="text"
                        value={description}
                        onChange={(e) =>
                            this.onChangeValue("description", e.target.value)
                        }
                    />
                    <label htmlFor="price">Price:</label>
                    <input
                        id="price"
                        name="price"
                        type="text"
                        value={price}
                        onChange={(e) =>
                            this.onChangeValue("price", e.target.value)
                        }
                    />
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        id="quantity"
                        name="quantity"
                        type="text"
                        value={quantity}
                        onChange={(e) =>
                            this.onChangeValue("quantity", e.target.value)
                        }
                    />
                    <label htmlFor="image">Image:</label>
                    <input
                        id="image"
                        name="image"
                        type="text"
                        value={image}
                        onChange={(e) =>
                            this.onChangeValue("image", e.target.value)
                        }
                    />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export { AddProduct };
