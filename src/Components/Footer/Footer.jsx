import React from 'react'

export default function Footer() {
  return <>
  
  <footer className='bg-main-light  w-100 p-4 mt-5   '>
    <h3>Get The FreashCart App</h3>
    <p className='text'>We Will Send You A Link, Open It On Your Phone To Download The App </p>
   <div className='d-flex justify-content-evenly  '><input className='form-control w-75 ' type="email" placeholder='Email' />
    <button className='bg-main btn  text-center text-white  '>Share App Link</button></div> 
    <div className='d-flex justify-content-between border-top mt-4 border-bottom mb-3 me-5 ms-5'>
   <div className='d-flex '>
    <p className='pt-4 me-3'><b>Payment Partners</b></p>
   <ul className='  list-unstyled align-items-center d-flex pt-4'>

    <li><i className=" text-info fa-brands fa-amazon-pay me-2 fa-lg "></i></li>
    <li><i className=" text-info fa-brands fa-paypal me-2 fa-lg"></i></li>
    <li><i className=" text-info fa-brands fa-cc-mastercard fa-lg"></i></li>

   </ul></div> 
   <div className='d-flex'>
   <p className='pt-4 me-3'><b>Get Deliveries With FreashCart </b></p>

   <ul className='  list-unstyled align-items-center d-flex pt-4'>
    <li><i class="fa-brands fa-app-store me-2 fa-lg"></i></li>
   <li><i class="fa-brands fa-google-play fa-lg"></i></li>
   </ul>
   </div> 
   </div>

   
   
   
   
    
  
  </footer>
 

  
  </>
}
