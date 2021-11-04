const state = {
   content:"",
   thumbnail:""
}
const getters = {
    content(state){
        return state.content
    },
    thumbnail(state){
        return state.thumbnail
    }
}
const mutations = {
    setContent(state, data) {
        state.content = data
    },
    setThumbnail(state, data) {
        state.thumbnail = data
    },
}
const actions = {
    setContent({ commit }, data) {
        commit('setContent', data)
    },
    setThumbnail({ commit }, data) {
        commit('setThumbnail', data)
    }
}

export default {
    state, getters, mutations, actions, namespaced: true
}