<template>
  <q-page>
    <Animate>
      <q-card class="q-pa-sm q-mb-md bg-white text-black">
        <div class="row q-gutter-md">
          <div class="col" v-for="(i, j) in report" :key="j">
            <bgBox>
              <div class="">
                <div class="text-orange-7 title text-weight-bolder">{{ i.title }}</div>
                <q-separator size="10px" dark />
                <div class="subtitle q-my-md">
                  {{ i.total }} <span class="text-weight-light">{{ i.cur }}</span>
                </div>
                <q-btn color="primary" icon="fad fa-info-circle" label="Chi Tiết" />
              </div>
            </bgBox>
          </div>
        </div>
      </q-card>
    </Animate>
    <Animate>
      <q-card class="q-pa-sm">
        <div class="title text-center">Số Lượng Mặt Hàng Bán Theo Từng Tháng</div>
        <apexchart
          width="100%"
          height="400"
          type="bar"
          :options="options"
          :series="series"
        ></apexchart>
      </q-card>
    </Animate>
    <div class="row q-mt-md">
      <div class="col-6 q-pa-xs">
        <q-card class="q-pa-sm">
          <div class="title-2 text-center">Sản Phẩm Chờ Duyệt</div>
           <Table :row="colums" :data="rows" />
        </q-card>
      </div>
      <div class="col-6 q-pa-xs">
        <q-card class="q-pa-sm">
          <div class="title-2 text-center">Đơn Hàng Chờ Duyệt</div>
          <Table :row="colums" :data="rows" />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import bgBox from "components/bg/bg_1.vue";
import Animate from "components/Animate/Animate.vue";
import Table from "components/Table.vue";

export default {
  components: { Animate, bgBox, Table },
  computed: {
    ...mapGetters('databill',['rows','colums'])
  },
  data() {
    return {
      report: [
        { title: "Doanh Số Tuần", total: 2000000, cur: "VND" },
        { title: "Doanh Số Tháng", total: 2000000, cur: "VND" },
        { title: "Doanh Số Ngày", total: 2000000, cur: "VND" },
      ],
      options: {
        chart: {
          id: "vuechart-example",
        },
        animations: {
          speed: 800,
        },
        theme: {
          monochrome: {
            enabled: true,
            color: "#4E54C8",
            shadeIntensity: 0.65,
          },
        },
        xaxis: {
          categories: [
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
          name: "Đơn Hàng",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 45, 76, 23, 78, 34],
        },
      ],
    };
  },

};
</script>
