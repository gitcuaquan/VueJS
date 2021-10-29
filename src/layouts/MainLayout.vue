<template>
  <q-layout view="lHh LpR lFf">
    <q-header class="bg-white text-black">
      <q-toolbar>
        <q-btn size="15px" round v-if="true" icon="menu" @click="toggleLeftDrawer" />
        <q-fab icon="fad fa-user-cog" padding="sm" class="q-ma-md" direction="right">
          <q-fab-action
            color="amber"
            text-color="black"
            padding="sm"
            icon="fad fa-user-edit"
          >
            <q-tooltip anchor="center left" self="center right"> Cá Nhân </q-tooltip>
          </q-fab-action>
          <q-fab-action
            color="red"
            text-color="black"
            @click="logout"
            icon="fad fa-power-off"
            ><q-tooltip anchor="center left" self="center right">
              Đăng Xuất
            </q-tooltip></q-fab-action
          >
        </q-fab>
        <marquee
          ><div class="title">
            🚥🚥Thông Báo 📣📣 Ngày 27/11/2000 Hệ Thống Nâng Cấp 🚧🚧 Yêu Cầu Nhân Viên
            Lưu Trữ Dữ Liệu Quan Trọng🚥🚥
          </div></marquee
        >
        <q-chip v-if="!leftDrawerOpen" class="q-mx-md">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          {{ user.name }}
        </q-chip>
      </q-toolbar>
    </q-header>
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      :width="300"
      :breakpoint="400"
      side="left"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item clickable style="font-size: 16px" to="/admin/home" v-ripple>
            <q-item-section avatar>
              <i style="font-size: 25px" class="far fa-analytics"></i>
            </q-item-section>
            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-expansion-item
            expand-separator
            icon="fad fa-users-cog"
            label="Quản Lý Người Dùng"
          >
            <q-item clickable to="/admin/userreport" v-ripple>
              <q-item-section avatar>
                <i style="font-size: 25px" class="fad fa-user-chart"></i>
              </q-item-section>
              <q-item-section> Báo Cáo Thống Kê</q-item-section>
            </q-item>
            <q-item clickable to="/admin/usercomment" v-ripple>
              <q-item-section avatar>
                <i style="font-size: 25px" class="fad fa-comments"></i>
              </q-item-section>
              <q-item-section> Phẩn Hồi Người Dùng </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-item clickable style="font-size: 16px" to="/admin/addstraff" v-ripple>
            <q-item-section avatar>
              <i style="font-size: 25px" class="fad fa-user-plus"></i>
            </q-item-section>
            <q-item-section> Quản Lý Nhân Viên </q-item-section>
          </q-item>
          <q-expansion-item
            expand-separator
            icon="fas fa-warehouse-alt"
            label="Quản Lý Kho Vận"
          >
            <q-item clickable v-ripple to="/admin/commodity">
              <q-item-section avatar>
                <i style="font-size: 25px" class="fad fa-boxes-alt"></i>
              </q-item-section>
              <q-item-section> Hàng Hóa </q-item-section>
            </q-item>
            <q-item clickable to="/admin/transport" v-ripple>
              <q-item-section avatar>
                <i style="font-size: 25px" class="fas fa-person-dolly"></i>
              </q-item-section>
              <q-item-section>Vận Chuyển</q-item-section>
            </q-item>
          </q-expansion-item>
          <q-expansion-item
            expand-separator
            icon="fad fa-ballot-check"
            label="Quản Lý Đơn Hàng"
          >
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <i style="font-size: 25px" class="fad fa-file-invoice"></i>
              </q-item-section>
              <q-item-section> Đơn Hàng </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <i style="font-size: 25px" class="fad fa-money-bill-alt"></i>
              </q-item-section>
              <q-item-section>Thanh Toán</q-item-section>
            </q-item>
          </q-expansion-item>
          <q-expansion-item expand-separator icon="fad fa-browser" label="Hiện Thị Web">
            <q-item clickable to="/admin/changelogo"  v-ripple>
              <q-item-section avatar>
                <i style="font-size: 25px" class="fad fa-trademark"></i>
              </q-item-section>
              <q-item-section> Thay Đổi Thương Hiệu</q-item-section>
            </q-item>
            <q-item clickable to="/admin/banner" v-ripple>
              <q-item-section avatar>
                <i style="font-size: 25px" class="far fa-images"></i>
              </q-item-section>
              <q-item-section>Hiển Thị Banner</q-item-section>
            </q-item>
            <q-item clickable to="/admin/news" v-ripple>
              <q-item-section avatar>
                <i style="font-size: 25px" class="fad fa-newspaper"></i>
              </q-item-section>
              <q-item-section>Hiển Thị Bài Biết</q-item-section>
            </q-item>
          </q-expansion-item>

          <q-item clickable style="font-size: 16px" v-ripple>
            <q-item-section avatar>
              <i style="font-size: 25px" class="fad fa-user-headset"></i>
            </q-item-section>
            <q-item-section>Hỗ Trợ Trực Tiếp</q-item-section>
          </q-item>
          <q-item clickable style="font-size: 16px" v-ripple>
            <q-item-section avatar>
              <i style="font-size: 25px" class="fad fa-bug"></i>
            </q-item-section>
            <q-item-section>Báo Cáo Lỗi</q-item-section>
          </q-item>
          <q-item clickable style="font-size: 16px" v-ripple>
            <q-item-section avatar>
              <i style="font-size: 25px" class="fad fa-mail-bulk"></i>
            </q-item-section>
            <q-item-section>Đóng Góp Ý Kiến</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="../assets/image/bg_2.gif"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar v-if="user.avatar == null" size="56px" class="q-mb-sm">
            <img :src="src" />
          </q-avatar>
          <q-avatar v-if="user.avatar != null" size="56px" class="q-mb-sm">
            <img :src="src" />
          </q-avatar>
          <div class="text-weight-bold">{{ user.name }}</div>
          <div>{{ user.email }}</div>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
      <router-view class="q-px-md q-pt-md" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { mapGetters, mapActions } from "vuex";
import api from "../boot/apis/Auth";
export default {
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  created() {
    this.getme();
    this.isLogin();
  },
  data() {
    return {
      user: "",
      shape: true,
      src: "",
    };
  },
  watch: {},
  computed: { ...mapGetters("auth", ["token", "auth"]) },
  methods: {
    ...mapActions("auth", ["settoken", "setAuth"]),
    async getme() {
      api.get("getme", this.token).then((res) => {
        this.user = res.data;
        if (res.data.avatar != "") {
          this.src = `http://127.0.0.1:8000/${res.data.avatar}`;
        } else {
          this.src =
            "https://imgt.taimienphi.vn/cf/Images/tt/2021/8/20/top-anh-dai-dien-dep-chat-39.jpg";
        }
      });
    },
    logout() {
      this.settoken("");
      this.setAuth(false);
      this.$router.push({ path: "/login" });
    },
    isLogin() {
      if (!this.auth) {
        this.$router.push({ path: "/login" });
      }
    },
  },
};
</script>
<style lang="scss">
.q-router-link--active.q-router-link--exact-active {
  background: rgba(0, 255, 64, 0.103);
  font-weight: 900;
  color: black;
  border-right: rgba(255, 0, 0, 0.192) solid 10px;
  animation-name: active;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}
@keyframes active {
  0% {
    border-right: rgba(255, 0, 0, 0.192) solid 10px;
    background: rgba(0, 255, 64, 0.103);
  }
  50% {
    border-right: rgba(0, 255, 128, 0.808) solid 10px;
    background: rgba(234, 0, 255, 0.103);
  }
  100% {
    border-right: rgba(255, 0, 0, 0.192) solid 10px;
    background: rgba(0, 255, 64, 0.103);
  }
}
</style>
