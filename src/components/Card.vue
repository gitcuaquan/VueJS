<template>
  <div class="col-4 q-pa-md q-mt-md" v-for="(c, i) in comment" :key="i">
    <q-list>
      <q-expansion-item
        popup
        icon="mail"
        :label="c.title"
        :caption="`Về Sản Phẩm Có Mã ${c.product_id}`"
      >
        <q-separator />
        <q-card>
          <q-card-section> {{ c.comment }} </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        popup
        icon="fad fa-address-card"
        label="Thông Tin Khách Hàng"
        caption=""
      >
        <q-separator />
        <q-card>
          <q-card-section>
            <div class="name q-my-sm">Họ Và Tên: <q-chip :label="c.name" /></div>
            <div class="name q-my-sm">Địa Chỉ: <q-chip :label="c.address" /></div>
            <div class="email q-my-sm">Email Liên Hệ: <q-chip :label="c.email" /></div>
            <div class="phone q-my-sm">Số Điện Thoại : <q-chip :label="c.phone" /></div>
            <div class="level q-my-sm">
              Mức Thân Thiết:
              <q-chip :label="`${c.level}/5`" />
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        popup
        icon="drafts"
        label="Hành Động"
        caption="Nhân Viên Chăm Sóc Khách Hàng"
      >
        <q-separator />
        <q-card>
          <q-card-section>
            <div class="row">
              <q-btn color="primary" flat label="Trả Lời Khách Hàng" />
              <q-space />
              <q-btn color="primary" flat label="Xem Sản Phẩm" />
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      typeof: Array,
    },
  },
};
</script>

<style lang="scss" scoped></style>
