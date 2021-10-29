<template>
  <div class="q-pa-md">
    <q-table
      flat
      :rows="data"
      :columns="columns"
      row-key="name"
      hide-pagination
    />

  </div>
</template>
<script>
import { ref, computed } from "vue";
export default {
  props:{
    data:{
      typeof : Array
    },
    columns:{
      typeof : Array
    }
  },
  setup() {
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 5,
      // rowsNumber: xx if getting data from a server
    });

    return {
      pagination,
      pagesNumber: computed(() => Math.ceil(data.length / pagination.value.rowsPerPage)),
    };
  },
};
</script>
