<template>
  <div>
    <div class="row">
      <div class="col-3 q-pa-sm" v-for="(i, j) in listProduct" :key="j">
        <q-card class="my-card">
          <img :src="i.thumbnail" />
          <q-card-section>
            <div class="text-h6">{{ i.name }}</div>
            <div class="text-subtitle2">mã sản phẩm : {{ i.code }}</div>
            <div class="text-subtitle2">Giá : {{ i.price }}</div>
            <div class="text-subtitle2">Số Lượng Còn Lại : {{ i.quantity }} sản phẩm</div>
          </q-card-section>
          <q-card-section>
            <q-btn
              color="green-12"
              icon="fad fa-cart-plus"
              outline
              @click="AddCart(i.id)"
            >
              <q-tooltip> Thêm Vào Giỏ Hàng </q-tooltip>
            </q-btn>
            <q-btn
              color="blue-12"
              icon="fad fa-search-dollar"
              class="q-ml-md"
              outline
              @click="detail(i.id)"
            >
              <q-tooltip> Tìm Hiểu Thêm </q-tooltip>
            </q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import api from "boot/apis/Auth";
export default {
  data() {
    return {
      listProduct: [],
    };
  },
  mounted() {
    this.getAllProduct();
  },
  methods: {
    ...mapActions("cart", ["setCart"]),
    getAllProduct() {
      api.getDefaul("products/active").then((res) => {
        if (res.status == 200) {
          this.listProduct = res.data;
        }
      });
    },
    AddCart(id, qty = 1) {
      const data = this.listProduct.find((e) => e.id == id);
      const newData = {
        id: data.id,
        name: data.name,
        thumbnail: data.thumbnail,
        qty: qty,
        price: data.price,
        subtotal: qty * data.price,
      };
      this.setCart(newData);
    },
    detail(id) {
      
    },
  },
};
</script>

<style lang="scss" scoped></style>
