import Basket from "../../component/Basket/basket"
import {useDispatch, useSelector } from "react-redux";
import { itemsCounter, user } from "../../store/selector/selector";
import Button from "../../component/Button/button";
import { deleteAllProduct, totalItems } from "../../store/slice/cartSlice";

const Cart = () => {
    const userData = useSelector(user);
    const dispatch = useDispatch();
    const totalProducts = useSelector(itemsCounter);

    const handleDelete = () => {
        dispatch(deleteAllProduct());
        dispatch(totalItems());
    }

    return (
        <div className="cart-container">
            <div className="top-cart-container">
                <h2>Hi {userData.name.firstname}!</h2>
                {totalProducts > 0 ? <><h3>There are {totalProducts} items in your basket</h3>
                    <Button onClick={handleDelete} text="Clear Basket"/>
                    {/* <Button onClick={} text="Validate basket"/> */}
                </> : <h3>Your basket is empty !</h3>}
            </div>
            <Basket/>
        </div>
    )
}

export default Cart