import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import './Brands.css';
import { FallingLines } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Brands() {

    const [Brands, setBrands] = useState(null);

    useEffect(()=>{
        GetAllBrands();
    },[])

    async function GetAllBrands(){
        const res = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
        .then((res)=>{
            setBrands(res.data.data)
            // console.log('result from brands' , res);
        })
        .catch((err)=>{
            console.log('erorr from brands', err);
        })
        return res;
    }
        //   GetAllBrands();

        if(!Brands){
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
  <Helmet><title>Brands</title></Helmet>

  <div className="container bg-white mt-4">
        <h2 className='text-center  mb-5 mt-2'>Brands</h2>



    <div className="row">

    {Brands?.map(brand =>(
         <div key={brand._id} className="col-md-4">
            <div className="brand">     
        <Link to={`/brands/${brand._id}`}>
         
            <img  src={brand.image} alt={brand.name} className='w-100'  />
            <h3 className='text-center text-main '>{brand.name}</h3>

         
         </Link>
         </div>
     </div>
    ))}
        
        
    </div>
  </div>

    
  
  
  
  
  </>
}
