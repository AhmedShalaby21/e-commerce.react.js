import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import {useNavigate } from 'react-router-dom';
import {AuthContext } from '../Context/AuthContext';
import { Helmet } from 'react-helmet';
// import * as Yup from 'yup';
// yup validation
// const mySchema = Yup.object({
//   name: Yup.string('The name must consist of letters only').required("name is required").min(3,"name must be at least 3 characters").max(10,"The name must not exceed 10 characters" ),
//   phone: Yup.string().required().matches(/^01[0125][0-9]{8}$/),
//   email: Yup.string().email("invalid email address").required("email is required"),
//   password:Yup.string().min(6).max(12),
//   rePassword:'',
// })

export default function Login() {

    var userData = {
      email:'',
      password: '',
    } ;

     
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errmessage, seterrmessage] = useState(undefined);
  const [userName, setUserName] = useState('');
  
  const navigation = useNavigate();

  const {setToken,getUserData} = useContext(AuthContext);
  
  
  
    


   async function mySubmit(values){
      //  console.log('submitted..' , values);
       setisLoading(true)
      

      // send the data to the backend using axios 

      await axios.post( 'https://ecommerce.routemisr.com/api/v1/auth/signin',values)
        .then((x)=>{
          
        if (x.data.message === "success") {
          localStorage.setItem("Token",x.data.token)
        setToken(x.data.token);
        setUserName(x.data.user.name);
        getUserData();

        
          setIsSuccess(true);
          setisLoading(false);


        setTimeout(function(){
          setIsSuccess(false)
          navigation('/products')

        },2000) 

        // in case of success
        //  console.log("in case of success : x" , x);
        //  console.log("Token :", x.data.token );

        
        }
        
       }).catch((x)=>{
       setisLoading(false)
        setTimeout(function(){
          seterrmessage(undefined)
        },2000)  



        // in case of errorr
        seterrmessage(x.response.data.message);


        // console.log("in case of errorr : x" , x);
       })
      //  console.log(res.data);
    }

  const myFormik = useFormik({
    initialValues : userData,
    onSubmit : mySubmit,
     validate: function(values){
       const errors ={};
     
       

       if (values.email.includes('@') !== true || values.email.includes('.') !== true ) {
         errors.email="Email must be in format";
       }

      

       if (values.password.length < 6 || values.password.length > 12  ) {
         errors.password = "Password must be from 6 to 12 character" 
       }

       
      //  console.log("errors" , errors);

       
       return errors;


      
    
// yup validation

    // validationSchema: mySchema

    },
});




  return <>
  <Helmet><title>Login</title></Helmet>
  <div className="w-75 p-5 m-auto">
  
    {isSuccess ?   <div className="alert alert-success text-center">Welcome back {userName}</div> : "" }
    {errmessage ?  <div className="alert alert-danger text-center">{errmessage}</div> : ""}

    <h2>Login now :</h2>
    <form onSubmit={myFormik.handleSubmit }>

     
   
      <label htmlFor="email">email:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="email" id='email' placeholder='email' className='form-control mb-3' />
      {myFormik.errors.email && myFormik.touched.email  ? <div className="alert alert-danger">{myFormik.errors.email}</div> : ""}

      

      <label htmlFor="password">password:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} type="password" id='password' placeholder='password' className='form-control mb-3' />
      {myFormik.errors.password && myFormik.touched.password ? <div className="alert alert-danger">{myFormik.errors.password}</div> : ""}

      
      <button type='submit' className='bg-main p-2 text-white rounded-3 btn'>
        
        {isLoading ? <ColorRing
          visible={true}
          height="30"
          width="30"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
          /> : "Login" }
        
        
        
        
        </button>






    </form>



  </div>
  
  </>
}
