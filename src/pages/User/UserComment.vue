<template>
  <div>
    <div class="row">
      <div class="col-12">
        <q-card class="q-pa-md">
          <div class="title">Lượng Phản Hồi Trên Tổng Sản Phẩm Bán Ra Theo Tháng</div>
          <apexchart
            width="100%"
            height="400"
            type="line"
            :options="options"
            :series="series"
          ></apexchart>
        </q-card>
      </div>
    </div>

    <q-card class="q-mt-md">
      <div class="title text-center">Danh Sách Phản Hồi</div>
      <div class="row q-pt-xl">
        <q-pagination
          v-model="current"
          v-if="!loading"
          :max="response.last_page"
          direction-links
          @click="ok"
          class="q-mx-auto"
          boundary-links
          :boundary-numbers="false"
          :max-pages="6"
          icon-first="skip_previous"
          icon-last="skip_next"
          icon-prev="fast_rewind"
          icon-next="fast_forward"
        />
      </div>
      <div class="row">
        <q-spinner-cube
          class="absolute-center"
          v-if="loading"
          color="green-6"
          size="10rem"
          :thickness="5"
        />
        <Card  v-if="!loading" :comment="comments" />
      </div>
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import Card from "components/Card.vue";

export default {
  components: { Card },
  computed: {
    ...mapGetters("auth", ["token"]),
  },
  mounted() {
    this.getComment();
  },
  data() {
    return {
      current: 1,
      loading: true,
      comments: [],
      response: [],
      options: {
        chart: {
          id: "vuechart-example",
        },
        animations: {
          speed: 800,
        },
        markers: {
          size: 6,
        },
        theme: {
          palette: "palette1",
        },
        xaxis: {
          month: [
            "tháng 1",
            "tháng 2",
            "tháng 3",
            "tháng 4",
            "tháng 5",
            "tháng 6",
            "tháng 7",
            "tháng 8",
            "tháng 9",
            "tháng 10",
            "tháng 11",
            "tháng 12",
          ],
        },
      },
      series: [
        {
          name: "Lượng hàng bán ra",
          type:"line",
          data: [
            300076,
            400076,
            450076,
            500076,
            490076,
            600076,
            1600076,
            910076,
            1050076,
            760076,
            230076,
            780076,
          ],
        },
        {
          name: "Lượng Khách Phản Hồi",
          type:"bar",
          data: [
            30076,
            40076,
            45076,
            50076,
            49076,
            60076,
            10076,
            90076,
            105076,
            76076,
            2376,
            78076,
          ],
        },
      ],
    };
  },
  methods: {
    async getComment() {
      await axios("http://127.0.0.1:8000/api/comment", {
        headers: {
          Authorization: "Bearer " + this.token,
          Accept: "application/json",
        },
      }).then((res) => {
        this.comments = res.data.data;
        this.response = res.data;
        this.loading = false;
      });
    },
    async ok() {
      (this.loading = true),
        await axios(`http://127.0.0.1:8000/api/comment?page=${this.current}`, {
          headers: {
            Authorization: "Bearer " + this.token,
            Accept: "application/json",
          },
        }).then((res) => {
          this.comments = res.data.data;
          this.response = res.data;
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
