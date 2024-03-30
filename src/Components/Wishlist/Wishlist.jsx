import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { WishlistContext } from '../Context/WishlistContext'
import { FallingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { CartContext } from '../Context/CartContext';

export default function Wishlist() {
    
    const  {addProductToCart,getUserCart} = useContext(CartContext);
    const {getLoggedUserWishlist,numOfWishlistItems,allProducts,removeProductFromWishlist} = useContext(WishlistContext);
    const [wishlistItems, setwishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [likedProducts, setLikedProducts] = useState(() => {
        const savedLikedProducts = localStorage.getItem('likedProducts');
        return savedLikedProducts ? JSON.parse(savedLikedProducts) : {};
    });

     useEffect(()=>{
            const  displayWishlist = async()=> {


            try{

                    const wishlist = await getLoggedUserWishlist();
                    setwishlistItems(wishlist);
                    setLoading(false);


            }
            catch(error){
                console.error('Error fetching wishlist:', error);
                setLoading(false);
            }
        }


        displayWishlist();


    },[])


    const addToCart = async (productId) => {
        try {

            await addProductToCart(productId);
            getUserCart();
            toast.success('Product added to cart successfully', { position: 'top-center' });
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Error occurred while adding product to cart', { position: 'top-center' });
        }
    };
    const removeMyProductFromWishlist = async (productId) => {
        try {
            await removeProductFromWishlist(productId);
            setwishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
    
            // Remove the product from likedProducts state and update local storage
            const updatedLikedProducts = { ...likedProducts };
            delete updatedLikedProducts[productId];
            setLikedProducts(updatedLikedProducts);
            localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));
    
            toast.success('Product Deleted Successfully', { position: 'top-center' });
        } catch (error) {
            console.error('Error removing product from wishlist:', error);
            toast.error('Error Occurred', { position: 'top-center' });
        }
    };
    
    
 

 if(loading){
 return <div className="d-flex vh-100 bg-main bg-opacity-50 justify-content-center align-items-center">
 <FallingLines
 color="white"
 width="100"
 visible={true}
 ariaLabel="falling-circles-loading"
 />

 </div>

        }

        if (!allProducts||wishlistItems.length === 0) { // Check if wishlistItems is empty
            return (
                <div className="container bg-white pt-3">
                    <Helmet><title>Wishlist</title></Helmet>
                    <h2 className='text-center'>Wishlist</h2>

                    <h5 className='text-center text-danger'>No items in your wishlist</h5>
                    <div className=" w-100 d-flex justify-content-center align-content-center ">
                        <img src= {require('../../images/8c1099726d0428fed0e0a2f0a5430b37.jpg')} alt="" />
                        </div>

                </div>
            );
        }


  return <>
  <Helmet><title>Wishlist</title></Helmet>

  <div className="container  shadow bg-light p-3 mt-3">
    <h2 className='text-center'>Wishlist</h2>
    <h5 className='text-center text-danger'>Total Wishlist Item: {wishlistItems.length}</h5>



        {wishlistItems && wishlistItems.map((product )=> <div key={product.id}  className="row align-items-center  border-bottom border-dark-subtle p-4 ">

        <div className="col-1">
<figure>
<img className='w-100' src={product.imageCover} alt={product.title} />
</figure>
</div>
<div className="col-9">
<article>
<div className="d-flex justify-content-between align-items-center">
<h3 className='h6'><b>{product.title}</b></h3>
{/* <h5 className='text-main'>Price : {product.price}</h5> */}
<button onClick={()=> addToCart(product.id)} className=' addBtn btn btn-outline-success  d-block m-auto  me-2'><i class="fa-solid fa-cart-plus"></i></button>
<button onClick={()=> removeMyProductFromWishlist(product.id)} className='btn btn-outline-danger '><i><i class="fa-regular fa-trash-can"></i></i></button>
</div>
</article>
</div>
</div>)}


  </div>




  </>
}
