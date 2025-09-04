import  { useAuthStore } from "../store/auth";
import axios from "./axios";
import {jwtDecode}  from "jwt-decode";
import cookies from "js-cookie";
import Swal from "sweetalert2";

const toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});


export const login =async(email,password)=>{
    try {
        const {data,status}= await axios.post("user/token/",{
            email,
            password
        })

        if(status===200){
            setAuthUser(data.access, data.refresh)
        }
        toast.fire({
            icon: "success",
            title: "User Logged In Successfully",
        })
        
        return {data, error:null}


    } catch (error) {
         toast.fire({
            icon: "error",
            title: error.response.data?.detail || "Something went wrong",
        })
        
    }
}


export const register =async(full_name,email,phone,password,password2)=>{
    try {
        const {data,status}= await axios.post("user/register/",{
            full_name,
            email,
            phone,
            password,
            password2
        })

        await login(email,password)
        toast.fire({
            icon: "success",
            title: "User Registered Successfully",
        })
        return {data, error:null}


    } catch (error) {
        toast.fire({
            icon: "error",
            title: error.response.data?.detail || "Something went wrong",
        })
      return {
        data: null,
        error: error.response.data?.detail || "Something went wrong",
      }     
    }

}

export const logout =()=>{
    cookies.remove("access_token")
    cookies.remove("refresh_token")
    useAuthStore.getState().setUser(null)
    toast.fire({
        icon: "success",
        title: "User Logged Out Successfully",
    })
}

export const setUser = async()=>{
    const accessToken = cookies.get("access_token")
    const refreshToken = cookies.get("refresh_token")
    if(!accessToken || !refreshToken){
        
        return;
    }
    
    if(isAccessTokenExpired(accessToken)){
        const response = await getRefreshToken(refreshToken)
        setAuthUser(response.access, response.refresh)
    }else{
        setAuthUser(accessToken, refreshToken)
    }
}


export const setAuthUser=(access_token, refresh_token)=>{
    cookies.set("access_token", access_token,{
        expires:1,
        secure:true
    })
    cookies.set("refresh_token", refresh_token,{
        expires:7,
        secure:true
    })

    const user=jwtDecode (access_token)?? null

    if(user){
        useAuthStore.getState().setUser(user)
    }
    
    useAuthStore.getState().setLoading(false)
    
}

export const getRefreshToken=async(refresh_token)=>{
    const refreshToken= cookies.get("refresh_token")
    const response = await axios.post("user/token/refresh/",{
        refresh:refreshToken
    })
    return response.data
}

const isAccessTokenExpired=(access_token)=>{
    try {
        const decoded = jwtDecode (access_token)
        const currentTime = Date.now() / 1000
        if(decoded.exp < currentTime){
            return true
        }
        return false
    } catch (error) {
        console.log(error)
        return true
    }
}