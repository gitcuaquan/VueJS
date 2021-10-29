const state = {
    auth: false,
    token: ''
}
const getters = {
    auth(state) {
        return state.auth
    },
    token(state) {
        return state.token
    }

}
const mutations = {
    setAuth(state, data) {
        state.auth = data
    }, settoken(state,data) {
        state.token = data
    }
}
const actions = {
    settoken({ commit }, data) {
        commit("settoken", data)
    },
    setAuth({ commit }, data) {
        return commit("setAuth", data)
    }
}


export default {
    state, getters, mutations, actions, namespaced: true
}