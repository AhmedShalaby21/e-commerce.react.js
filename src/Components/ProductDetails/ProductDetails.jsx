import axios from 'axios';
import React, { useContext, useState } from 'react'
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import NotFoundcomponent from '../NotFoundcomponent/NotFoundcomponent';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import './ProductDetails.css';
import { WishlistContext } from '../Context/WishlistContext';


export default function ProductDetails() {
   
     const {addProductToCart,getUserCart} =  useContext(CartContext);
     const  {addProductToWishlist,removeProductFromWishlist} = useContext(WishlistContext);
     const [likedProducts, setLikedProducts] = useState(() => {
        const savedLikedProducts = localStorage.getItem('likedProducts');
        return savedLikedProducts ? JSON.parse(savedLikedProducts) : {};
      });
      
      
    
      const toggleLike = (productId) => {
        const updatedLikedProducts = { ...likedProducts };
        if (updatedLikedProducts[productId]) {
          delete updatedLikedProducts[productId]; // Remove the product from liked list
        } else {
          updatedLikedProducts[productId] = true; // Add the product to liked list
        }
        setLikedProducts(updatedLikedProducts);
        localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));
      };
   
      async function addmyProductToWishlist(productId) {
        try {
          // Check if the product is already in the wishlist
          if (likedProducts[productId]) {
            // If it is, remove it from the wishlist
            await removeProductFromWish(productId);
          } else {
            // If not, add it to the wishlist
            const result = await addProductToWishlist(productId);
            if (result.data.status === "success") {
              toast.success('Product added successfully to your wishlist', { duration: 1500, position: 'top-center' });
            } else {
              toast.error('Failed To Add Product', { duration: 1500, position: 'top-center' });
            }
          }
        } catch (error) {
          // Error already handled in addProductToWhichlist and removeProductFromWishlist
        }
        
      }
      async function removeProductFromWish(id) {
        toast.promise(removeProductFromWishlist(id), {
          loading: 'Removing from wishlist',
          success: 'Removed from wishlist successfully',
          error: 'Failed to remove from wishlist'
        });
      }


    const {id} = useParams();
    async function addProductBtn(id){
       
        const res =  await addProductToCart(id);
    
        if(res.status === "success"){
            getUserCart();
            toast.success('Product Added Successfully',{duration:1500,position:'top-center'})
        } else {
            toast.error('Failed To Add Product',{duration:1500,position:'top-center'})
            
        }
      }

     
    function getProductDetails(){
       return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }


    const{isLoading , data , isError }=useQuery(`ProductDetails-${id}`, getProductDetails);
    if (isLoading) {
        return <div className="d-flex vh-100 bg-main bg-opacity-50 justify-content-center align-items-center">
        <FallingLines
        color="white"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
        />
      
        </div>
          
        }

        if (isError) {
            return <NotFoundcomponent/>
            
        }
        const ProductDetails = data.data.data; 
        
   
        function changeImg(e) {
            document.getElementById('mainImg').src = e.target.src
        }
        return <>
        <Helmet>
        <title>{ProductDetails.title}</title>
        </Helmet>
      <div className='container  mt-4 py-4'>
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="row align-items-center imgs-row">
              <div className="col-md-2">
                <div className="imgs ">
                  {ProductDetails.images.map(function(img , index ) {
                    return <div key={index} className='product-img  overflow-hidden shadow mb-3 '>
                      <img onClick={changeImg} src={img} className='w-100 cursor-pointer ' alt="" />
                    </div>
                  })}
            </div>
              </div>
              <div className="col-md-8">
              <div className='main-img mb-3'>
                <img id='mainImg' className='w-100 cursor-pointer  shadow' src={ProductDetails.imageCover} alt={data.data.data.title} />
              </div>
              </div>
            </div>
    
          </div>
          <div className="col-md-6">
            <div>
              <h3 className='mb-1 text-main fw-bolder text-center mb-4 '>{ProductDetails.title}</h3>
              <p className=''>{ProductDetails.description}</p>
              <p className='text-main text-center'>{ProductDetails.category.name}</p>
              <div className='d-flex justify-content-between m-2'>
                <span><b>Price:{ProductDetails.price} EGP</b></span>
                <span><i style={{color : 'gold'}} className="fa-solid fa-star"></i> {ProductDetails.ratingsAverage}</span>
              </div>
              <div className="btns d-flex ">
                <button onClick={()=> addProductBtn(ProductDetails.id)} className=' addBtn btn bg-main text-white d-block m-auto w-50 me-2'><i class="fa-solid fa-cart-plus"></i></button>
                    <button
                    onClick={() => {
                 toggleLike(ProductDetails.id);
                    addmyProductToWishlist(ProductDetails.id);
                }}
                 className={`lovebtn btn addBtn bg-danger text-white d-block m-auto w-50 ${
                likedProducts[ProductDetails.id] ? 'liked' : ''
                        }`}
                                >
                                <i className={`fa ${likedProducts[ProductDetails.id] ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                                
                            </button>

                            </div>
            </div>
          </div>
        </div>
      </div>
      
      </>
    }