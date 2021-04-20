import "./App.css";
import React from "react";
import { getProducts, logout } from "./networking";
import { deleteProduct } from "./networking";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Dashboard } from "./dashboard";
import { Shop } from "./shop";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.setRoute = this.setRoute.bind(this);
        this.setLogin = this.setLogin.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            products: [],
            route: "Home",
            isLoggedIn: false,
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
        this.setState({ isLoggedIn: Boolean(document.cookie) });
        const products = await getProducts();
        console.log("The products are:", products);
        this.setState({ products });
    }

    async deleteProduct(id) {
        try {
            const status = await deleteProduct(id);
            if (status === 403) {
                this.props.setLogin(false);
                throw new Error("you are not logged in.");
            }
            await this.refresh();
        } catch (e) {
            console.error(e);
            this.setLogin(false);
            alert(`Failed to delete the product with ${id} . ${e}`);
        }
    }

    setRoute(route) {
        this.setState({ route });
    }

    setLogin(isLoggedIn) {
        this.setState({ isLoggedIn });
    }
    async logout() {
        if (!this.state.isLoggedIn) return;
        try {
            await logout();
        } catch (e) {
            console.error(e);
        }
        this.setLogin(false);
    }

    render() {
        const { products, route, isLoggedIn } = this.state;
        return (
            <div className="app">
                <Router>
                    <nav>
                        <span className="nav-current-route">{route}</span>
                        <Link to="/">Home</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        {isLoggedIn && (
                            <Link onClick={this.logout} to="/">
                                Logout
                            </Link>
                        )}
                    </nav>
                    <Switch>
                        <Route path="/dashboard">
                            <Dashboard
                                products={products}
                                refresh={this.refresh}
                                setLogin={this.setLogin}
                                isLoggedIn={isLoggedIn}
                                setRoute={this.setRoute}
                                deleteProduct={this.deleteProduct}
                            />
                        </Route>
                        <Route path="/">
                            <Shop
                                products={products}
                                setRoute={this.setRoute}
                            />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
