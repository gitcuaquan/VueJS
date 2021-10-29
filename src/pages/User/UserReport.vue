<template>
  <div>
    <div class="row">
      <div class="col-12">
        <q-card class="q-pa-xs">
          <div class="text-center text-blue-9 title">Lượng Khách Truy Cập Theo Tháng</div>
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
    <div class="row">
      <div class="col-12">
        <q-card class="q-pa-md q-mt-md">
          <div class="title">Danh Sách Khách Hàng</div>

          <q-table
            :grid="grid"
            :rows="rows"
            :columns="columns"
            row-key="name"
            v-model:pagination="pagination"
            :filter="filter"
            hide-pagination
          >
            <template v-slot:top>
              <q-btn
                color="primary"
                icon="fad fa-th-large"
                @click="setgrid"
                :disable="grid"
              >
                <q-tooltip> Hiển Thị Dạng Lưới</q-tooltip></q-btn
              >

              <q-btn
                class="q-mx-sm"
                color="primary"
                icon="fal fa-table"
                @click="settable"
                :disable="!grid"
              >
                <q-tooltip> Hiển Thị Dạng Bảng </q-tooltip>
              </q-btn>
              <q-btn
                color="primary"
                icon-right="archive"
                label="Xuất Ra File Csv"
                no-caps
                @click="exportTable"
              />
              <q-space />
              <q-input
                debounce="300"
                label="Bạn Muốn Tìm Ai"
                color="primary"
                v-model="filter"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
          </q-table>
          <div class="row justify-center q-mt-md">
            <q-pagination
              v-model="pagination.page"
              color="grey-8"
              :max="pagesNumber"
              size="sm"
            />
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { exportFile } from "quasar";
import axios from "axios";

export default {
  data() {
    return {
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 16,
      },

      pagesNumber: 1,
      filter: "",
      grid: false,
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
          name: "Khách",
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
          name: "Đơn Hàng",
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
  mounted() {
    this.getUser();
  },

  computed: {
    ...mapGetters("auth", ["token"]),
    ...mapGetters("user", ["rows", "columns"]),
  },
  methods: {
    ...mapActions("user", ["setRow"]),
    wrapCsvValue(val, formatFn) {
      let formatted = formatFn !== void 0 ? formatFn(val) : val;
      formatted = formatted === void 0 || formatted === null ? "" : String(formatted);
      formatted = formatted.split('"').join('""');
      return `"${formatted}"`;
    },

    exportTable() {
      const content = [this.columns.map((col) => this.wrapCsvValue(col.name))]
        .concat(
          this.rows.map((row) =>
            this.columns
              .map((col) =>
                this.wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("Báo Cáo.csv", content, "text/csv");

      if (status !== true) {
        $q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
    settable() {
      this.grid = false;
    },
    setgrid() {
      this.grid = true;
    },
    async getUser() {
      await axios("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: "Bearer " + this.token,
          Accept: "application/json",
        },
      }).then((res) => {
        this.setRow(res.data);
        this.pagesNumber = Math.ceil(this.rows.length / this.pagination.rowsPerPage);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
