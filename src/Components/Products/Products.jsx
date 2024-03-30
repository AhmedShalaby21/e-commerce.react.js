import axios from 'axios'
import React, { useContext, useEffect, useState} from 'react'
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import SimpleSlider from '../Homeslider/HomeSlider';
import CategorySlider from '../CategorySlider/CategoreySlider';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { WishlistContext } from '../Context/WishlistContext';






export default function Products() {
 

 

 const {addProductToWishlist,removeProductFromWishlist} = useContext(WishlistContext);

  const{addProductToCart,getUserCart} = useContext(CartContext);
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
  
 
 async function addProduct(id){
  const res = await addProductToCart(id)
  // console.log('response from products',res);
  if(res.status === "success"){
            
    toast.success('Product Added Successfully',{duration:1500,position:'top-center'})
    getUserCart();
} else {
    toast.error('Failed To Add Product',{duration:1500,position:'top-center'})
    
}
 }
 
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


  


  
  async function getAllProducts(){
   return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  

  }
                                        //cache data
 const {isLoading,data,error,isFetching} = useQuery('getAllproducts', getAllProducts,{
     
 });
 
 useEffect(() => {
  localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
}, [likedProducts]);

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
  
  return <>
  <Helmet>
    <title>Products</title>
  </Helmet>
  

<div className="container   g-3">
  <div className="row g-5 ">
    <div className="col-md-9">
    <SimpleSlider/>
    </div>
    <div className="col-md-3    ">
      <div><img style={{height: "200px"}} className='w-100 mb-2  '  src={require('../../images/blog-img-2.jpeg')} alt="" /></div>

      <div><img style={{height: "200px"}} className='w-100 '  src={require('../../images/grocery-banner-2.jpeg')} alt="" /></div>

      
    </div>
    <CategorySlider/>
  </div>


  
  
<div className=" products row mt-4 gy-4">
  {data.data.data.map((Product,idx)=> {
    
    // console.log("productId", Product.id);
    
    
    
    
    
    
    return <div key={idx} className="col-md-2 overflow-hidden">
     


<Link className='product' to={`/ProductDetails/${Product.id}`}>
  <div >
{/* image cover */}
<img src={Product.imageCover} alt="" className='w-100' />

<h4 className='h6 text-main '><b>{Product.category.name}</b></h4>
<h3 className='h4'>{Product.title.split(' ').slice(0,2).join(' ')}</h3>
<div className="d-flex justify-content-between">
{Product.priceAfterDiscount ?<p><span className='text-decoration-line-through'>{Product.price}</span>-{Product.priceAfterDiscount}</p> : <p>{Product.price}</p>  }

<p>  <span> <i style={{color:"#ffc908"}} className='fa-solid fa-star'></i></span> {Product.ratingsAverage}</p>
</div>

</div>
</Link>
<div className="btns d-flex ">
<button onClick={()=> addProduct(Product.id)} className=' addBtn btn bg-main text-white d-block m-auto w-50 me-2'><i class="fa-solid fa-cart-plus"></i></button>
<button
  onClick={() => {
    toggleLike(Product.id);
    addmyProductToWishlist(Product.id);
  }}
  className={`lovebtn btn addBtn bg-danger text-white d-block m-auto w-50 ${
    likedProducts[Product.id] ? 'liked' : ''
  }`}
>
<i className={`fa ${likedProducts[Product.id] ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>

</button>

</div>
</div>})}
</div>
</div>




  </>
}
