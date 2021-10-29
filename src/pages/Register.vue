<template>
  <div id="bg__login">
    <div id="card">
      <div class="title text-center">Đăng Ký</div>
      <q-input
        rounded
        outlined
        bg-color="cyan-1"
        v-model="user.email"
        color="green-5"
        label="Nhập Email"
      >
        <template v-slot:append>
          <q-icon name="fad fa-at" />
        </template>
      </q-input>
      <q-input
        rounded
        v-model="user.name"
        outlined
        bg-color="cyan-1"
        class="q-mt-md"
        color="green-5"
        label="Nhập Tên Của Bạn"
      >
        <template v-slot:append>
          <q-icon name="fad fa-signature" />
        </template>
      </q-input>
      <q-input
        rounded
        type="password"
        outlined
        v-model="user.password"
        bg-color="cyan-1"
        color="green-5"
        class="q-mt-md"
        label="Nhập Mật Khẩu"
      >
        <template v-slot:append>
          <q-icon name="fad fa-key-skeleton" />
        </template>
      </q-input>
      <div id="btn" class="q-mt-xl text-center">
        <q-btn
          color="primary"
          rounded
          icon="fad fa-file-signature"
          @click.prevent="register"
          label="Đăng Ký"
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from "../boot/apis/Auth";
export default {
  data() {
    return {
      user: {
        email: "taquan@gmail.com",
        name: "Tạ Mạnh Quân",
        password: "123456",
        address:'Việt Nam',
        admin:0,
        phone:"098xxxxxx",
        avatar:"https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-de-thuong.jpg"
      },
    };
  },
  methods: {
    register() {
      api.auth("auth/register", this.user).then((res) => {
        if(res.status == 200){
          this.$router.push({path:"/login"})
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#bg__login {
  background: url("../assets/image/bg3.jpg");
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
  color: rgb(17, 13, 13);
  background: rgba(212, 212, 212, 0.308);
  border-radius: 10px;
}
</style>
