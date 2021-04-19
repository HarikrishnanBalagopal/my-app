import "./App.css";
import React from "react";
import { getProducts } from "./networking";
import { AddProduct } from "./add-product";
import { ListProducts } from "./list-products";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        this.refresh();
    }

    async refresh() {
        const products = await getProducts();
        console.log("The products are:", products);
        this.setState({ products });
    }

    render() {
        const { products } = this.state;
        return (
            <div className="app">
                <h1 style={{ textAlign: "center" }}>Dashboard</h1>
                <div className="product-wrapper">
                    <AddProduct refresh={this.refresh} />
                    <ListProducts products={products} />
                </div>
            </div>
        );
    }
}

export default App;
