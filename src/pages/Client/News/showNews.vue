<template>
  <div>
    <div class="row">
      <div class="col-3 q-pa-md" v-for="(i, j) in listPost" :key="j">
        <q-card class="my-card">
          <img :src="`${publicUrl}/${i.thumbnail}`" />
          <q-card-section>
            <div class="text-h6">{{ i.title }}</div>
            <div class="text-subtitle2">Tác giả {{ i.author }}</div>
            <div class="content" v-html="i.content"></div>
          </q-card-section>
          <q-card-section>
            <q-btn color="primary" flat label="xem chi tiết" @click="showPost(i.id)" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import api from "boot/apis/Auth";
export default {
  data() {
    return {
      listPost: null,
      publicUrl: "",
    };
  },
  mounted() {
    this.getAllPost();
    this.setUrl();
  },
  methods: {
    getAllPost() {
      api.getDefaul(`getpost/show`).then((res) => {
        if (res.status == 200) {
          this.listPost = res.data;
        }
      });
    },
    setUrl() {
      this.publicUrl = api.publicUrl();
    },
    showPost(id) {
      this.$router.push(`/news/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
