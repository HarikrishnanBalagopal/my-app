import "./App.css";
import React from "react";
import { getProducts } from "./networking";
import { AddProduct } from "./add-product";
import { ListProducts } from "./list-products";
import { deleteProduct } from "./networking";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.state = {
            products: [],
        };
    }

    async componentDidMount() {
        try {
            await this.refresh();
        } catch (e) {
            console.error(e);
            alert("Failed to fetch the products.");
        }
    }

    async refresh() {
        const products = await getProducts();
        console.log("The products are:", products);
        this.setState({ products });
    }

    async deleteProduct(id) {
        try {
            await deleteProduct(id);
            await this.refresh();
        } catch (e) {
            console.error(e);
            alert(`Failed to delete the product with ${id} . ${e}`);
        }
    }

    render() {
        const { products } = this.state;
        return (
            <div className="app">
                <h1 style={{ textAlign: "center" }}>Dashboard</h1>
                <div className="product-wrapper">
                    <AddProduct refresh={this.refresh} />
                    <ListProducts
                        products={products}
                        deleteProduct={this.deleteProduct}
                    />
                </div>
            </div>
        );
    }
}

export default App;
