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
        { name: "address", label: "Địa Chỉ", field: "address" },
        { name: "phone", label: "Số Điện Thọai", field: "phone" },
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