import { useEffect } from "react";
import { ListProducts } from "./list-products";

const Shop = (props) => {
    useEffect(() => {
        props.setRoute("Shop");
    }, []);
    return (
        <div className="shop">
            <h2>Products</h2>
            <ListProducts products={props.products} edittable={false} />
        </div>
    );
};

export { Shop };
