<template>
  <div class="q-ma-sm">
    <q-card class="my-card q-pa-sm">
      <div class="text-center text-h5"><b>Hiển Thị Banner Trang Web Của Bạn</b></div>
      <div class="row">
        <div class="col-3">
          <div class="q-ov-auto">
            <q-btn
              flat
              v-for="(i, j) in list_banner"
              @click="deleteBanner(i.id)"
              :key="j"
            >
              <img style="width: 100%" :src="`http://127.0.0.1:8000/${i.url}`" alt="" />
              <q-tooltip anchor="center right" class="transparent" self="center left">
                <div class="text-h6 arrow text-red">Thay Banner Này</div>
              </q-tooltip>
            </q-btn>
          </div>
        </div>
        <div class="col-1"></div>
        <div class="col-7">
          <div class="row q-mt-sm">
            <div class="button-wrapper text-center q-mb-xl">
              <q-btn
                color="primary"
                class="q-mx-auto"
                icon="fad fa-images"
                label="Chọn Ảnh"
                @click="this.$refs.file.click()"
              /><q-btn
                color="green-5"
                class="q-ml-md"
                icon="fad fa-save"
                label="Lưu Banner"
                @click="uploadImage"
                ><q-tooltip>
                  Hành Động Này Sẽ Tạo Mới 1 Banner <br />
                  <span class="text-h6 text-red">lưu ý </span>: Chỉ Cho Phép 5 Banner Được
                  Hoạt Động
                </q-tooltip></q-btn
              >
              <input
                type="file"
                ref="file"
                @change="loadImage($event)"
                style="display: none"
                accept="image/*"
              />
            </div>
            <cropper
              class="cropper q-mx-auto"
              ref="cropper"
              :src="image.src"
              :stencil-props="{
                aspectRatio: 8 / 4,
              }"
            />
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import { useQuasar } from "quasar";
import { mapGetters } from "vuex";
import axios from "axios";
import "vue-advanced-cropper/dist/style.css";

function getMimeType(file, fallback = null) {
  const byteArray = new Uint8Array(file).subarray(0, 4);
  let header = "";
  for (let i = 0; i < byteArray.length; i++) {
    header += byteArray[i].toString(16);
  }
  switch (header) {
    case "89504e47":
      return "image/png";
    case "47494638":
      return "image/gif";
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
    case "ffd8ffe3":
    case "ffd8ffe8":
      return "image/jpeg";
    default:
      return fallback;
  }
}

export default {
  setup() {
    const $q = useQuasar();
    return {
      showNotif(msg, color) {
        $q.notify({
          message: msg,
          color: color,
          position: "top",
          timeout: 2000,
        });
      },
    };
  },
  computed: {
    ...mapGetters("auth", ["token"]),
  },
  components: { Cropper },
  data() {
    return {
      image: {
        src: null,
        type: null,
      },
      list_banner: [],
      result: {
        coordinates: null,
        image: null,
      },
    };
  },
  unmounted() {
    if (this.image.src) {
      URL.revokeObjectURL(this.image.src);
    }
  },
  mounted() {
    this.getBanner();
  },
  methods: {
    deleteBanner(id) {
      if (confirm(`Bạn Muốn Xóa Banner Này `)) {
        axios
          .delete(`http://127.0.0.1:8000/api/deletebanner/${id}`, {
            headers: {
              Authorization: "Bearer " + this.token,
              Accept: "application/json",
            },
          })
          .then((res) => {
            if (res.status == 200) {
              this.showNotif("Thông Báo 📣📣 Xóa Thành Công Banner", "green-5");
              this.getBanner();
            }
          });
      }
    },
    getBanner() {
      axios
        .get("http://127.0.0.1:8000/api/getbanner")
        .then((res) => (this.list_banner = res.data));
    },
    uploadImage() {
      const { canvas } = this.$refs.cropper.getResult();
      if (canvas) {
        const form = new FormData();
        canvas.toBlob((blob) => {
          form.append("file", blob);
          fetch("http://127.0.0.1:8000/api/uploadbanner", {
            method: "POST",
            body: form,
          }).then((res) => {
            if (res.status == 200) {
              this.showNotif("Thông Báo !! Lưu Banner Hoàn Tất", "green-5");
              this.getBanner();
            }
            if (res.status == 400) {
              this.showNotif(
                "Thông Báo !! Lưu Banner Thất Bại Đã Đủ 5 Banner Trong Hàng Đợi",
                "red-5"
              );
            }
          });
        }, "image/jpg");
      }
    },
    reset() {
      this.image = {
        src: null,
        type: null,
      };
    },
    loadImage(event) {
      const { files } = event.target;
      if (files && files[0]) {
        if (this.image.src) {
          URL.revokeObjectURL(this.image.src);
        }
        const blob = URL.createObjectURL(files[0]);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.image = {
            src: blob,
            type: getMimeType(e.target.result, files[0].type),
          };
        };
        reader.readAsArrayBuffer(files[0]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cropper {
  height: 45vh;
  background: #2ecc71;
  width: 100%;
}
.button-wrapper {
  width: 100%;
}
</style>
