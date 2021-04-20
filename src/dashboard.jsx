import React, { useEffect } from "react";
import { AddProduct } from "./add-product";
import { ListProducts } from "./list-products";
import { login } from "./networking";
import "./dashboard.css";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
        this.state = { username: "", password: "" };
    }
    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }
    async submit() {
        try {
            await login(this.state.username, this.state.password);
            this.props.setLogin(true);
        } catch (e) {
            console.error(e);
            this.props.setLogin(false);
            alert(`${e}`);
        }
    }
    render() {
        const { username, password } = this.state;
        return (
            <div className="login-form-wrapper">
                <img src="/images/login.png" alt="login" />
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.submit();
                    }}
                    className="login-form"
                >
                    <label htmlFor="username">Username:</label>
                    <input
                        autoFocus={true}
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) =>
                            this.handleInputChange("username", e.target.value)
                        }
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) =>
                            this.handleInputChange("password", e.target.value)
                        }
                    />
                    <input type="submit" value="Login" />
                    <div className="login-form-bottom-spacer"></div>
                </form>
            </div>
        );
    }
}

const Dashboard = (props) => {
    useEffect(() => {
        props.setRoute(props.isLoggedIn ? "Dashboard" : "Login");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isLoggedIn]);

    return (
        <>
            {!props.isLoggedIn && <LoginPage setLogin={props.setLogin} />}
            {props.isLoggedIn && (
                <div className="dashboard">
                    <div className="product-wrapper">
                        <AddProduct
                            refresh={props.refresh}
                            setLogin={props.setLogin}
                        />
                        <ListProducts
                            products={props.products}
                            edittable={true}
                            deleteProduct={props.deleteProduct}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export { Dashboard };
