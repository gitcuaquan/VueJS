<template>
  <div>
    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      :autoplay="autoplay"
      height="87vh"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide v-for="(i,j) in list_banner"  :key="j" :name="i.id" :img-src="`http://127.0.0.1:8000/${i.url}`" />

    </q-carousel>
    <News />
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios';
import News from 'components/Client/Home/News.vue';
export default {
  setup () {
    return {
      slide: ref(1),
      autoplay: ref(true),
      list_banner:ref([])
    }
  },
  components:{News},
  created(){
      this.getBanner()
  },methods:{
     async  getBanner() {
     await axios
        .get("http://127.0.0.1:8000/api/getbanner")
        .then((res) => (this.list_banner = res.data));
    },
  }
}
</script>

<style lang="scss" scoped></style>
