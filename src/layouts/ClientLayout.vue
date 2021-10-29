<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-blue-grey-1 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat >
            <img  style="width:80px" :src="src" />
          </q-btn>
        </q-toolbar-title>
        <q-space />
        <q-input style="width:400px" outlined  label-slot clearable>
        <template v-slot:prepend>
          <q-avatar square>
            <img :src="src">
          </q-avatar>
        </template>

        <template v-slot:label>
          <span class="text-weight-bold text-deep-orange">Bạn</span>
          Cần Tìm Gì  <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">Ở Đây</span>
        </template>
      </q-input>
        <q-space />
          <q-btn color="primary" class="q-mx-md" icon="home" label="Trang Chủ" unelevated flat />
          <q-btn color="primary" class="q-mx-md" icon="fad fa-box-full" label="Sản Phẩm" unelevated flat />
          <q-btn color="primary" class="q-mx-md" icon="fad fa-newspaper" label="Tin Tức" unelevated flat />
          <q-btn color="primary" class="q-mx-md" icon="fad fa-phone-office" label="Liên Hệ" unelevated flat />
          <q-btn color="primary" class="q-ml-xl" icon="fas fa-shopping-cart" round unelevated  outline>
               <q-badge color="red" floating>4</q-badge>
              <q-tooltip >
                  Xen các Sản Phẩm Bạn Đã Thêm Vào Giỏ Hàng
              </q-tooltip>
          </q-btn>
          <q-btn color="primary" to="login"  class="q-ml-sm"  round unelevated  outline>
              <i style="font-size:44px" class="fad fa-user-circle"></i>
              <q-tooltip >
                  Đăng Nhập
              </q-tooltip>
          </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.getLogo();
  },
  data() {
    return {
      src: "",
    };
  },
  methods: {
    getLogo() {
      axios.get("http://127.0.0.1:8000/api/getlogo").then((res) => {
        this.src = `http://127.0.0.1:8000/${res.data}`;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
