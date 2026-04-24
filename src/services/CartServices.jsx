// CartServices.jss
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { db } from '../firebase';

export const addToCart = async (userId, product) => {
    const userRef = doc(db, "users", userId);
    return await updateDoc(userRef, {
        cart: arrayUnion(product)
    });
};

export const removeFromCart = async (userId, productId) => {
    const userRef = doc(db, "users", userId);
    
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        const cart = userDoc.data().cart || [];
        const productToRemove = cart.find(item => item.id === productId);
        
        if (productToRemove) {
            return await updateDoc(userRef, {
                cart: arrayRemove(productToRemove)
            });
        } else {
            console.log("Product not found in cart:", productId);
        }
    }
};