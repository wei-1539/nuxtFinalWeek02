import { defineStore } from "pinia";
export const useAuthStore = defineStore("auth", () => {
  // 填入 token
  const token = ref(null);

  const isAuthenticated = computed((token) => !!token.value);

  // 設定cookie
  const setToken = (getToken) => {
    token.value = getToken;
    const tokenCookie = useCookie("auth_token");
    tokenCookie.value = token.value;
  };

  // 移除cookie
  const clearToken = () => {
    token.value = null;
    const tokenCookie = useCookie("auth_token");
    tokenCookie.value = token.value;
  };

  // 登入

  const login = async (email, password) => {
    try {
      const { $axios } = useNuxtApp();
      // console.log("store值行", email, password, $axios);

      const response = await $axios.post("/api/v1/user/login", {
        email,
        password,
      });
      const token = response.data.token;
      setToken(token);
    } catch (err) {
      console.log("登入失敗", err);
      throw err;
    }
  };

  const initializeToken = () => {
    const tokenCookie = useCookie("auth_token");
    if (token.value) {
      token.value = tokenCookie.value;
    }
  };

  const logout = () => {
    clearToken();
  };
  return {
    token,
    login,
    logout,
  };
});
