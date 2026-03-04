import { create } from "zustand";
import axios from 'axios';
import toast from "react-hot-toast";



export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/check`, {
        withCredentials: true
      })
      set({ authUser: res.data })
    } catch (error) {
      console.log("error in the useAuth", error);
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },


  signup: async (data) => {
       console.log("Signup sending data to frontend is ", data)
    set({ isSigningUp: true })
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, data, {
        withCredentials: true
      })

      console.log("Signup sending data to frontend is ", data)
      set({ authUser: res.data });
      toast.success("Account created successfully !");

    } catch (error) {
      console.log("erro in the signup function ")
      toast.error(error.message)
    } finally {
      set({ isSigningUp: false })
    }
  }
  ,
  login: async (data) => {
     console.log("login  sending data to frontend is ", data)
    set({ isLoggingIn: true })
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, data, {
        withCredentials: true
      })
      set({ authUser: res.data });
      toast.success("LoggedIn SuccessFully successfully ");

    } catch (error) {
      console.log("erro in the signup function ")
      toast.error(error.message)
    } finally {
      set({ isLoggingIn: false })
    }
  }
  ,
  logout: async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        withCredentials: true
      })
      set({ authUser: null })
      toast.success("Logged out Successfully")
    } catch (error) {
      console.log("error in the logout frontend")
      toast.error(error.message)
    }
  }
  ,

  updateProfile: async (data) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/update-profile`, data, {
        withCredentials: true
      })
      set({ authUser: res.data })
      toast.success("Profile updated Successfully!")

    } catch (error) {
      console.log("error in the update frofile")
      toast.error(error.message)
    }
  }
})) 
