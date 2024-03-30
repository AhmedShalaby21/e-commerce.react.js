import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { FallingLines } from 'react-loader-spinner';

export default function AllOrders() {
    

     const [AllOrders, setAllOrders] = useState(null);
    function getUserOrders(){
        const userID = localStorage.getItem('userID')
        axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`)
        .then((res)=>{
            setAllOrders(res.data);
            
           

        })
        .catch((err)=>{
            
            console.log('err',err);
        })
    }
    useEffect(()=> {
        getUserOrders();
       
    
    }, [])

    if(!AllOrders){
        return  <div className="d-flex vh-100 bg-main bg-opacity-50 justify-content-center align-items-center">
        <FallingLines
        color="white"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
        />
      
        </div>
    }
    
    



    
    
    return <>
    <Helmet><title>AllOrders</title></Helmet>

    <div className="container shadow bg-light p-3 mt-3">
    <h2>Orders</h2>

        <div className="row">
        {AllOrders.map((order ,idx)=> <div key={idx} className="col-md-12">
                
                <div className="order  border-bottom border-dark-subtle p-4 ">
                    <h2 className='pb-3 text-center'>Order</h2>

                    <div className="container">
                        <div className="row">
                            
                             {order.cartItems.map((cartItem, cartIdx)=> <div key={cartIdx} className="col-md-2">
                                <div className="montag   h-100 bg-light ">
                                        <figure>
                                            <img className="w-100" src={cartItem.product.imageCover} alt={cartItem.product.title} />
                                        </figure>
                                        
                                            
                                        
                                        <div className="text-center ">
                                            <p><b>{cartItem.product.title}</b></p>
                                           <h6 className='text-main'><b>Price: {cartItem.price}</b></h6>
                                           <h6 className='text-main'><b>Count: {cartItem.count}</b></h6>
                                        </div>
                                    
                                </div>
                             </div> ) } 

                        </div>
                    </div>
                    

               <div className='text-center pt-5'>
               <h5 className='text-main'>Payment Method: {order.paymentMethodType}</h5>
                                <h5 className='text-main'>Order Price: {order.totalOrderPrice}</h5>
                                <p>This Order Is Delivering To: {order.user.name}</p>
                                <p>Phone: {order.user.phone}</p>
               </div>

                </div>
            </div> )}
           
        </div>
    </div>
           
        </>
}

{/* <div className="container shadow bg-light p-3 mt-3">
    <h2>Orders</h2>
    <div className="row">
        {AllOrders.map((order, idx) => (
            <div key={idx} className="col-md-12 mb-3">
                <div className="order w-100 border-bottom border-dark-subtle">
                    <div className="container">
                        <div className="row">
                            {order.cartItems.map((cartItem, cartIdx) => (
                                <div key={cartIdx} className="col-md-2 p-4">
                                    <div className="d-flex flex-column align-items-center">
                                        <figure>
                                            <img className="w-100" src={cartItem.product.imageCover} alt={cartItem.product.title} />
                                        </figure>
                                        <div className="text-center">
                                            <p><b>{cartItem.product.title}</b></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="col-md-8 d-flex flex-column justify-content-center">
                                <h5 className='text-main'>Payment Method: {order.paymentMethodType}</h5>
                                <h5 className='text-main'>Order Price: {order.totalOrderPrice}</h5>
                                <p>This Order Is Delivering To: {order.user.name}</p>
                                <p>Phone: {order.user.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>  */}
