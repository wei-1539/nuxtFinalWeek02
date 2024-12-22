import { defineStore } from "pinia";
export const useAuthStore = defineStore("auth", () => {
  // 填入 token
  const token = ref(null);

  const tokenCookie = useCookie("auth_token");
  // 檢查使否登入
  const isAuthenticated = computed(() => !!tokenCookie.value);

  // 設定cookie
  const setToken = (getToken) => {
    token.value = getToken;

    tokenCookie.value = token.value;
  };

  // 移除cookie
  const clearToken = () => {
    token.value = null;

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

  const logout = () => {
    clearToken();
  };

  // 取得使用者資料
  const userObject = ref({});
  const getUserObject = async () => {
    if (!tokenCookie.value) return;
    try {
      const { $axios } = useNuxtApp();

      const response = await $axios.get("/api/v1/user/", {
        headers: {
          Authorization: `${tokenCookie.value}`,
        },
      });
      userObject.value = response.data.result;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    token,
    login,
    logout,
    getUserObject,
    userObject,
    isAuthenticated,
  };
});
