import { create } from "zustand";
import axios from 'axios';
import toast from "react-hot-toast";



export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,

  checkAuth: async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/check`)
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
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`,data)
      set({ authUser: res.data });
      toast.success("Account created successfully !");

    } catch (error) {
      console.log("erro in the signup function ")
      toast.error(error.message)
    } finally {
      set({ isSigningUp: false })
    }
  }

}));