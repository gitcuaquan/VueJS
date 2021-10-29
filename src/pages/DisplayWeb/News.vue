<template>
  <div>
    <q-card class="my-card q-pa-md">
      <div class="text-center text-h4">Thêm Tin Tức Mới</div>
      <Editor />
      <h1>Chọn Ảnh Đại Diện</h1>
      <div class="row">
        <div class="col-1">
          <div class="button-wrapper text-center q-mb-xl">
            <q-btn
              color="primary"
              class="q-mx-auto"
              icon="fad fa-images"
              @click="this.$refs.file.click()"
            >
              <q-tooltip> Chọn Ảnh </q-tooltip></q-btn
            ><q-btn
              color="green-5"
              class="q-ml-md"
              icon="fad fa-save"
              @click="uploadImage"
              ><q-tooltip> Lưu Ảnh </q-tooltip></q-btn
            >
            <input
              type="file"
              ref="file"
              @change="loadImage($event)"
              style="display: none"
              accept="image/*"
            />
          </div>
        </div>
        <div class="col-11">
          <cropper
            class="cropper q-mx-auto"
            ref="cropper"
            :src="image.src"
            :stencil-props="{
              aspectRatio: 1,
            }"
          />
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
import Editor from "components/Editor.vue";

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
  components: { Cropper, Editor },
  data() {
    return {
      image: {
        src: null,
        type: null,
      },
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

  methods: {
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
              this.showNotif("Thông Báo !! Lưu Logo Hoàn Tất", "green-5");
              this.getBanner();
            }
            if (res.status == 400) {
              this.showNotif(
                "Thông Báo !! Lưu Logo Thất Bại Đã Đủ 5 Banner Trong Hàng Đợi",
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
  width: 80%;
}
.button-wrapper {
  padding: 10vh 0 0 10vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
