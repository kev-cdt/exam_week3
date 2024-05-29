import { useSelector } from 'react-redux';
import { cart } from '../../store/selector/selector';

const Basket = () => {
    const cartItems = useSelector(cart);

    return (
        <div className='productlist-container'>
            <h1>Cart component</h1>
            {cartItems.map(product => (
                    <li key={product.id} className='product-container'>
                        <div className='img-container'>
                            <img src={product.image}/>
                        </div>
                        <div className='product-informations'>
                            <h3>{product.title} </h3>
                            <div className='category-card'>
                                <p>{product.category}</p>
                            </div>
                            <p>{product.description}</p>
                            <h3>{product.price} $</h3>
                            <div className='qty-counter'>
                                <p>Quantity : </p>
                                <input name='product-qty' type='number' value={product.quantity} onChange={(e) => setQuantity(Number(e.target.value))} min="1" ></input>
                            </div>
                        </div>
                    </li>
                ))}
        </div>
        );
}

export default Basket;