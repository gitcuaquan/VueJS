<template>
  <q-card class="my-card q-pa-md q-ma-md">
    <q-table :rows="rows" :columns="columns" :filter="filter" row-key="name">
      <template v-slot:top>
        <q-btn
          color="primary"
          class="q-mx-md"
          @click="Filter('active')"
          round
          icon="fas fa-store"
          ><q-tooltip> Lọc Đang Đăng Bán </q-tooltip></q-btn
        >
        <q-btn
          color="red"
          @click="Filter('unactive')"
          class="q-mx-md"
          round
          icon="fab fa-creative-commons-nc-eu"
        >
          <q-tooltip>Lọc Chưa Đăng Bán </q-tooltip></q-btn
        >
        <q-separator vertical />
        <q-btn
          color="primary"
          class="q-mx-md"
          @click="Active('enable')"
          round
          icon="fad fa-pallet-alt"
          ><q-tooltip> Toàn Bộ Mở Bán </q-tooltip></q-btn
        >
        <q-btn
          color="red"
          @click="Active('disable')"
          class="q-mx-md"
          round
          icon="fad fa-ban"
        >
          <q-tooltip> Toàn Bộ Ngưng Bán </q-tooltip></q-btn
        >
        <q-space />
        <q-input debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="code" :props="props">
            <q-badge color="green">
              {{ props.row.code }}
            </q-badge>
          </q-td>
          <q-td key="category" :props="props">
            <q-badge color="purple">
              {{ props.row.category }}
            </q-badge>
          </q-td>
          <q-td key="price" :props="props">
            <q-badge color="orange"> {{ props.row.price }} vnđ </q-badge>
          </q-td>
          <q-td key="quantity" :props="props">
            <q-badge color="primary">
              {{ props.row.quantity }}
            </q-badge>
          </q-td>
          <q-td key="status" :props="props">
            <q-badge
              :class="{
                'bg-pink-12': props.row.status == 0,
                'bg-green-5': props.row.status == 1,
              }"
            >
              {{ props.row.status == 0 ? "Chưa Bán" : " Đang Bán" }}
            </q-badge>
          </q-td>
          <q-td key="description" :props="props">
            <q-badge class="overflow" color="accent">
              {{ props.row.description }}
            </q-badge>
          </q-td>
          <q-td key="thumbnail" :props="props">
            <q-img :src="props.row.thumbnail" width="100%" alt="" />
          </q-td>
          <q-td key="action" :props="props">
            <q-btn
              round
              class="bg-red-5"
              v-if="props.row.status == 1"
              @click="Action('stop', props.row.id)"
              icon="fab fa-creative-commons-nc"
            >
              <q-tooltip> Ngưng bán </q-tooltip>
            </q-btn>
            <q-btn
              round
              class="bg-green-5"
              @click="Action('start', props.row.id)"
              v-if="props.row.status == 0"
              icon="fad fa-coin"
            >
              <q-tooltip> Mở Bán </q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <!-- <q-btn color="primary" icon="check" label="OK" @click="showNotif('ok bạn')" /> -->
  </q-card>
</template>
<script>
import api from "boot/apis/Auth";
import { mapGetters } from "vuex";
import { useQuasar } from "quasar";
const columns = [
  {
    name: "name",
    required: true,
    label: "Tên Sản Phẩm",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "code",
    label: "Mã Hàng",
    field: "code",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "category",
    align: "center",
    label: "Loại Hàng",
    field: "category",
    sortable: true,
  },
  { name: "price", label: "Giá Trị", align: "center", field: "price", sortable: true },
  {
    name: "quantity",
    label: "Số Lượng",
    align: "center",
    field: "quantity",
    sortable: true,
  },
  { name: "status", label: "Trạng Thái", align: "center", field: "status" },
  { name: "description", label: "Mô tả", align: "center", field: "description" },
  {
    name: "thumbnail",
    label: "Ảnh Đại Diện",
    field: "thumbnail",
    align: "center",
    sortable: true,
  },
  {
    name: "action",
    label: "Hành Động",
    field: "action",
    align: "center",
  },
];

export default {
  setup() {
    const $q = useQuasar();
    return {
      columns,
      showNotif(msg) {
        $q.notify({
          message: msg,
          color: "green-10",
          position: "top",
          timeout: 2000,
        });
      },
    };
  },
  data() {
    return {
      rows: [],
      change: "",
      filter: "",
    };
  },
  mounted() {
    this.getProduct();
  },
  computed: {
    ...mapGetters("auth", ["token"]),
  },
  methods: {
    getProduct() {
      api.getDefaul("products").then((res) => {
        this.rows = res.data;
      });
    },
    Action(status, id) {
      api.getDefaul(`products/${status}/${id}`).then((res) => {
        if (res.status == 200) {
          this.getProduct();
        }
      });
    },
    Filter(status) {
      api.getDefaul(`products/${status}`).then((res) => {
        this.rows = res.data;
      });
    },
    Active(status) {
      api.get(`productsactive/${status}`).then(() => {
        this.getProduct();
        this.showNotif("Thông báo 📣📣Cập Nhật Thành Công");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.overflow {
  width: 200px;
  height: 50px;
  overflow: hidden;
}
</style>
