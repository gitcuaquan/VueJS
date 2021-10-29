<template>
  <div>
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6 text-center">Thông Tin Nhân Viên</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            v-model="staff.name"
            :rules="[(val) => !!val || 'Cần Nhập Họ Tên']"
            class="q-mt-md"
            type="text"
            label="Họ Và Tên"
          />
          <q-input
            v-model="staff.email"
            class="q-mt-md"
            :disable="isUpdate"
            type="text"
            :rules="[(val) => !!val || 'Cần Nhập Email']"
            label="Email (dùng đăng nhập)"
          />
          <q-input
            v-model="staff.password"
            class="q-mt-md"
            :disable="isUpdate && level < 3"
            type="text"
            :rules="[(val) => !!val || 'Cần Nhập Mật Khẩu']"
            label="Mật Khẩu"
          />
          <q-select
            v-model="staff.admin"
            :autocomplete="1"
            v-if="level == 3"
            :options="[1, 2, 3]"
            :rules="[(val) => !!val || 'Cần Chọn Cấp Độ']"
            label=" Cấp Độ Nhân Viên "
            filled
          />
          <q-input
            v-model="staff.phone"
            class="q-mt-md"
            type="number"
            :rules="[
              (val) => !!val || 'Cần Nhập Số Điện Thoại',
              (val) => 9 <= val.length || 'Hãy Nhập Số Điện Thoại',
            ]"
            label="Số Điện Thoại"
          />
          <q-input
            v-model="staff.address"
            :rules="[(val) => !!val || 'Cần Nhập Địa Chỉ']"
            class="q-mt-md"
            type="text"
            label="Địa Chỉ"
          />
          <div class="text-center">
            <q-file
              v-model="img.file"
              label="Chọn Ảnh Đại Diện"
              filled
              class="q-mx-auto q-mt-md"
              @change.prevent="add"
              style="max-width: 300px"
            />

            <q-img
              :src="url"
              width="50%"
              class="q-mx-auto"
              v-if="isShow || isUpdate"
              :ratio="16 / 9"
            />
          </div>
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <!-- <q-btn flat label="OK" v-close-popup /> -->
          <q-btn
            color="primary"
            icon="check"
            v-if="!isUpdate"
            label="Thêm Nhân Viên"
            @click="addStaff"
          />
          <q-btn
            color="primary"
            icon="check"
            v-close-popup
            v-if="isUpdate"
            label="Cập Nhật"
            @click="updateStaff(staff.id)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card class="q-pa-md">
      <div class="text-center title">Danh Sách Nhân Viên</div>
      <div class="row">
        <q-btn color="primary" icon="add" @click="setUpAdd" />
      </div>
      <q-table
        :rows="rows"
        separator="cell"
        class="my-sticky-header-table"
        :columns="columns"
        row-key="name"
        hide-pagination
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="email" :props="props">
              <q-badge color="green">
                {{ props.row.email }}
              </q-badge>
            </q-td>
            <q-td key="phone" :props="props">
              <q-badge color="purple">
                {{ props.row.phone }}
              </q-badge>
            </q-td>
            <q-td key="created_at" :props="props">
              <q-badge color="orange">
                {{ props.row.created_at }}
              </q-badge>
            </q-td>
            <q-td key="admin"  :props="props">
              <q-badge
                :class="{
                  'bg-red-9': props.row.admin == 1,
                  'bg-yellow-3': props.row.admin == 3,
                }"
              >
                <div v-if="props.row.admin == 3" class="text-h6 text-dark">
                 Thiên Không Đế
                </div>
                <div v-if="props.row.admin == 2" class="text-h6 text-light">
                  Thiên Không Thần
                </div>
                <div v-if="props.row.admin == 1" class="text-h6 text-light">
                  Thiên Không Quân
                </div>
              </q-badge>
            </q-td>
            <q-td key="avatar" :props="props">
              <img
                style="width: 60%"
                :src="`http://127.0.0.1:8000/${props.row.avatar}`"
                alt=""
              />
              <img
                style="width: 60%"
                v-if="props.row.avatar == ''"
                src="https://freenice.net/wp-content/uploads/2021/08/Anh-avatar-dep-doc-chat-ngau-lam-hinh-dai-dien-600x400.jpg"
                alt=""
              />
            </q-td>
            <q-td key="action" :props="props">
              <q-btn
                color="green-10"
                round
                v-if="level > 1 && props.row.admin <= level"
                @click="staffget(props.row.id)"
                class="q-mx-xs"
                icon="fas fa-user-edit"
              >
                <q-tooltip> Sửa Thông Tin </q-tooltip>
              </q-btn>
              <q-btn
                color="red-9"
                v-if="idme != props.row.id && level > 2"
                round
                @click="deletestaff(props.row.id)"
                class="q-mx-xs"
                icon="fad fa-user-minus"
              >
                <q-tooltip> Xóa Nhân Viên </q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
    <q-dialog v-model="dialog" position="right">
      <q-card style="width: 320px" class="q-pa-md bg-green-6">
        <div class="text-h6 text-white">🔔 🔔{{ status }} 🔔 🔔</div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import Api from "../../boot/apis/Auth";

export default {
  data() {
    return {
      isUpdate: false,
      rows: [],
      dialog: false,
      level: localStorage.getItem("level") - 0,
      columns: [
        {
          name: "name",
          required: true,
          label: "Tên Nhân Viên",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "email",
          align: "left",
          label: "Email",
          field: "email",
          sortable: true,
        },
        {
          name: "phone",
          align: "left",
          label: "Số Điện Thoại",
          field: "phone",
          sortable: true,
        },
        {
          name: "created_at",
          align: "left",
          label: "Ngày Tạo",
          field: "created_at",
          sortable: true,
        },
        {
          name: "admin",
          align: "center",
          label: "nhân viên cấp",
          field: "admin",
          sortable: true,
        },
        {
          name: "avatar",
          align: "center",
          label: "Ảnh Đại Diện",
          field: "avatar",
          sortable: true,
        },
        {
          name: "action",
          align: "center",
          label: "Hành Động",
          field: "action",
          sortable: true,
        },
      ],
      medium: false,
      img: {
        file: "",
      },
      staff: {
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        avatar: "",
        admin: "",
      },
      url: null,
      isShow: false,
      status: "",
      idme: localStorage.getItem("me") - 0,
    };
  },
  computed: {
    ...mapGetters("auth", ["token"]),
  },
  created() {
    this.getStaff();
  },
  methods: {
    staffget(id) {
      axios
        .get(`http://127.0.0.1:8000/api/getstaff/${id}`, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          this.isUpdate = true;
          this.medium = true;
          this.staff = res.data[0];
          this.url = `http://127.0.0.1:8000/${this.staff.avatar}`;
        });
    },
    updateStaff(id) {
      axios
        .post(
          `http://127.0.0.1:8000/api/updatestaff/${id}`,
          Api.buildFormData(this.staff),
          {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((res) => {
          if ((res.data.status = 200)) {
            this.status = "Cập Nhật Thành Công";
            this.dialog = true;
            this.getStaff();
            this.isUpdate = false;
            this.staff = [];
          }
        });
    },

    deletestaff(id) {
      axios
        .delete(`http://127.0.0.1:8000/api/deletestaff/${id}`, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.status = "Xóa Thành Công";
            this.dialog = true;
            this.getStaff();
          }
        });
    },
    getStaff() {
      axios
        .get("http://127.0.0.1:8000/api/getstaff", {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          this.rows = res.data;
        });
    },
    add() {
      axios
        .post("http://127.0.0.1:8000/api/upload", Api.buildFormData(this.img), {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.url = "http://127.0.0.1:8000/" + res.data.path;
          this.staff.avatar = res.data.path;
          this.isShow = true;
        })
        .catch((err) =>
          console.log("🚀 ~ file: AddStraff.vue ~ line 141 ~ add ~ err", err)
        );
    },
    addStaff() {
      axios
        .post("http://127.0.0.1:8000/api/staff/add", Api.buildFormData(this.staff), {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          if (res.data.status == 400) {
            alert("Thêm Nhân Viên Thất Bại Chú Ảnh Đại Diện Và Các Trường Khác ");
          }
          if (res.data.status == 200) {
            alert("Thêm Nhân Viên Thành Công");
            this.medium = false;
            this.getStaff();
          }
        })
        .catch((err) => {
          if (err.status == 400) {
            alert("fuck");
          }
        });
    },
    setUpAdd(){
      this.medium = true
      this.isUpdate = false
      this.staff =[]
    }
  },
};
</script>

<style lang="scss" scoped></style>
