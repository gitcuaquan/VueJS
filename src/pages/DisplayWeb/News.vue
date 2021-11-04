<template>
  <div>
    <q-card class="my-card q-pa-md">
      <q-tabs v-model="tab" class="text-teal" inline-label>
        <q-tab
          name="show"
          class="text-cyan-14"
          icon="far fa-list-alt"
          label="Các Bài viết"
        />
        <q-tab
          name="add"
          class="text-cyan-14"
          icon="fad fa-pen-fancy"
          label=" Bài Viết"
        />
      </q-tabs>
      <q-separator class="bg-cyan-14" />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="add">
          <q-dialog v-model="addToppic">
            <q-card>
              <q-card-section>
                <div class="text-h6">Thêm Chủ Đề</div>
              </q-card-section>
              <q-separator />
              <q-card-section class="q-pt-none">
                <div class="text-h6">Danh Sách Chủ Đề</div>
                <small class="text-white bg-red q-pa-sm">Click Vào Chủ Đề Để Xóa</small>
                <q-list bordered class="q-mt-md">
                  <q-item
                    clickable
                    v-ripple
                    v-for="(i, j) in listTopic"
                    @click="deleteTopic(i.id)"
                    :key="j"
                  >
                    <q-item-section>{{ i.topic }}</q-item-section>
                  </q-item>
                </q-list>

                <q-input
                  v-model="topicTitle"
                  type="text"
                  label="Tên Chủ đề"
                  style="width: 70vh"
                />
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  label="Thêm Chủ Đề"
                  color="primary"
                  @click="addTopic"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <div class="row q-mt-md">
            <div class="col-5">
              <q-input
                v-model="title"
                type="text"
                filled
                label="Tiêu Đề"
                class="q-mx-md"
              />
            </div>
            <div class="col-5">
              <div class="row">
                <q-select
                  v-model="topic"
                  :options="options"
                  label="Chủ Đề"
                  style="width: 80%"
                  filled
                />
                <q-btn
                  color="primary"
                  outline
                  icon="fad fa-layer-plus"
                  @click="addTopicStatus"
                >
                  <q-tooltip> Thêm Chủ Đề </q-tooltip>
                </q-btn>
              </div>
            </div>
            <div class="col-2">
              <q-select
                v-model="status"
                :options="options2"
                class="q-mx-md"
                label="Trạng Thái"
                filled
              />
            </div>
          </div>

          <Editor />
          <div class="text-center text-h4">Chọn ảnh đại diện</div>
          <div class="row">
            <div class="button-wrapper text-center">
              <q-btn
                color="primary"
                icon="fad fa-images"
                @click="this.$refs.file.click()"
              >
                <q-tooltip> Chọn Ảnh </q-tooltip></q-btn
              >
              <q-btn
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

            <cropper
              v-if="!hiden"
              class="cropper q-mx-auto"
              ref="cropper"
              :src="image.src"
              :stencil-props="{
                aspectRatio: 1,
              }"
            />
            <img
              :src="old_img"
              style="width: 50%"
              v-if="hiden"
              class="q-mx-auto"
              alt=""
            />
          </div>
          <div class="row q-mt-md">
            <q-btn
              color="primary"
              icon="check"
              class="q-mx-auto"
              v-if="!editStatus"
              :disable="!active"
              label="Thêm Bài Viết"
              @click="addPost"
            />

            <q-btn
              color="primary"
              icon="check"
              v-if="editStatus"
              class="q-mx-auto"
              label="Cập Nhật Bài Viết"
              @click="postEdit(idPost)"
            />
            <q-btn
              color="yellow-10"
              v-if="editStatus"
              class="q-mx-auto"
              label=" Huỷ Cập Nhật Bài Viết"
              @click="stopEdit"
            />
          </div>
        </q-tab-panel>
        <q-tab-panel name="show">
          <div class="row">
            <q-btn
              color="primary"
              class="q-mx-sm"
              label="ALL"
              round
              @click="getPost('all')"
            >
              <q-tooltip> Lấy Toàn Bộ </q-tooltip>
            </q-btn>
            <q-btn
              color="green-7"
              class="q-mx-sm"
              icon="fad fa-eye"
              round
              @click="getPost('show')"
            >
              <q-tooltip> Lấy Các Bài Viết Được Xuất Bản </q-tooltip>
            </q-btn>
            <q-btn
              color="blue-12"
              class="q-mx-sm"
              icon="fad fa-eye-slash"
              round
              @click="getPost('hide')"
            >
              <q-tooltip> Lấy Các Bài Viết Chưa Được Xuất Bản </q-tooltip>
            </q-btn>
            <q-separator vertical />
            <q-btn
              color="purple-4"
              class="q-mx-sm"
              label="Show All"
              rounded
              @click="setActivePost('active', 'all')"
            >
              <q-tooltip> Xuất Bản Toàn Bộ </q-tooltip>
            </q-btn>
            <q-btn
              color="pink-11"
              class="q-mx-sm"
              label="Hiden All"
              rounded
              @click="setActivePost('unactive', 'all')"
            >
              <q-tooltip> Dừng Xuất Bản Toàn Bộ </q-tooltip>
            </q-btn>
          </div>
          <q-separator class="q-mt-md" />
          <q-scroll-area style="height: 60vh; width: 100%">
            <div class="row">
              <div class="col-3" v-for="(i, j) in list_post" :key="j">
                <q-card class="my-card q-ma-md">
                  <img :src="`http://127.0.0.1:8000/${i.thumbnail}`" />
                  <q-card-section>
                    <div class="text-h6">
                      {{ i.title }}
                      <q-badge v-if="i.active == 0" color="red"
                        >Đang không hiển thị</q-badge
                      >
                      <q-badge v-if="i.active == 1" color="green">Đang hiển thị</q-badge>
                    </div>
                    <div class="text-subtitle1">by {{ i.author }}</div>
                    <div class="text-subtitle2">create at {{ i.time }}</div>
                  </q-card-section>
                  <q-card-actions>
                    <q-btn color="primary" icon="edit" round @click="editPost(i.id)" />
                    <q-btn
                      color="green-5"
                      v-if="i.active == 0"
                      icon="fad fa-eye"
                      @click="setActivePost('active', i.id)"
                      round
                    >
                      <q-tooltip> Cho Phép Hiển Thị </q-tooltip>
                    </q-btn>
                    <q-btn
                      color="yellow-5"
                      v-if="i.active == 1"
                      icon="fad fa-eye-slash"
                      round
                      @click="setActivePost('unactive', i.id)"
                    >
                      <q-tooltip> Ngưng Hiển Thị </q-tooltip>
                    </q-btn>
                    <q-btn
                      color="red-5"
                      round
                      icon="fad fa-trash "
                      @click="deletePost(i.id)"
                    >
                      <q-tooltip> Xoá Bài Viết </q-tooltip>
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </div>
          </q-scroll-area>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import { useQuasar } from "quasar";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import Auth from "boot/apis/Auth";
import "vue-advanced-cropper/dist/style.css";
import Editor from "components/Editor.vue";
import api from "boot/apis/Auth";

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
    ...mapGetters("post", ["content", "thumbnail"]),
  },
  components: { Cropper, Editor },
  data() {
    return {
      addToppic: false,
      statusVl: "",
      topicVl: "",
      old_img: "",
      hiden: true,
      editStatus: false,
      list_post: [],
      topicTitle: "",
      title: "",
      tab: "show",
      topic: "",
      options: [],
      options2: [
        { label: "Hiển thị", value: 1 },
        { label: "Không hiển thị", value: 0 },
      ],
      image: {
        src: null,
        type: null,
      },

      result: {
        coordinates: null,
        image: null,
      },
      active: false,
      status: "",
      listTopic: [],
      idPost: "",
    };
  },
  unmounted() {
    if (this.image.src) {
      URL.revokeObjectURL(this.image.src);
    }
  },
  watch: {},
  created() {
    this.getTopic();
    this.getPost();
  },
  methods: {
    ...mapActions("post", ["setThumbnail", "setContent"]),
    allReset() {
      this.topic = "";
      this.status = "";
      this.title = "";
      this.setThumbnail("");
      this.setContent("");
      this.old_img=""
      this.active = false;
      this.editStatus = false;
    },
    stopEdit() {
      this.tab = "show";
      this.allReset();
    },
    addTopicStatus() {
      this.topicTitle = "";
      this.addToppic = true;
      this.getTopic();
    },
    getTopic() {
      axios.get("http://127.0.0.1:8000/api/gettopic").then((res) => {
        const array = [];
        this.listTopic = res.data;
        this.listTopic.forEach((i) => {
          array.push({ label: i.topic, value: i.id });
        });
        var uniqueSet = new Set(array);
        this.options = [...uniqueSet];
      });
    },
    addTopic() {
      axios
        .post(
          "http://127.0.0.1:8000/api/addtopic",
          Auth.buildFormData({
            topic: this.topicTitle,
          }),
          {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.showNotif("Thông Báo !! thêm chủ đề thành công", "green-5");
            this.getTopic();
            this.allReset();
          }
        });
    },
    addPost() {
      if (
        this.topic != "" &&
        this.status != "" &&
        (this.title != "") & (this.post != "") & (this.thumbnail != "")
      ) {
        axios
          .post(
            "http://127.0.0.1:8000/api/addpost",
            Auth.buildFormData({
              content: this.content,
              title: this.title,
              thumbnail: this.thumbnail,
              topic: this.topic.value,
              status: this.status.value,
            }),
            {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: "Bearer " + this.token,
              },
            }
          )
          .then((res) => {
            if (res.status == 200) {
              this.showNotif("Thông Báo !! Thêm Bài Viết Thàn Công", "green-5");
              this.allReset();
              this.getPost();
            }
          });
      } else {
        this.showNotif(
          "Thêm Thất Bại Một Số Vị Trí Còn Trống !! Hãy Kiểm Tra Lại",
          "red-5"
        );
      }
    },
    async uploadImage() {
      const { canvas } = this.$refs.cropper.getResult();
      if (canvas) {
        const form = new FormData();
        canvas.toBlob((blob) => {
          form.append("file", blob);
          fetch("http://127.0.0.1:8000/api/uploadthumb", {
            method: "POST",
            body: form,
          })
            .then((res) => res.json())
            .then((result) => {
              this.setThumbnail(result.path);
              this.active = true;
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
      this.hiden = false;
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
    deleteTopic(id) {
      if (confirm("Bạn Muốn Xóa Chủ Đề Này")) {
        axios
          .delete(`http://127.0.0.1:8000/api/deletetopic/${id}`, {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          })
          .then((res) => {
            if (res.status == 200) {
              this.getTopic();
              this.showNotif("Thông Báo !! Xóa Chủ Đề Thành Công", "red-5");
              this.allReset();
            }
          });
      }
    },
    getPost(status = "all") {
      axios.get(`http://127.0.0.1:8000/api/getpost/${status}`).then((res) => {
        if (res.status == 200) {
          this.list_post = res.data;
        }
      });
    },
    setActivePost(status, id) {
      axios
        .get(`http://127.0.0.1:8000/api/setpost/${status}/${id}`, {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.getPost();
            this.showNotif("Thông Báo !! Thay Đổi Trạng Thái Thành Công", "green-5");
          }
        });
    },
    editPost(id) {
      this.editStatus = true;
      axios.get(`http://127.0.0.1:8000/api/getpost/${id}`).then((res) => {
        if (res.status == 200) {
          this.options.forEach((i) => {
            if (i.value == res.data.toppic) {
              this.topic = i.label;
              this.topicVl = res.data.toppic;
            }
          });
          this.options2.forEach((i) => {
            if (i.value == res.data.active) {
              this.status = i.label;
              this.statusVl = res.data.active;
            }
          });
          this.idPost = res.data.id;
          this.title = res.data.title;
          this.setThumbnail(res.data.thumbnail);
          this.setContent(res.data.content);
          this.old_img = `http://127.0.0.1:8000/${res.data.thumbnail}`;
          this.tab = "add";
        }
      });
    },
    postEdit(id) {
      if (this.statusVl != this.status.value && this.status.value != undefined) {
        this.statusVl = this.status.value;
      }
      if (this.topicVl != this.topic.value && this.topic.value != undefined) {
        this.topicVl = this.topic.value;
      }
      axios
        .post(
          `http://127.0.0.1:8000/api/updatepost/${id}`,
          Auth.buildFormData({
            content: this.content,
            title: this.title,
            thumbnail: this.thumbnail,
            topic: this.topicVl,
            status: this.statusVl,
          }),
          {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.getPost();
            this.showNotif("Thông Báo !! Cập Nhập Thành Công", "green-5");
            this.tab = "show";
          }
        });
    },
    deletePost(id) {
      api.delete(`deletepost/${id}`).then((res) => {
        if (res.status == 200) {
          this.getPost();
          this.showNotif("Thông Báo !! Xoá Thành Công Bài Viết Có ID :" + id);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cropper {
  height: 50vh;
  background: #767776;
  min-width: 50%;
}
.button-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
span {
  font-size: 10px;
}
</style>
