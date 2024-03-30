import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
 //import * as Yup from 'yup';
// yup validation
//  const mySchema = Yup.object({
//    name: Yup.string('The name must consist of letters only').required("name is required").min(3,"name must be at least 3 characters").max(10,"The name must not exceed 10 characters" ),
//    phone: Yup.string().required().matches(/^01[0125][0-9]{8}$/),
//    email: Yup.string().email("invalid email address").required("email is required"),
//    password:Yup.string().min(6).max(12),
//    rePassword:Yup.string().oneOf([Yup.ref('password')]),
//  })

export default function Register() {

    var userData = {
      name:'',
      phone:'',
      email:'',
      password: '',
      rePassword:'',

    } ;

     
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errmessage, seterrmessage] = useState(undefined);
  const navigation = useNavigate();
  
    


   async function mySubmit(values){
      //  console.log('submitted..' , values);

       setisLoading(true)

      // send the data to the backend using axios 

      await axios.post( 'https://ecommerce.routemisr.com/api/v1/auth/signup',values)
       
       .then((x)=>{
        setIsSuccess(true);
       setisLoading(false)


        setTimeout(function(){
          setIsSuccess(false)
          navigation('/login')

        },2000) 

        // in case of success
        // console.log("in case of success : x" ,x);
        
       }).catch((x)=>{
       setisLoading(false)
        setTimeout(function(){
          seterrmessage(undefined)
        },2000)  



        // in case of errorr
       seterrmessage(x.response.data.message);


        console.log("in case of errorr : x" , x);
       })
      //  console.log(res.data);
    }

  const myFormik = useFormik({
    initialValues : userData,
    onSubmit : mySubmit,
     validate: function(values){
       const errors ={};
      const nameRegex = /^[A-Z][a-z]{3,7}$/ ;
      const phoneRegex = /^01[0125][0-9]{8}$/;
     if (nameRegex.test(values.name)=== false) {
         errors.name="Name must be from 3 to 7 characters starting with capital letter";
       }

       if (values.email.includes('@') !== true || values.email.includes('.') !== true ) {
         errors.email="Email must be in format";
       }

       if (phoneRegex.test(values.phone)=== false) {
         errors.phone="Phone must be an Egyptian number";
       }

       if (values.password.length < 6 || values.password.length > 12  ) {
         errors.password = "Password must be from 6 to 12 character" 
       }

       if (values.rePassword !== values.password) {
         errors.rePassword = "Password and repassword don't match"
       }

      //  console.log("errors" , errors);

       
       return errors;


      
    
// yup validation

     //validationSchema: mySchema

    },
});




  return <>
  <Helmet>
      <title>Register</title>
  </Helmet>
  <div className="w-75 p-5 m-auto">
  
    {isSuccess ?   <div className="alert alert-success text-center">congratulation your account has been created successfully</div> : "" }
    {errmessage ?  <div className="alert alert-danger text-center">{errmessage}</div> : ""}

    <h2>Rgister now :</h2>
    <form onSubmit={myFormik.handleSubmit }>

     
    <label htmlFor="name">name:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange}  value={myFormik.values.name} type="text" id='name' placeholder='name' className='form-control mb-3' />
      {myFormik.errors.name && myFormik.touched.name ? <div className="alert alert-danger">{myFormik.errors.name}</div> : ""}

      <label htmlFor="email">email:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="email" id='email' placeholder='email' className='form-control mb-3' />
      {myFormik.errors.email && myFormik.touched.email  ? <div className="alert alert-danger">{myFormik.errors.email}</div> : ""}

      <label htmlFor="phone">phone:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} type="text" id='phone' placeholder='phone' className='form-control mb-3' />
      {myFormik.errors.phone && myFormik.touched.phone ? <div className="alert alert-danger">{myFormik.errors.phone}</div> : ""}

      <label htmlFor="password">password:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} type="password" id='password' placeholder='password' className='form-control mb-3' />
      {myFormik.errors.password && myFormik.touched.password ? <div className="alert alert-danger">{myFormik.errors.password}</div> : ""}

      <label htmlFor="rePassword">rePassword:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.rePassword} type="password" id='rePassword' placeholder='rePassword' className='form-control mb-3' />
      {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className="alert alert-danger">{myFormik.errors.rePassword}</div> : ""}
      <button type='submit' className='bg-main p-2 text-white rounded-3 btn'>
        
        {isLoading ? <ColorRing
          visible={true}
          height="30"
          width="30"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
          /> : "Register" }
        
        
        
        
        </button>






    </form>



  </div>
  
  </>
}
