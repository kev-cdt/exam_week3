import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/slice/cartSlice";

const Product = ({ id, title, price, category, description, image }) => {

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addProduct({ id, title, price, category, description, image, quantity }));
    };

    return (
        <li key={id} className='product-container'>
            <div className='img-container'>
                <img src={image}/>
            </div>
            <div className='product-informations'>
                <h3>{title} </h3>
                <div className='category-card'>
                    <p>{category}</p>
                </div>
                <p>{description}</p>
                <h3>{price} $</h3>
                <div className='qty-counter'>
                    <p>Quantity : </p>
                    <input name='product-qty' type='number' value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min="1" ></input>
                </div>
                <button className='add-cart-btn' onClick={handleAddToCart}>Add to basket</button>
            </div>
        </li>
    )
}

export default Product;




