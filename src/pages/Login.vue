<template>
  <div id="bg__login">
    <Loading v-if="isLog" :status="status" />

    <div id="card">
      <div class="title text-center">Đăng Nhập</div>
      <q-input
        rounded
        outlined
        v-model="user.email"
        bg-color="cyan-1"
        color="green-5"
        label="Nhập Email"
      >
        <template v-slot:append>
          <q-icon name="fad fa-at" />
        </template>
      </q-input>
      <q-input
        rounded
        type="password"
        outlined
        v-model="user.password"
        bg-color="cyan-1"
        color="green-5"
        class="q-mt-xl"
        label="Nhập Mật Khẩu"
      >
        <template v-slot:append>
          <q-icon name="fad fa-key-skeleton" />
        </template>
      </q-input>
      <div id="btn" class="q-mt-xl text-center">
        <q-btn
          color="primary"
          @click.prevent="login"
          rounded
          icon="fad fa-sign-in-alt"
          label="Đăng Nhập"
        />
      </div>

      <div
        @click="register"
        class="text-red cusor text-center q-pa-xs q-mx-auto q-mt-md bg-yellow-3"
      >
        Bạn Chưa Có Tài Khoản Hãy Đăng Ký
      </div>
    </div>
  </div>
</template>

<script>
import api from "../boot/apis/Auth";
import Loading from "components/Animate/Loading.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {

      isLog: false,
      status: "Đang KHởi tạo",
      user: {
        email: "taquan@gmail.com",
        password: "123456",
      },
    };
  },
  components: {
    Loading,
  },
  methods: {
    ...mapActions("auth", ["setAuth", "settoken"]),
    register() {
      this.$router.push({ path: "/register" });
    },

    login() {
      this.isLog = true;
      api
        .auth("auth/login", this.user)
        .then((response) => {
          if (response.status == 200 && response.data.user.admin >= 1) {
            this.settoken(response.data.token);
            localStorage.setItem("token", response.data.token);
            this.setAuth(true);
            setTimeout(()=> this.status = " Đăng nhập thành công",3000)
            setTimeout(() => {
              this.$router.push({ path: "/admin/home" });
            }, 4000);
            localStorage.setItem("me", response.data.user.id);
            localStorage.setItem("level", response.data.user.admin);
          }
          if (response.status == 200 && response.data.user.admin == 0) {
            setTimeout(()=>  this.status = "Không Đủ Quyền Truy cập")
            setTimeout(() => {
              this.log = false;
              this.isLog = false;
              this.$router.push({ path: "/" })
              
            }, 4000);
          }
        })
        .catch(() => {
          setTimeout(()=>  this.status = "Đăng nhập Thất Bại")
          setTimeout(() => {
            this.log = false;
            this.isLog = false;
          }, 4000);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#bg__login {
  background: url("../assets/image/bg2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;

  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & #card {
    position: relative;
    margin-top: 100px;
    width: 40%;
    height: 60%;
    margin: auto;
    background: rgba(255, 255, 255, 0.267);
    border-radius: 10px;
    box-shadow: 0 0 10px rgb(0, 0, 0);
    padding: 40px 100px;
  }
  & .title {
    font-size: 40px;
    font-weight: 900;
    color: white;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.411);
  }
}
p {
  text-align: center;
  padding-top: 10px;
  color: rgb(17, 13, 13);
  border-radius: 10px;
  cursor: pointer;
}
</style>
