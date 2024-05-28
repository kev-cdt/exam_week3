
const Button = ({onClick, text}) => {
    return (
        <button className='add-cart-btn' onClick={onClick}>{text}</button>
    )
}

export default Button

