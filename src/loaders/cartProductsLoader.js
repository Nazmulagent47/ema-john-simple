import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();

    // if cart data is in database, then you have to use async await
    const storedCart = getShoppingCart();

    const savedCard = [];

    for (const id in storedCart) {
        const addedProduct = products.find(product => product.id === id);
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCard.push(addedProduct);
        }
    }
    return savedCard;

    // if you need to send two things
    // return [products, savedCard];
    // another options
    // return {products, cart: savedCard}
}

export default cartProductsLoader;