import { defineStore } from "pinia";
export const useRoomStore = defineStore("room", () => {
  const { $axios } = useNuxtApp();
  //   取得房型資料
  const roomData = ref();
  const getRoomData = async () => {
    try {
      const response = await $axios.get("/api/v1/rooms/");
      roomData.value = response.data.result;
    } catch (err) {
      console.log(err);
    }
  };
  // 取出個別房型
  const detailRoomData = ref();
  const getDetailRoomData = async (roomId) => {
    try {
      const response = await $axios.get(`/api/v1/rooms/${roomId}`);
      detailRoomData.value = response.data.result;
    } catch (err) {
      console.log(err);
    }
  };
  return {
    roomData,
    getRoomData,
    detailRoomData,
    getDetailRoomData,
  };
});
