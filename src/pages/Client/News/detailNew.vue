<template>
  <div>
    <div class="text-h4 text-center q-mt-xl">{{ post.title }}</div>
    <q-separator class="q-pa-sm bg-green-2" />
    <div class="container">
      <div class="text-body2" v-html="post.content"></div>
      <div class="text-center">
        <img
          :src="`${publicUrl}/${post.thumbnail}`"
          style="width: 80vh"
          class="q-mx-auto"
          alt=""
        />
      </div>
       <q-separator class="q-pa-sm q-my-md bg-green-2" />
      <div class="text-h5 text-center text-blue-10">Xem Thêm Tin khác</div>

      <div class="row no-wrap">
        <div class="q-mx-auto col-3 q-pa-md" v-for="(i, j) in listPost" :key="j">
          <q-card class="my-card" v-if="j < 4">
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
  </div>
</template>

<script>
import api from "boot/apis/Auth";
export default {
  data() {
    return {
      id: this.$route.params.id,
      post: null,
      publicUrl: "",
      listPost: null,
    };
  },
  created() {
    this.getPostById(this.id);
    this.setUrl();
    this.getPost();
  },
  watch: {
   $route(to,from){
     this.id = to.params.id
     this.getPostById(this.id)
    }
  },
  methods: {
    getPostById(id) {
      api.getDefaul(`getpost/${id}`).then((res) => {
        if (res.status == 200) {
          this.post = res.data;
        }
      });
    },
    getPost() {
      api.getDefaul(`getpost/show`).then((res) => {
        if (res.status == 200) {
          let data = res.data;
          this.listPost = data.filter((e) => {
            if (e.id != this.id) {
              return e;
            }
          });
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

<style lang="scss" scoped>
.container {
  width: 80%;
  margin: 0 auto;
}
.content {
  height: 20px;
  overflow: hidden;
}
.content::after {
  content: "...";
}
</style>
