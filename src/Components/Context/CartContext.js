import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';

 export const CartContext = createContext();
export default function CartContextProvider({children}) {
  const myToken = useContext(AuthContext);

  // all states 
  const [numOfCartItems,setNumOfCartItems] = useState(0);
  const [totalCartPrice,setTotalCartPrice] = useState(0);
  const [allProducts , setAllProducts] = useState([]);
  const [cartID , setCartID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
          headers: { Token: myToken }
        });
        setAllProducts(response.data.data.products);
        setNumOfCartItems(response.data.numOfCartItems);
        setTotalCartPrice(response.data.data.totalCartPrice);
        setCartID(response.data.data._id);
  // console.log('cartid',cartID);

      } catch (error) {
        // console.error('Error fetching cart data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, [myToken]);

  async function addProductToCart(productId) {
    try {
        const response = await axios.post(
            'https://ecommerce.routemisr.com/api/v1/cart',
            { "productId": productId },
            { headers: { Token: localStorage.getItem('Token') } }
        );
        setAllProducts(response.data.data.products);
    setNumOfCartItems(response.data.numOfCartItems);
    setTotalCartPrice(response.data.data.totalCartPrice);
        // console.log('Response:', response.data);
        
        return response.data; // Return the data from the response
    } catch (error) {
        //  console.error('Error:', error);
        
    }
}


async function getUserCart (){

  await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers:{Token:localStorage.getItem('Token')}})
  .then((res)=>{
    //console.log('Response' , res.data);
    setCartID(res.data.data._id)
    localStorage.setItem('userID', res.data.data.cartOwner)
    setAllProducts(res.data.data.products);
    setNumOfCartItems(res.data.numOfCartItems);
    setTotalCartPrice(res.data.data.totalCartPrice);
    
    
    
   
// console.log(allProducts);
 


  })
  .catch((err)=>{
    // console.log('Error',err);
  })
}

async function updateCount(id , newCount){
  try {
    if (!id) {
      console.error('Invalid id:', id);
      return false;
    }

    const response = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { "count": newCount },
      { headers: { Token: localStorage.getItem('Token') } }
    );

    // console.log("last", response.data);
    setTotalCartPrice(response.data.data.totalCartPrice);
    setAllProducts(response.data.data.products);
    setNumOfCartItems(response.data.numOfCartItems);
    
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}


async function deleteProduct(id){
  const res =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
  {headers: {Token: localStorage.getItem('Token')}})
  .then((res)=>{
    setNumOfCartItems(res.data.numOfCartItems);
    setTotalCartPrice(res.data.data.totalCartPrice);
    setAllProducts(res.data.data.products);
    //عشان اعرف انا دخلت انهي سكووب عشان اعرف هعرض لليوزر انهي مسجج
    return true;

  })
  .catch((err)=>{
    console.log('err', err);
    return false;
  })
  // مش هقدر اقلو ريترن الا لما كل الفانكشن الي فوق دي تكون خلصت عشان كده حطيت await
  return res;
  }

async function clearCart(){
  const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
  {headers: {Token: localStorage.getItem('Token')}})
  .then((res)=>{
    // console.log(res.data);
     setNumOfCartItems(0);
     setAllProducts([]);
     setTotalCartPrice(0);
     
    //عشان اعرف انا دخلت انهي سكووب عشان اعرف هعرض لليوزر انهي مسجج
    return true;

  })
  .catch((err)=>{
    console.log('err', err);
    return false;
  })
  // مش هقدر اقلو ريترن الا لما كل الفانكشن الي فوق دي تكون خلصت عشان كده حطيت await
    return res
}




useEffect(()=>{
  // console.log('getting user data');
  getUserCart();

}, [myToken]);

useEffect(() => {
  // console.log('All products:', allProducts);
  // Handle any side effects related to allProducts here
}, [allProducts]);



  

    





    
  
return (
  <CartContext.Provider value={{ 
    addProductToCart,
    numOfCartItems,
    totalCartPrice,
    allProducts, 
    getUserCart,
    updateCount,
    deleteProduct,
    clearCart,
    cartID,
    isLoading,
    
      


     }}>
      {children}
  </CartContext.Provider>
);
}
