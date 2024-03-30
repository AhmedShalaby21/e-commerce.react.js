import {jwtDecode} from "jwt-decode";

import { createContext, useEffect, useState } from "react";




export const AuthContext = createContext();


export function AuthContextProvider({children}){

    const [Token, setToken] = useState(null);
    const [userData, setuserData] = useState(null);
    const [likedProducts, setLikedProducts] = useState(() => {
        const savedLikedProducts = localStorage.getItem('likedProducts');
        return savedLikedProducts ? JSON.parse(savedLikedProducts) : {};
    });
    

    useEffect(function(){
        const value = localStorage.getItem('Token')
    
        // console.log("Token from localStorage:", value); // Log the token value
    
        if (value != null) {
            setToken(value);
            // setuserData(value)
            getUserData(); 
          // Check if there are any liked products stored for this user
          const savedLikedProducts = localStorage.getItem('likedProducts');
          if (!savedLikedProducts) {
              // Clear liked products if not found (for new user)
              setLikedProducts({});
          } else {
              // Load liked products for returning user
              setLikedProducts(JSON.parse(savedLikedProducts));
          }
      } else {
          // Clear liked products when user logs out
          setLikedProducts({});
          localStorage.removeItem('likedProducts');
      }
    },[])
    

    function getUserData() {
        const token = localStorage.getItem('Token');
        if (typeof token !== 'string' || !token.trim()) {
            // console.error("Invalid token in localStorage:", token);
            return;
        }
    
        const decodedToken = jwtDecode(token);
        setuserData(decodedToken)
        // console.log('Decoded Token:', decodedToken);
       
        //  console.log("userdata",userData);
    }
    
    


    return<AuthContext.Provider   value={{myToken: Token , setToken ,setuserData , userData , getUserData}}>
    
    
    {children}
    
    
    </AuthContext.Provider>
}