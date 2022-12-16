import CartPageComponent from "./components/CartPageComponent";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const Library = () => {

    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
    const reduxDispatch = useDispatch();

    return <CartPageComponent addToCart={addToCart} removeFromCart={removeFromCart} cartItems={cartItems} cartSubtotal={cartSubtotal} reduxDispatch={reduxDispatch} />;
};

export default Library;
