import Basket from "../../component/Basket/basket"
import {useDispatch, useSelector } from "react-redux";
import { cart, itemsCounter, user } from "../../store/selector/selector";
import Button from "../../component/Button/button";
import { deleteAllProduct, totalItems } from "../../store/slice/cartSlice";

const Cart = () => {
    const userData = useSelector(user);
    const dispatch = useDispatch();
    const totalProducts = useSelector(itemsCounter);
    let savedCart = localStorage.getItem("currentCart");
    const cartItems = useSelector(cart);
    console.log(savedCart);
    console.log(cartItems);

    const saveCurrentCartToLocalStorage = (c) => {
        localStorage.setItem('currentCart', JSON.stringify(c));
    };

    const handleDelete = () => {
        dispatch(deleteAllProduct());
        localStorage.setItem('currentCart', JSON.stringify([]));
        dispatch(totalItems());
    }
    console.log(savedCart);

    return (
        <div className="cart-container">
            <div className="top-cart-container">
                <h2>Hi {userData.name.firstname}!</h2>
                {totalProducts > 0 ? <><h3>There are {totalProducts} items in your basket</h3>
                    <Button onClick={handleDelete} text="Clear Basket"/>
                    <Button onClick={saveCurrentCartToLocalStorage(cartItems)} text="Validate basket"/>
                </> : <h3>Your basket is empty !</h3>}
            </div>
            <Basket/>
        </div>
    )
}

export default Cart