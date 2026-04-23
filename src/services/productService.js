import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function getAllProducts() {
  const productsCollection = collection(db, 'products');
  const productsSnapshot = await getDocs(productsCollection);
  const productsList = productsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return productsList;
}