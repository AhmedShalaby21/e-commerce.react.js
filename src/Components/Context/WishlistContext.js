import axios from "axios";
import { createContext, useEffect, useState } from "react"
import toast from "react-hot-toast";

export const WishlistContext = createContext();
export function WishlistContextProvider({children}){

    
    const [numOfWishlistItems,setNumOfWishlistItems] = useState(0);
  const [allProducts , setAllProducts] = useState(null);
  
  
  
 

    async function addProductToWishlist(productId){
  
        try {
            const result = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/wishlist',
                { "productId": productId },
                { headers: { Token: localStorage.getItem('Token') } }
            );
  
   
    //  console.log('result from whichlist',result.data);
     if(result.data.status === "success"){
        setNumOfWishlistItems(prevCount => prevCount + 1);
       toast.success('Product added successfully to your wishlist',{duration:1500,position:'top-center'})
       
      
     }else {
       toast.error('Failed To Add Product', { duration: 1500, position: 'top-center' });
     }
    
   
    
   
    } catch(error){
     toast.error('Failed To Add Product',{duration:1500,position:'top-center'})
     console.log('error from whichlist' ,error);

    }
  }


async function removeProductFromWishlist(productId) {
    // console.log('Removing product from wishlist...');
    try {
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers: { Token: localStorage.getItem('Token') }
        });
        
        // Fetch the updated wishlist data
        await getLoggedUserWishlist();
        
        

        return true; // Indicate successful deletion
    } catch (error) {
        console.log('Error removing product from wishlist:', error);
        toast.error('Error occurred while deleting product from wishlist', { position: 'top-center' });
        return false; // Indicate failure
    }
}



async function getLoggedUserWishlist(){
    try {

    const res = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
    {headers:{Token: localStorage.getItem('Token')}})
    setNumOfWishlistItems(res.data.count);
    setAllProducts(res.data.data);
    
    return res.data.data;

}catch(error){
    console.log('error from LoggedUserWishlist ' , error);
}
}



    return<WishlistContext.Provider value={{addProductToWishlist,
        getLoggedUserWishlist,
        numOfWishlistItems,
        allProducts,
        removeProductFromWishlist

        }} > 
    {children}
    </WishlistContext.Provider>
}