import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id of the added product
        for (const id in storedCart) {
            // step 2: get the product from products state by using id
            const addedProduct = products.find(product => product.id === id);

            if (addedProduct) {
                // step 3: get quantity of the storedCart and add quantity to product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the addedProduct to the saved cart
                savedCart.push(addedProduct);
            }
        }
        // step 5: set the cart
        setCart(savedCart);
    }, [products]);

    const handleAddToCart = (product) => {
        // const newCart = [...cart, product];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist, then update quantity by 1
        let newCart = [];

        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product.id);
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart 
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to='/orders'>
                        <button className='btn-proceed'>Review Order<FontAwesomeIcon icon={faTrashCan} /></button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;