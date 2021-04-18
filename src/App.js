import "./App.css";
import React from "react";
import { getProducts } from "./networking";
import { AddProduct } from "./add-product";
import { ListProducts } from "./list-products";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
    }

    async componentDidMount() {
        const products = await getProducts();
        console.log("products are:", products);
        this.setState({ products });
    }

    render() {
        const { products } = this.state;
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
}

export default App;
