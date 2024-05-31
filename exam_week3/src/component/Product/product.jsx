import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, totalItems } from "../../store/slice/cartSlice";
import Button from "../Button/button";

const Product = ({ id, title, price, category, description, image }) => {
const [quantity, setQuantity] = useState(1);
const dispatch = useDispatch();
const handleAddToCart = () => {
    dispatch(
    addProduct({ id, title, price, category, description, image, quantity })
    );
    dispatch(totalItems());
};

const decrementQty = () => {
    if (quantity > 1) {
    setQuantity((quantity) => quantity - 1);
    }
};

const incrementQty = () => {
    setQuantity((quantity) => quantity + 1);
};

return (
    <li key={id} className="product-container">
    <div className="img-container">
        <img src={image} />
    </div>
    <div className="product-informations">
        <div>
        <h3 className="product-title">{title} </h3>
        <p className="category-card">{category}</p>
        </div>
        <p>{description}</p>
        <h3>{price} $</h3>
        <div className="qty-counter">
        <p>Quantity : </p>
        <button className="qty-btn less-btn" onClick={() => decrementQty()}>
            -
        </button>
        <p className="qty-text">{quantity}</p>
        <button className="qty-btn" onClick={() => incrementQty()}>
            +
        </button>
        </div>
        <Button onClick={handleAddToCart} text="Add to basket" />
    </div>
    </li>
);
};

export default Product;