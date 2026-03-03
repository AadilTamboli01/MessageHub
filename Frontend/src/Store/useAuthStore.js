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
    set({ isSigningUp: true })
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, data, {
        withCredentials: true
      })
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
    set({ isLogingIn: true })
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
      set({ isLogingIn: false })
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
    }
  }
}