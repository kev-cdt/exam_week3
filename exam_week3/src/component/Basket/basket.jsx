import { useDispatch, useSelector } from "react-redux";
import { cart } from "../../store/selector/selector";
import {
updateProductQuantity,
deleteProduct,
totalItems,
} from "../../store/slice/cartSlice";

const Basket = () => {
const cartItems = useSelector(cart);
const dispatch = useDispatch();

const decrementQty = (id, quantity) => {
    if (quantity > 0) {
    dispatch(updateProductQuantity({ id, quantity }));
    dispatch(totalItems());
    }
};

const incrementQty = (id, quantity) => {
    dispatch(updateProductQuantity({ id, quantity }));
    dispatch(totalItems());
};

const handleRemoveProduct = (id) => {
    dispatch(deleteProduct(id));
    dispatch(totalItems());
};

return (
    <div className="productlist-container">
    <ul className="cart-items-container">
        {cartItems.map((product) => (
        <li key={product.id} className="product-container">
            <div className="img-container">
            <img src={product.image} />
            </div>
            <div className="product-informations">
            <h3>{product.title} </h3>
            <div className="category-card">
                <p>{product.category}</p>
            </div>
            <p>{product.description}</p>
            <h3>{product.price} $</h3>
            <div className="qty-counter">
                <p>Quantity : </p>
                <button
                className="qty-btn less-btn"
                onClick={() => decrementQty(product.id, product.quantity - 1)}
                >
                -
                </button>
                <p className="qty-text">{product.quantity}</p>
                <button
                className="qty-btn"
                onClick={() => incrementQty(product.id, product.quantity + 1)}
                >
                +
                </button>
            </div>
            <button onClick={() => handleRemoveProduct(product.id)}>
                Remove
            </button>
            </div>
        </li>
        ))}
    </ul>
    </div>
);
};

export default Basket;