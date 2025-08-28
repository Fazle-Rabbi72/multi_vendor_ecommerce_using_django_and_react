import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const useAuthStore = create((set, get) => ({
  allUserData: null,
  loading: false,

  user: () => get().allUserData,

  setUser: (user) => {
    set({ allUserData: user });
  },

  setLoading: (loading) => set({ loading }),

  isLoggedIn: () => get().allUserData !== null,

  // 🔹 reload দিলে cookie থেকে user restore
  hydrateUser: () => {
    const accessToken = cookies.get("access_token");
    if (!accessToken) {
      set({ allUserData: null });
      return;
    }
    try {
      const decoded = jwtDecode(accessToken);
      set({ allUserData: decoded });
    } catch (err) {
      console.error("Invalid token", err);
      set({ allUserData: null });
    }
  },
}));

if (import.meta.env.DEV) {
  mountStoreDevtool("store", useAuthStore);
}

export { useAuthStore };
