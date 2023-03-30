import React from 'react';
import './Cart.css';

const Cart = ({cart}) => {
    // const cart = props.Cart; // option 1
    // const {cart} = props; // option 2

    console.log(cart);

    let totalPrice = 0;
    let totalShipping = 0;
    for ( const product of cart) {
        totalPrice = totalPrice + product.price;
        totalShipping = totalShipping + product.shipping;
    }

    let totalTax = totalPrice*7 / 100;

    let grandTotal = totalPrice + totalShipping + totalTax;

    return (
        <div className='cart'>
            <h2>Order Summary</h2>
            <p>Selected Items: {cart.length}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Shipping: ${totalShipping}</p>
            <p>Tax: ${totalTax.toFixed(2)}</p>
            <h6>Grand Total: ${grandTotal.toFixed(2)}</h6>
        </div>
    );
};

export default Cart;