<template>
  <div>{{listProduct}}</div>
</template>

<script>
import api from "boot/apis/Auth";
export default {
  data() {
    return {
      listProduct: [],
    };
  },
  methods: {
      getAllProduct(){
          api.getDefaul('products/active').then(res=>{
              if (res.status == 200) {
                  this.listProduct = res.data
              }
          })
      }
  },
};
</script>

<style lang="scss" scoped></style>
