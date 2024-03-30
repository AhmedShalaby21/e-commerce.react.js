import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FallingLines } from 'react-loader-spinner';
import './Category.css';
import { Link } from 'react-router-dom';



export default function Categories() {

  const [Categories, setCategories] = useState(null);

  useEffect(()=>{
    getAllCategories();
    
  },[])

   function getAllCategories(){
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
   .then(res=>{
    setCategories(res.data.data)
    // console.log(res.data.data);
   })
   .catch(err=>{
    console.log('err', err);

   })

  }

   if(!Categories){
    return <div className="d-flex vh-100 bg-main bg-opacity-50 justify-content-center align-items-center">
    <FallingLines
    color="white"
    width="100"
    visible={true}
    ariaLabel="falling-circles-loading"
    />
  
    </div>
    
   }
   


  return<>
  <Helmet><title>Categories</title></Helmet>
  
  <div className="container bg-white mt-4">
  <h2 className='text-center mb-5 mt-2'>AllCategories</h2>
  <div className="row row-cols-1 row-cols-ms-3 g-3">
    {/* Map over the categories array and render each category */}
    {Categories.map(category => (

      <div className="col-md-4" key={category._id}>
         <Link to={`${category._id}`}>
        <div className="category bg-main-light ">
          {/* Display the name of the category */}
          
          <img loading='lazy' style={{height: "300px"}}  className='w-100' src={category.image} alt={category.name} />
          <h3 className='text-center text-main pb-4 pt-4'>{category.name}</h3>
        </div>
        </Link>
      </div>
      
    ))}
  </div>
</div>

  
  
  </>
}
