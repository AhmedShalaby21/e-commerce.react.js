import React, { useContext, useState } from 'react'
import logo from '../../images/freshcart-logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { CartContext } from '../Context/CartContext';



export default function Navbar() {
  

 
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);



  const {myToken,setToken,userData }= useContext(AuthContext)
  const navigte = useNavigate();
 const {numOfCartItems} = useContext(CartContext);

  function Logout(){
    
    
    // remove token from your state 
    setToken(null);
    // remove token from local storage 
    localStorage.removeItem('Token');
    // navigater user to login 
    navigte('/login ')


  }



  return <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className='navbar-brand' to="/Products">
    <img src={logo} alt="fresh cart" />
    </Link>
    <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
   
   {myToken ? <ul className="navbar-nav me-auto">
      <li className="nav-item active">
      <NavLink className="nav-link" to="/products" style={({ isActive }) => ({color: isActive ? '#0aad0a' : '#000'})}
>
  <b>Home</b><span className="sr-only">(current)</span>
</NavLink>


      </li>
      <li className="nav-item">
        <NavLink  className="nav-link" style={({ isActive }) => ({color: isActive ? '#0aad0a' : '#000'})} to="/categories"><b>Categories</b></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" style={({ isActive }) => ({color: isActive ? '#0aad0a' : '#000'})} to="/brands"><b>Brands</b></NavLink>
      </li>
      <li className="nav-item position-relative">
        <NavLink className="nav-link" style={({ isActive }) => ({color: isActive ? '#0aad0a' : '#000'})} to="/cart"><b>Cart</b></NavLink>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
         { numOfCartItems ? numOfCartItems : "" }

    
  </span>
  </li>

  <li className="nav-item">
        <NavLink className="nav-link" style={({ isActive }) => ({color: isActive ? '#0aad0a' : '#000'})} to="/Wishlist"><b>Wishlist</b></NavLink>
        
      </li>
      

      <li className="nav-item">
        <NavLink className="nav-link" style={({ isActive }) => ({color: isActive ? '#0aad0a' : '#000'})} to="/AllOrders"><b>All Orders</b></NavLink>
      </li>

     
    
    </ul> : ""}
   
    

    
      
    <ul className="navbar-nav ms-auto list-unstyled align-items-center">
     
      <li className="nav-item ">
       <ul className='list-unstyled d-flex'>
        <li><i className=' me-2 fa-brands fa-instagram'></i></li>
        <li><i className=' me-2 fa-brands fa-facebook'></i></li>
        <li><i className=' me-2 fa-brands fa-tiktok'></i></li>

        <li><i className=' me-2 fa-brands fa-twitter'></i></li>
        <li><a href="https://www.linkedin.com/in/ahmed-shalaby-102b402b4/"><i className=' me-2 fa-brands fa-linkedin-in'></i></a></li>
        <li><i className=' me-2 fa-brands fa-youtube'></i></li>






       </ul>
      </li>
      {myToken ? <>
        <li className="nav-item">
        <span className="nav-span" ><b>{userData ? userData.name : 'Profile'}</b></span>
      </li>
      
        <li className="nav-item">
        <span onClick={Logout} role='button'  className="nav-link"  to="/register"><b>Logout</b></span>
      </li></>: <>
      
      <li className="nav-item">
        <NavLink className="nav-link" style={({ isActive }) => ({color: isActive ? '#0aad0a' : '#000'})} to="/login"><b>Login</b></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" style={({ isActive }) => ({color: isActive ? '#0aad0a' : '#000'})} to="/register"><b>Register</b></NavLink>
      </li>
      
      </> }
    
     
      
     
     
    </ul>
   
  </div>
</nav>
  
  </>
}
