<script setup>
import { Icon } from "@iconify/vue";
const roomId = "a"; // for navigation demo
// 儲存訂單詳細資訊
const orderAll = ref();
const orderDetail = ref();
// 取出詳細訂單資料
const tokenCookie = useCookie("auth_token");
const getOrderDetailData = async () => {
  const { $axios } = useNuxtApp();
  try {
    const response = await $axios.get(`/api/v1/orders/`, {
      headers: {
        Authorization: `${tokenCookie.value}`,
      },
    });

    orderAll.value = response.data.result;
    orderDetail.value = response.data.result[0];
    // console.log(orderDetail);
  } catch (err) {
    console.log(err);
  }
};
await getOrderDetailData();

// 計算住幾晚
const calculateNights = (checkInDate, checkOutDate) => {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  const diffTime = checkOut.getTime() - checkIn.getTime();
  return Math.max(0, diffTime / (1000 * 60 * 60 * 24)); // 確保返回值不小於 0
};

// 總共住幾晚
const totalNights = computed(() => {
  return calculateNights(
    orderDetail.value.checkInDate,
    orderDetail.value.checkOutDate
  );
});

// 總價
const totalPrice = computed(() => {
  return orderDetail.value.roomId.price * totalNights.value;
});

// 取消訂單
const delOrderDetailData = async (orderId) => {
  const { $axios } = useNuxtApp();
  try {
    const response = await $axios.delete(`/api/v1/orders/${orderId}`, {
      headers: {
        Authorization: `${tokenCookie.value}`,
      },
    });
    console.log(response);
    console.log(orderAll.value);
    // console.log(orderDetail);
  } catch (err) {
    console.log(err);
  }
};
</script>
<template>
  <div>
    <div class="row gap-6 gap-md-0">
      <div class="col-12 col-md-7">
        <div
          class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-4 p-md-10 bg-neutral-0"
          style="max-width: 730px"
        >
          <div>
            <p class="mb-2 text-neutral-80 fs-8 fs-md-7 fw-medium">
              預訂參考編號： {{ orderDetail._id }}
            </p>
            <h2 class="mb-0 text-neutral-100 fs-7 fs-md-5 fw-bold">
              即將來的行程
            </h2>
          </div>

          <img
            class="img-fluid rounded-3"
            :src="orderDetail.roomId.imageUrl"
            :alt="orderDetail.roomId.name"
          />

          <section class="d-flex flex-column gap-6">
            <h3
              class="d-flex align-items-center mb-0 text-neutral-80 fs-8 fs-md-6 fw-bold"
            >
              <p class="mb-0">
                {{ orderDetail.roomId.name }}，{{ totalNights }} 晚
              </p>
              <span
                class="d-inline-block mx-4 bg-neutral-80"
                style="width: 1px; height: 18px"
              />
              <p class="mb-0">住宿人數：{{ orderDetail.peopleNum }} 位</p>
            </h3>

            <div class="text-neutral-80 fs-8 fs-md-7 fw-bold">
              <p class="title-deco mb-2">
                入住：{{
                  new Date(orderDetail.checkInDate).toLocaleDateString()
                }}，15:00 可入住
              </p>
              <p class="title-deco mb-0">
                退房：{{
                  new Date(orderDetail.checkOutDate).toLocaleDateString()
                }}，12:00 前退房
              </p>
            </div>

            <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-bold">
              NT$ {{ totalPrice }}
            </p>
          </section>

          <hr class="my-0 opacity-100 text-neutral-40" />

          <section>
            <h3 class="title-deco mb-6 text-neutral-100 fs-8 fs-md-7 fw-bold">
              房內設備
            </h3>
            <ul
              class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 border border-neutral-40 rounded-3 list-unstyled"
            >
              <li
                v-for="(facility, index) in orderDetail.roomId.facilityInfo"
                :key="index"
                class="flex-item d-flex gap-2"
              >
                <Icon
                  class="fs-5 text-primary-100"
                  icon="material-symbols:check"
                />
                <p class="mb-0 text-neutral-80 fw-bold">
                  {{ facility.title }}
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h3 class="title-deco mb-6 text-neutral-100 fs-8 fs-md-7 fw-bold">
              備品提供
            </h3>
            <ul
              class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 border border-neutral-40 rounded-3 list-unstyled"
            >
              <li
                v-for="(amenity, index) in orderDetail.roomId.amenityInfo"
                :key="index"
                class="flex-item d-flex gap-2"
              >
                <Icon
                  class="fs-5 text-primary-100"
                  icon="material-symbols:check"
                />
                <p class="mb-0 text-neutral-80 fw-bold">
                  {{ amenity.title }}
                </p>
              </li>
            </ul>
          </section>

          <div class="d-flex gap-4">
            <button
              data-bs-toggle="modal"
              data-bs-target="#cancelModal"
              class="btn btn-outline-primary-100 w-50 py-4 fw-bold"
              style="--bs-btn-hover-color: #fff"
              type="button"
            >
              取消預訂
            </button>
            <NuxtLink
              :to="`/rooms/${roomId}`"
              class="btn btn-primary-100 text-neutral-0 w-50 py-4 fw-bold"
              type="button"
            >
              查看詳情
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-5">
        <div
          class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-4 p-md-10 bg-neutral-0"
        >
          <h2 class="mb-0 text-neutral-100 fs-7 fs-md-5 fw-bold">歷史訂單</h2>

          <div class="d-flex flex-column flex-lg-row gap-6">
            <img
              class="img-fluid object-fit-cover rounded-3"
              style="max-width: 120px; height: 80px"
              src="@/assets/images/room-b-sm-1.png"
              alt="room-a"
            />
            <section class="d-flex flex-column gap-4">
              <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-medium">
                預訂參考編號： HH2302183151222
              </p>

              <h3
                class="d-flex align-items-center mb-0 text-neutral-80 fs-8 fs-md-6 fw-bold"
              >
                尊爵雙人房
              </h3>

              <div class="text-neutral-80 fw-medium">
                <p class="mb-2">住宿天數： 1 晚</p>
                <p class="mb-0">住宿人數：2 位</p>
              </div>

              <div class="text-neutral-80 fs-8 fs-md-7 fw-medium">
                <p class="title-deco mb-2">
                  入住：6 月 10 日星期二，15:00 可入住
                </p>
                <p class="title-deco mb-0">
                  退房：6 月 11 日星期三，12:00 前退房
                </p>
              </div>
              <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-bold">
                NT$ 10,000
              </p>
            </section>
          </div>

          <hr class="my-0 opacity-100 text-neutral-40" />

          <button
            class="btn btn-outline-primary-100 py-4 fw-bold"
            style="--bs-btn-hover-color: #fff"
            type="button"
          >
            查看更多
          </button>
        </div>
      </div>
    </div>

    <div id="cancelModal" class="modal fade" tabindex="-1">
      <div
        class="modal-dialog modal-dialog-centered align-items-end align-items-md-center m-0 mx-md-auto h-100"
      >
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div
            class="modal-body mx-auto my-10 my-md-15 text-neutral-80 fs-8 fs-md-6 fw-bold"
          >
            確定要取消此房型的預訂嗎？
          </div>
          <div class="modal-footer d-flex gap-4">
            <button
              type="button"
              class="btn btn-outline-primary-100 flex-grow-1 m-0 py-4 fw-bold"
              style="--bs-btn-hover-color: #fff"
              data-bs-dismiss="modal"
            >
              關閉視窗
            </button>
            <button
              type="button"
              class="btn btn-primary-100 flex-grow-1 m-0 py-4 text-white fw-bold"
              @click="delOrderDetailData(orderDetail._id)"
              data-bs-dismiss="modal"
            >
              確定取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "bootstrap/scss/mixins/breakpoints";

$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
  xxxl: 1537px,
);

.rounded-3xl {
  border-radius: 1.25rem;
}

.title-deco {
  display: flex;
  align-items: center;
}

.title-deco::before {
  --color: #bf9d7d;
  content: "";
  display: inline-block;
  width: 4px;
  height: 24px;
  background-color: var(--color);
  border-radius: 10px;
  margin-right: 0.75rem;
}

.title-deco:nth-child(2)::before {
  --color: #909090;
}

.flex-item {
  max-width: 97px;
  width: 100%;
  white-space: nowrap;
}

.modal {
  backdrop-filter: blur(10px);

  @include media-breakpoint-down(md) {
    backdrop-filter: none;
  }
}

.modal-header {
  @include media-breakpoint-down(md) {
    border-bottom: 0 !important;
  }
}

.modal-content {
  @include media-breakpoint-down(md) {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
}
</style>
