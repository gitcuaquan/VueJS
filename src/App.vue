<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

import "./assets/webfonts/fontawesome-all.min.css";
export default defineComponent({
  name: "App",
  created() {
    this.isLogin();
  },
  methods: {
    isLogin() {
      if (!this.auth) {
        this.$router.push({ path: "/" });
      }
    },
  },
});
</script>
