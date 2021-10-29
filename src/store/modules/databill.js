const state = {
    columns: [
        {
            name: "namebill",
            required: true,
            label: "Tên Đơn Hàng",
            align: "left",
            field: (row) => row.name,
            format: (val) => `${val}`,
            sortable: true,
        },
        {
            name: "value",
            align: "center",
            label: "Giá Trị",
            field: "value",
            sortable: true,
        },
        { name: "idMember", label: "Mã Khách Hàng", field: "idMember", sortable: true },
        { name: "address", label: "Địa Chỉ", field: "address" },
        { name: "phone", label: "Số Điện Thọai", field: "phone" },
    ],

    rows: [
        {
            namebill: "Frozen Yogurt",
            value: 159,
            idMember: 6.0,
            Address: 24,
            phone: 4.0,
        },
        {
            namebill: "Ice cream sandwich",
            value: 237,
            idMember: 9.0,
            Address: 37,
            phone: 4.3,
        },
        {
            namebill: "Eclair",
            value: 262,
            idMember: 16.0,
            Address: 23,
            phone: 6.0,
        },
        {
            namebill: "Cupcake",
            value: 305,
            idMember: 3.7,
            Address: 67,
            phone: 4.3,
        },
        {
            namebill: "Gingerbread",
            value: 356,
            idMember: 16.0,
            Address: 49,
            phone: 3.9,
        },
        {
            namebill: "Jelly bean",
            value: 375,
            idMember: 0.0,
            Address: 94,
            phone: 0.0,
        },
        {
            namebill: "Lollipop",
            value: 392,
            idMember: 0.2,
            Address: 98,
            phone: 0,
        },
        {
            namebill: "Honeycomb",
            value: 408,
            idMember: 3.2,
            Address: 87,
            phone: 6.5,
        },
        {
            namebill: "Donut",
            value: 452,
            idMember: 25.0,
            Address: 51,
            phone: 4.9,
        },
        {
            namebill: "KitKat",
            value: 518,
            idMember: 26.0,
            Address: 65,
            phone: 7,
        },
    ]
}
const getters = {
    rows(state) {
        return state.rows
    },
    colums(state) {
        return state.columns
    },


}
const mutations = {

}
const actions = {

}


export default {
    state, getters, mutations, actions, namespaced: true
}