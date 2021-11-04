<template>
  <div id="cart">
    <div v-if="!CartEmpty" class="text-h4 text-center q-my-sm">Giỏ Hàng Của Bạn</div>
    <div v-if="CartEmpty" class="text-center q-my-xl text-h4 text-red-6">
      Ôi Không Bạn Chưa Thêm Món Hàng Nào Vào Giỏ Hàng
    </div>
    <div class="row q-pl-xl">
      <q-img
        v-if="CartEmpty"
        src="https://elearningdom.com/wp-content/themes/mrtailor/images/empty_cart_retina.png"
        width="100vh"
        class="q-mx-auto"
        spinner-color="primary"
        spinner-size="82px"
      />
      <div class="col-10 q-pa-md">
        <table v-if="!CartEmpty">
          <tr class="tb_header">
            <td>Tên sản phẩm</td>
            <td>Ảnh Đại Diện</td>
            <td>Đơn giá</td>
            <td>Số lượng</td>
            <td>Thành Tiền</td>
            <td>Hành Động</td>
          </tr>
          <tr
            v-for="(i, j) in listCart"
            :class="{ 'bg-purple-1': j % 2 == 0, 'bg-green-1': j % 2 != 0 }"
            :key="j"
          >
            <td>{{ i.name }}</td>
            <td><img :src="i.thumbnail" style="width: 100px" alt="" /></td>
            <td>{{ i.price }} VNĐ</td>
            <td>
              <input
                type="number"
                min="1"
                @change="updateCartById($event, i.id)"
                class="ipn"
                style="width: 50px"
                :value="i.qty"
              />
            </td>
            <td style="width: 300px">{{ i.subtotal }} VNĐ</td>
            <td>
              <q-btn
                color="red-10"
                icon="fad fa-trash"
                flat
                round
                @click="deleteCartbyId(i.id)"
              />
            </td>
          </tr>
        </table>
      </div>
      <div v-if="!CartEmpty" class="col-2 q-pa-md">
        <div class="border">
          <div class="text-center text-h5 q-mb-xl">Thông Tin Đơn Hàng</div>
          <div class="text-green-5">Tổng Tiền: {{ totalFm }} VNĐ</div>
          <div class="text-purple-5">
            Số Sản Phẩm: <span class="text-h5"> {{ numOder }}</span>
          </div>
          <div class="q-mt-xl q-pa-sm">
            Chúng tôi sẽ liên hệ và giao chọn bạn sớm nhất
          </div>

          <div class="q-my-md">
            <q-btn
              class="q-ml-xl"
              color="primary"
              outline
              label="Đặt hàng"
              @click="infoUser = true"
            />
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="infoUser" persistent>
      <q-card class="q-pa-xl">
        <div class="text-center row text-h5">Thông Tin Liên Hệ</div>
        <div class="row">
          <q-input
            v-model="bill.name"
            style="width: 50vh"
            type="text"
            label="Tên Của Bạn"
          />
          <q-input
            v-model="bill.phone"
            style="width: 50vh"
            type="number"
            label="Số Điện Thoại Của Bạn"
          />
          <q-input
            v-model="bill.address"
            style="width: 50vh"
            type="text"
            label="Địa Chỉ Của Bạn"
          />
          <q-input
            v-model="bill.email"
            style="width: 50vh"
            type="email"
            label="Email Của Bạn"
          />
        </div>
        <q-card-actions align="center">
          <q-btn label="Đặt Hàng" @click="buyNow" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import api from "boot/apis/Auth";
import { mapGetters, mapActions } from "vuex";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
    return {
      showNotif(msg, color = "green-5") {
        $q.notify({
          message: msg,
          color: "green-10",
          position: "top",
          timeout: 2000,
          color: color,
        });
      },
    };
  },
  data() {
    return {
      qty: 0,
      infoUser: false,
      CartEmpty: true,
      totalFm: 0,
      bill: {
        totalVl: "",
        numOderVl: "",
        detailCart: "",
        name: "Tạ Mạnh Quân",
        phone: "0982315950",
        address: "bà Vì Hà Nội",
        email: "manhquan@gmail.com",
      },
    };
  },
  created() {
    this.checkEmpty();
  },
  watch: {
    total: function () {
      this.checkEmpty();
    },
  },
  computed: {
    ...mapGetters("cart", ["listCart", "total", "numOder"]),
  },
  methods: {
    ...mapActions("cart", ["updateCart", "deleteCart"]),
    deleteCartbyId(id) {
      this.deleteCart(id);
    },
    updateCartById(e, id) {
      const value = e.target.value;
      this.updateCart({ value: value, id: id });
    },
    checkEmpty() {
      if (this.numOder != 0) {
        this.CartEmpty = false;
      }
      this.totalFm = this.format2(this.total);
      this.bill.totalVl = this.total;
      this.bill.numOderVl = this.numOder;
      this.bill.detailCart = JSON.stringify(this.listCart);
    },
    format2(n) {
      return n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    },
    buyNow() {
      if (this.total != 0 && this.numOder != 0) {
        api
          .post("addbill", this.bill)
          .then((res) => {
            if (res.status == 200) {
              this.showNotif(
                `Khởi Tạo Đơn Hàng -- ${res.data.code}-- Thành Công !! Cảm Ơn Bạn Đã Đặt Hàng`
              );
            }
          })
          .catch((err) => {
            this.showNotif(
              "Khởi Tạo Đơn Hàng Thất Bại !! Làm Phiền Bạn Kiểm Tra Lại Thông Tin Liên Hệ",
              "red-5"
            );
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#cart {
  min-height: 51vh;
}
table {
  width: 100%;
  border: 1px solid #b0b0b0;
}
.tb_header {
  width: 100%;
  background: #b0b0b0;
}
.tb_header td {
  text-align: center;
  font-size: 20px;
}
td {
  text-align: center;
  padding: 5px;
  font-size: 20px;
}
.ipn {
  background: transparent;
}
.border {
  border: 1px solid black;
  height: 400px;
  padding: 20px 0 0 20px;
  border-radius: 4px;
}
</style>
