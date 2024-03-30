import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { WishlistContext } from '../Context/WishlistContext';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';

export default function CategoryProduct() {
    const nav = useNavigate()
    const{CategoryId}=useParams()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addProductToWishlist, removeProductFromWishlist } = useContext(WishlistContext);
  const { addProductToCart, getUserCart } = useContext(CartContext);
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



      
      useEffect(() => {
        getCategoryProducts();
    }, [CategoryId]);


    function getCategoryProducts(){
       const res = axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${CategoryId}`)
       .then((res)=>{
        setProducts(res.data.data);
        setLoading(false);
        // console.log('res from CategoryProduct ' , res);
       })
       .catch((err)=>{
        console.log('err from CategoryProduct ' , err);
       })
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

    const {isLoading , isError , data} = useQuery(`CategoryProduct-${CategoryId}` , getCategoryProducts)


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


    if (products.length === 0) {
        // Redirect to categories page if no products found
        nav('/categories');
       
    }
    if(isError){
      nav('/categories');
    }
    

 
   
    


  return <>
  
    
  
  <div className="container bg-white g-3">
     

        <div className="products row mt-4 gy-4">

          {products.map((product) => (
            
             
            <div key={product._id} className="col-md-2 overflow-hidden">

              
              <Link className="product" to={`/ProductDetails/${product._id}`}>
                {/* Product details */}
             
              
                <img className='w-100' src={product.imageCover} alt={product.title} />
                <h4 className='h6 text-main '><b>{product.category.name}</b></h4>
                <h3 className='h4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
                <div className="d-flex justify-content-between">
                    {product.priceAfterDiscount ?<p><span className='text-decoration-line-through'>{product.price}</span>-{product.priceAfterDiscount}</p> : <p>{ product.price}</p>  }

                <p>   <span><i style={{color:"#ffc908"}} className='fa-solid fa-star'></i></span>{product.ratingsAverage}</p>
                    </div> </Link>
              <div className="btns d-flex">
                <button onClick={() => addToCart(product._id)} className="addBtn btn bg-main text-white d-block m-auto w-50 me-2">
                <i class="fa-solid fa-cart-plus"></i>
                </button>
                <button
                  onClick={() => {
                    toggleLike(product._id);
                    addmyProductToWishlist(product._id);
                  }}
                  className={`lovebtn btn addBtn bg-danger text-white d-block m-auto w-50 ${likedProducts[product._id] ? 'liked' : ''}`}
                >
                  <i className={`fa ${likedProducts[product.id] ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                </button>
                
              </div>
              
            </div>

          ))}

        </div>
      </div>
    </>
  
}
     
     
