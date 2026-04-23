import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../firebase';


export const addToCart = async (userId, product) => {
    const userRef = doc(db, "users", userId);
    return await updateDoc(userRef, {
        cart: arrayUnion(product)
    });
};


export const removeFromCart = async (userId, productId) => {
    const userRef = doc(db, "users", userId);
    return await updateDoc(userRef, {
        cart: arrayRemove(productId)
    });
};
