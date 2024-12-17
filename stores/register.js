import { defineStore } from "pinia";
export const useRegisterStore = defineStore("register", () => {
  const route = useRoute();
  const userRegisterObject = ref({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    address: {
      zipcode: "",
      detail: "",
    },
  });

  const processRegistration = async (requesterBody) => {
    try {
      const { $axios } = useNuxtApp();

      const response = await $axios.post("/api/v1/user/signup", {
        ...requesterBody,
      });
      console.log(response);
      route.push("/login");
    } catch (err) {
      const { message } = err.response._data;
      console.log(message);
    }
  };

  return {
    userRegisterObject,
    processRegistration,
  };
});
