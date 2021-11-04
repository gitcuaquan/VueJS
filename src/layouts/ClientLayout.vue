<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-blue-grey-1 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn to="/" flat>
            <img style="width: 80px" :src="src" />
          </q-btn>
        </q-toolbar-title>
        <q-space />
        <q-input style="width: 400px" outlined label-slot clearable>
          <template v-slot:prepend>
            <q-avatar square>
              <img :src="src" />
            </q-avatar>
          </template>

          <template v-slot:label>
            <span class="text-weight-bold text-deep-orange">Bạn</span>
            Cần Tìm Gì
            <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders"
              >Ở Đây</span
            >
          </template>
        </q-input>
        <q-space />
        <q-btn
          color="primary"
          class="q-mx-md"
          icon="home"
          to="/"
          label="Trang Chủ"
          unelevated
          flat
        />
        <q-btn
          color="primary"
          class="q-mx-md"
          icon="fad fa-box-full"
          label="Sản Phẩm"
          to="/product"
          unelevated
          flat
        />
        <q-btn
          color="primary"
          class="q-mx-md"
          to="/news"
          icon="fad fa-newspaper"
          label="Tin Tức"
          unelevated
          flat
        />
        <q-btn
          color="primary"
          class="q-mx-md"
          icon="fad fa-phone-office"
          label="Liên Hệ"
          unelevated
          flat
        />
        <q-btn
          color="primary"
          class="q-ml-xl"
          icon="fas fa-shopping-cart"
          round
          to="/cart" 
          unelevated
          outline
        >
          <q-badge color="red" floating>{{numOder*1}}</q-badge>
          <q-tooltip> Xen các Sản Phẩm Bạn Đã Thêm Vào Giỏ Hàng </q-tooltip>
        </q-btn>
        <q-btn color="primary" to="login" class="q-ml-sm" round unelevated outline>
          <i style="font-size: 44px" class="fad fa-user-circle"></i>
          <q-tooltip> Đăng Nhập </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <div id="Footer">
      <div class="row bg-blue-3">
        <div class="col-5 q-pa-md">
          <div class="text-h4 q-mb-md">Giới Thiệu</div>
          <div class="text-body1">
            Kính chào anh/chị đã xem qua project của em. Đây là project đầu tiên ngay sau
            khi học VueJS, em sử dụng thư viện quasar để build toàn bộ Font-end, back-end
            em làm bằng laravel 8 sử dụng xác thực người dùng bằng sacntum. Vi Là project
            đầu tiên lên em làm để thực hành là chủ yếu không chú trọng chỉnh sửa font-end
            lên không được đẹp. Chức năng còn thiếu rất nhiều mong anh chị bỏ qua test nhẹ
            tay
            <span class="text-red-5">
              (note: Các Biểu đồ và comment em làm chỉ tượng chưng)</span
            >
          </div>
        </div>
        <div class="col-7 q-pa-md">
          <div class="text-h4 q-mb-md">Chính sách chung</div>
          <div class="row">
            <div class="col">
              <q-btn
                color="primary"
                class="text-black"
                flat
                label="Chính Sách Bảo Hành"
              /><br />
              <q-btn
                color="primary"
                class="text-black"
                flat
                label="Chính Sách Đổi Trả"
              /><br />
              <q-btn
                color="primary"
                class="text-black"
                flat
                label="Chính Sách Vận Chuyển"
              /><br />
              <q-btn
                color="primary"
                class="text-black"
                flat
                label="Chính Sách chăm sóc khách hàng"
              /><br />
            </div>
            <div class="col">
              <q-btn
                color="primary"
                class="text-black"
                flat
                label="Thông TIn Liên Hệ"
              /><br />
              <q-btn
                color="primary"
                class="text-black"
                flat
                label="Giấy phép kinh doanh"
              /><br />
              <q-btn
                color="primary"
                class="text-black"
                flat
                label="Thông tin đối tác thương mại"
              /><br />
              <q-btn
                color="primary"
                class="text-black"
                flat
                label="Thông Tin tuyển dụng"
              /><br />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-blue-8 text-center q-py-sm">@copyright 2021 by tamanhquan</div>
    </div>
  </q-layout>
</template>

<script>
import axios from "axios";
import {mapGetters} from 'vuex';
export default {
  created() {
    this.getLogo();
  },
  data() {
    return {
      src: "",
    };
  },
  computed:{...mapGetters('cart',['numOder'])},
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
