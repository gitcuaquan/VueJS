<template>
  <div>
    <div class="text-center text-h3 q-mt-xl">Tin Tức Mới</div>
  
    <div class="row ">
      <div class="col-3 q-mx-auto q-pa-md" v-for="(i,j) in listPosts" :key="j">
        <q-card class="my-card" v-if="j<4">
          <img :src="`${publicUrl}/${i.thumbnail}`">
          <q-card-section>
            <div class="text-h6">{{i.title}}</div>
            <div class="text-subtitle2">Tác giả {{i.author}}</div>
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
      listPosts: [],
      publicUrl: "",
      slide:"1",
      autoplay:true
    };
  },

  created() {
    this.getPost();
    this.setUrl()
  },
  methods: {
    getPost() {
      api.getDefaul("getpost/show").then((res) => {
        this.listPosts = res.data;
      });
    },
    setUrl() {
      this.publicUrl = api.publicUrl();
    },
    showPost(id){
      this.$router.push(`/news/${id}`);
    }
  },
};
</script>

<style lang="scss" scoped>
.content{
  height: 20px ;
  overflow: hidden;
}
.content::after{
  content: "...";
}
</style>
