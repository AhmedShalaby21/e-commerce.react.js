import React from 'react'
import errImg from '../../images/error.svg';
import { Helmet } from 'react-helmet';
export default function NotFoundcomponent() {
  return<>
  <Helmet><title>Not Found</title></Helmet>
  
  <img style={{height: "500px"}} className='w-100' src={errImg} alt="erorrimage" />
  
  </>
}
