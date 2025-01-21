import React from 'react'
import './Subtotal.css'
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { Link, useNavigate } from 'react-router-dom';

function Subtotal({onPayment}) {
    const [{ user , basket }, dispatch] = useStateValue();
    const amount = getBasketTotal(basket);
    const itemNames = basket.map(item => item.title).join(', ');
    const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
        navigate('/login')
      
    } else {
        onPayment(amount, itemNames)
    }
}
    return (
        <div className='subtotal'>
            <div className="subtotal__Title">
                Subtotal ({basket?.length} items) : <span className='subtotal__money'>₹ {amount}</span>
            </div>
                <button className='subtotal__button' onClick={handleClick}>Proceed to Checkout</button>
        </div>
    )
    }

export default Subtotal