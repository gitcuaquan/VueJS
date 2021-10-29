const state = {
    columns: [
        {
            name: "name",
            required: true,
            label: "Tên Người Dùng",
            align: "left",
            field: (row) => row.name,
            format: (val) => `${val}`,
            sortable: true,
        },
        { name: "email", label: "email", field: "email", sortable: true },
        { name: "title", label: "Tiêu Đề", field: "title" },
        { name: "comment", label: "Phản Hồi", field: "comment" },
        { name: "product_id", label: "ID San Phẩm", field: "product_id",sortable: true },
    ],
    rows: []
}
const getters = {
    rows(state) {
        return state.rows
    },
    columns(state) {
        return state.columns
    },


}
const mutations = {
    setRows(state, data) {
        state.rows = []
        let newData = [...new Set([...state.rows, ...data])]
        state.rows = newData
    }
}
const actions = {
    setRow({ commit }, data) {
        commit('setRows', data)
    }
}


export default {
    state, getters, mutations, actions, namespaced: true
}