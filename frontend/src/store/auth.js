import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const useAuthStore = create((set, get) => ({
  allUserData: null,
  loading: true,

  setUser: (user) => set({ allUserData: user }),
  setLoading: (loading) => set({ loading }),

  
  isLoggedIn: false, 
  user: null,

  hydrateUser: () => {
    const accessToken = cookies.get("access_token");
    if (!accessToken) {
      set({ allUserData: null, isLoggedIn: false, user: null , loading: false});
      return;
    }
    try {
      const decoded = jwtDecode(accessToken);
      set({ allUserData: decoded, isLoggedIn: true, user: decoded, loading: false });
    } catch (err) {
      console.error("Invalid token", err);
      set({ allUserData: null, isLoggedIn: false, user: null , loading: false});
    }
  },
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Auth Store", useAuthStore);
}

export {useAuthStore};
