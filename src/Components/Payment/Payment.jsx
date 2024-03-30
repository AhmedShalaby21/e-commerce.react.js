import axios from 'axios'
import React, { useContext, useState } from 'react'
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Payment() {
    const {cartID , clearCart} = useContext(CartContext);
    const nav = useNavigate();

    function confirmCashPayment(){


        const details = document.getElementById('details').value;
        const phone = document.getElementById('phone').value;
        const city = document.getElementById('city').value;


       const shippingObject = {
            "shippingAddress":{
                "details": details,
                "phone": phone ,
                "city": city
                }
        }
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,shippingObject,
        {headers: {Token: localStorage.getItem('Token')}})
        .then((res)=>{
            if(res.data.status === "success"){
                toast.success('Payment Completed Successfully')
                clearCart();
                setTimeout(() => {
                    nav('/Products')
                }, 1500);
            }
        })
        .catch((err)=>{
            console.log('err', err);
            toast.error('Error Occurred')
        })
    }


    function confirmOnlinePayment(){


        const details = document.getElementById('details').value;
        const phone = document.getElementById('phone').value;
        const city = document.getElementById('city').value;


       const shippingObject = {
            "shippingAddress":{
                "details": details,
                "phone": phone ,
                "city": city
                }
        }
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}`,shippingObject,
        {headers: {Token: localStorage.getItem('Token')}
        ,params : {url: 'http://localhost:3000' }
    }
        )
        .then((res)=>{
            if(res.data.status === "success"){
                toast.success('Payment Completed Successfully')
                window.open(res.data.session.url,"_self")
            }
        })
        .catch((err)=>{
            console.log('err', err);
            toast.error('Error Occurred')
        })
    }


 




    return <>
    <Helmet><title>Payment</title></Helmet>
    <div className="container p-5 bg-white">
        <h2 className='text-center'>Payment</h2>
    <div className="w-75 m-auto">


        <label htmlFor="city">City:</label>
        <input type="text" id='city' placeholder='city' className='form-control mb-2'/>


        <label htmlFor="Phone">Phone:</label>
        <input type="text" id='phone' placeholder='Phone' className='form-control mb-2'/>


        <label htmlFor="Details">Details:</label>
        <textarea type="text" id='details' placeholder='Details' className='form-control mb-2'></textarea>
        <div className="div d-flex justify-content-between  ">
        <button style={{backgroundColor:"#0aad0a" , color:"white"}} onClick={confirmCashPayment} className='btn '>Confirm Cash Payment</button>
        <button  style={{backgroundColor:"#0aad0a" , color:"white"}} onClick={confirmOnlinePayment} className='btn'>Confirm Online Payment</button>
        </div>
    </div>
    </div>
    
    
    
    
    </>

}

























































