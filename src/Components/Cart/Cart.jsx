import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import { FallingLines } from 'react-loader-spinner'
import toast from 'react-hot-toast';
import "./cart.css"
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
 const{  updateCount,totalCartPrice,allProducts,deleteProduct,clearCart,isLoading,getUserCart } = useContext(CartContext);
 const [loadingData, setLoadingData] = useState(true); // Add loading state

 useEffect(() => {
   getUserCart().then(() => setLoadingData(false)); // Update loading state after fetching data
 }, []);


if (isLoading || loadingData) {
  return (
    <div className="d-flex vh-100 bg-main bg-opacity-50 justify-content-center align-items-center">
      <FallingLines
        color="white"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
  );
}

 
 

if (allProducts.length === 0) { 
  return (
      <div className="container bg-white pt-3">
          <Helmet><title>Cart</title></Helmet>
          <h2 className='text-center'>Cart</h2>

          <h5 className='text-center text-main'>No items in your Cart</h5>
          <div className=" w-100 d-flex justify-content-center align-content-center ">
              <img src= {require('../../images/8c1099726d0428fed0e0a2f0a5430b37.jpg')} alt="" />
              </div>

      </div>
  );
}


 async function updateMyProduct(id , newCount){
   const res = await updateCount(id , newCount);

   if(res){
    toast.success('Product Updated Successfully', {position: 'top-center'})
   }
   else{
    toast.error('Error Occured', {position: 'top-center'})

   }
 }
 async function deleteMyProduct(id ){
  const res = await deleteProduct(id);
  if(res){

    toast.success('Product Deleted Successfully', {position: 'top-center'})
  }
  else{
   toast.error('Error Occured', {position: 'top-center'})

  }

 }

 async function clearMyCart(){
  const res = await clearCart();
  if(res){
    toast.success('Cart Cleared Successfully' ,{position:'top-center'})
  }
  else{
    toast.error('Error Occured' ,{position:'top-center'})
  }
 }

  return <>
  <Helmet><title>Cart</title></Helmet>
  
  {allProducts.length ?<div className="container shadow bg-light p-3 mt-3 ">
<h2 className='text-center'>Shop Cart</h2>
<h5 className=' text-center text-main'>Total Cart Price : {totalCartPrice} EGP</h5>
<div className="d-flex justify-content-between">
  <button onClick={clearMyCart} className='btn btn-outline-danger text-center  '>Clear Cart</button>
<Link to= '/Payment'><button className='btn btn-outline-success text-main '>Confirm Payment</button></Link></div>
{allProducts.map((product,idx)=> <div key={idx} className="row align-items-center  border-bottom border-dark-subtle p-4 ">

<div className="col-1">
<figure>
<img className='w-100' src={product.product.imageCover} alt={product.product.title} />
</figure>
</div>
<div className="col-9">
<article>
<h3 className='h6'><b>{product.product.title}</b></h3>
<h5 className='text-main'>Price : {product.price}</h5>

{/* <br/>
1:{product._id}
<br/>
<br/>

2:{product.product.id} */}

<button onClick={()=>deleteMyProduct(product.product.id , product.count - 1 )} className='btn btn-outline-success'><i><i class="fa-regular fa-trash-can"></i></i></button>
</article>

</div>
<div className="col-2">
<div className='d-flex justify-content-between align-items-center'>
<button onClick={()=>updateMyProduct(product.product.id ,product.count + 1 )} className='btn btn-outline-success'>+</button>
<p>{product.count}</p>
<button disabled={product.count === 1 }  onClick={()=>updateMyProduct(product.product.id ,product.count - 1 )} className='btn btn-outline-success'>-</button>
</div>
</div>






</div> )}



</div> :<div  className='d-flex justify-content-center align-content-center '><img src= {require('../../images/8c1099726d0428fed0e0a2f0a5430b37.jpg')} alt="" /></div>}
 
  
  
  </>
}
