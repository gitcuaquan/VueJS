<template>
  <q-card class="my-card q-ma-md q-pb-md">
  <div class="text-center text-h5">
     Thay Đổi <b style ="font-size:40px">LOGO</b> Website Theo Ý Của Bạn
  </div>
  <div class="row q-mt-sm">
      <div class="button-wrapper text-center  q-mb-xl ">
      <q-btn
        color="primary"
        class="q-mx-auto"
        icon="fad fa-images"
        label="Chọn Ảnh"
        @click="this.$refs.file.click()"
      /><q-btn color="green-5" class="q-ml-md" icon="fad fa-save" label="Lưu Logo" @click="uploadImage" />
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
      @change="onChange"
      :stencil-props="{
        aspectRatio: 12 / 11,
      }"
    />
  </div>
    <div class="row bg-grey-2 q-mt-md ">
      <div class="col-2">
        <preview
          :width="60"
          :height="70"
          :image="result.image"
          :coordinates="result.coordinates"
          class="q-mt-sm q-ml-md"
        />
      </div>
      <div class="col-2"></div>
      <div class="col-1 q_roud q-ma-md bg-grey-4"></div>
      <div class="col-1 q_roud q-ma-md bg-grey-4"></div>
      <div class="col-1 q_roud q-ma-md bg-grey-4"></div>
      <div class="col-1 q_roud q-ma-md bg-grey-4"></div>
      <div class="col-1 "></div>
      <div class="col-1 ">
       <q-avatar size="40px" class="q-mt-md bg-grey-4 q-mx-sm" text-color="white"></q-avatar>
       <q-avatar size="40px" class="q-mt-md bg-grey-4" text-color="white"></q-avatar>
      </div>

    </div>
  </q-card>
</template>

<script>
import { Cropper, Preview } from "vue-advanced-cropper";
import { useQuasar } from 'quasar'
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
    const $q = useQuasar()
    return {
       showNotif (msg) {
        $q.notify({
          message:msg,
          color: 'green-7',
          position:'top',
          timeout:2000, 
        })
      }
    };
  },
  components: { Cropper, Preview },
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
				canvas.toBlob(blob => {
					form.append('file', blob);
					fetch('http://127.0.0.1:8000/api/uploadlogo', {
						method: 'POST',
						body: form,
					}).then(res=>{
            if (res.status==200) {
              this.showNotif("Thông Báo !! Lưu Logo Hoàn Tất")
            }
          });
				}, 'image/png');
			}
		},
    onChange({ coordinates, image }) {
      this.result = {
        coordinates,
        image,
      };
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
  width: 50%;
}
.button-wrapper {
  width: 100%;
}
</style>
