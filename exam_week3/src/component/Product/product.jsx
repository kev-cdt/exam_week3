import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, totalItems } from "../../store/slice/cartSlice";
import Button from "../Button/button";

const Product = ({ id, title, price, category, description, image }) => {

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addProduct({ id, title, price, category, description, image, quantity }));
        dispatch(totalItems());
    };

    return (
        <li key={id} className='product-container'>
            <div className='img-container'>
                <img src={image}/>
            </div>
            <div className='product-informations'>
                <div>
                <h3 className="product-title">{title} </h3>
                <p className="category-card">{category}</p>
                </div>
                <p>{description}</p>
                <h3>{price} $</h3>
                <div className='qty-counter'>
                    <p>Quantity : </p>
                    <input name='product-qty' type='number' value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min="1" ></input>
                </div>
                <Button onClick={handleAddToCart} text="Add to basket"/>
            </div>
        </li>
    )
}

export default Product;




