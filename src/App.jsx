
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Products from './Components/Products/Products'
import NotFoundcomponent from './Components/NotFoundcomponent/NotFoundcomponent'
import { AuthContextProvider } from './Components/Context/AuthContext'
import Categories from './Components/Categories/Categories'
import Cart from './Components/Cart/Cart'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Components/Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Payment from './Components/Payment/Payment'
import AllOrders from './Components/AllOrders/AllOrders'
import Profile from './Components/Profile/Profile'
import { Offline } from 'react-detect-offline'
import { WishlistContextProvider } from './Components/Context/WishlistContext'
import Wishlist from './Components/Wishlist/Wishlist'
import Brands from './Components/Brands/Brands'
import BrandsProduct from './Components/BrandsProduct/BrandsProduct'
import CategoryProduct from './Components/CategoryProduct/CategoryProduct'







const myRouter = createBrowserRouter([
  {path:'/' , element:<Layout/>, children:[
  {index:true , element:<Login/>},
  {path:'register' , element:<Register/>},
  {path:'Login' , element: <Login/>},
  {path:'products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
  {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
  {path:'cart' , element: <ProtectedRoute><Cart/></ProtectedRoute>},
  {path:'ProductDetails/:id' , element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
  {path:'Payment' , element: <ProtectedRoute><Payment/></ProtectedRoute>},
  {path:'AllOrders' , element: <ProtectedRoute><AllOrders/></ProtectedRoute>},
  {path:'Profile' , element: <ProtectedRoute><Profile/></ProtectedRoute>},
  {path:'Wishlist' , element: <ProtectedRoute><Wishlist/></ProtectedRoute>},
  {path:'Brands' , element: <ProtectedRoute><Brands/></ProtectedRoute>},
  {path: 'Brands/:brandId' , element: <ProtectedRoute><BrandsProduct/></ProtectedRoute> },
  {path: 'categories/:CategoryId' , element: <ProtectedRoute><CategoryProduct/></ProtectedRoute>},







  {path:'*' , element:<NotFoundcomponent  />},
]},
  
])



export default function App() {
  

  const myClient =  new QueryClient();
  

  return <>
  <div>
    
 
  
  <QueryClientProvider client={myClient}>
  
    <CartContextProvider>
   <WishlistContextProvider>
    <AuthContextProvider>
  
  <RouterProvider router={myRouter}/>
  </AuthContextProvider>
  </WishlistContextProvider>
 
  </CartContextProvider>
  
  </QueryClientProvider>
  <Toaster/>
  <Offline>
    <div className=" bg-dark fixed-bottom text-white">
      <h2>You're offline right now. Check your connection.
      </h2>
    


    </div>
  </Offline>
  </div>
  
  </>
}
