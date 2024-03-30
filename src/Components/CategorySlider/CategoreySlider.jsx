import axios from "axios";
import React from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";

import { Link } from "react-router-dom";

export default function CategorySlider() {

    function getCategories(){
        return axios.get(' https://ecommerce.routemisr.com/api/v1/categories')

    }

    const {data , isLoading} = useQuery('categorySlider', getCategories );
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


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    
  };
  return (
    <div className="slider-container px-4">
    <Slider {...settings}>
      {data.data.data.map(function(cat , index) {
          return <Link key={index} to={`/Categories/${cat._id}`}>
                <div className="text-center text-main fw-bold p-1 cursor-pointer" >
                <img style={{height: '200px'}} src={cat.image} className="w-100 rounded-2" alt="" />
                <p>{cat.name}</p>
                </div>
          
          </Link>
      })}
    </Slider>
  </div>
  );
}