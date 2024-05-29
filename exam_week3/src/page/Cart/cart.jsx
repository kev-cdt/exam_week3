import Basket from "../../component/Basket/basket"
import {useSelector } from "react-redux";
import { user } from "../../store/selector/selector";
import Button from "../../component/Button/button";

const Cart = () => {
    const userData = useSelector(user);
    const handleDelete = () => {
        console.log("delete")
    }
    return (
        <div>
            <h2>Hi {userData.name.firstname}!</h2>
            <h3>There are XX items in your basket</h3>
            <Button onClick={handleDelete} text="Clear Basket"/>

            <Basket/>
        </div>
    )
}

export default Cart