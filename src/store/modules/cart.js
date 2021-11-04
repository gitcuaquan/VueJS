const state = {
    listCart: [],
    total: localStorage.getItem('total'),
    numOder: 0,
}
const getters = {
    listCart(state) {
        return state.listCart
    },
    total(state) {
        return state.total
    },
    numOder(state) {
        return state.numOder
    },
}
const mutations = {
    setCart(state, data) {
        const id = data.id
        const isSave = state.listCart.find(e => e.id == id)
        if (isSave == undefined) {
            state.listCart.push(data)
        } else {
            state.listCart.forEach((e, i) => {
                if (e.id == id) {
                    state.listCart[i].qty = state.listCart[i].qty + data.qty
                }
            })
        }
        state.listCart.forEach(e => {
            e.subtotal = + (e.qty * e.price)
        })
        function sumArray(mang) {
            let sum = 0;
            let i = 0;
            while (i < mang.length) {
                sum += mang[i].subtotal;
                i++;
            }
            return sum;
        }
        function sumQty(mang) {
            let sum = 0;
            let i = 0;
            while (i < mang.length) {
                sum += mang[i].qty;
                i++;
            }
            return sum;
        }
        state.total = sumArray(state.listCart) * 1
        state.numOder = sumQty(state.listCart) * 1

    },
    updateCart(state, data) {
        state.listCart.forEach((i, j) => {
            if (i.id == data.id) {
                state.listCart[j].qty = data.value
                state.listCart.forEach(e => {
                    e.subtotal = + (e.qty * e.price)
                })
                function sumArray(mang) {
                    let sum = 0;
                    let i = 0;
                    while (i < mang.length) {
                        sum += mang[i].subtotal;
                        i++;
                    }
                    return sum;
                }
                function sumQty(mang) {
                    let sum = 0;
                    let i = 0;
                    while (i < mang.length) {
                        sum += mang[i].qty * 1;
                        i++;
                    }
                    return sum;
                }

                state.total = sumArray(state.listCart)
                state.numOder = sumQty(state.listCart)
            }
        })

    },
    deleteCart(state, data) {
        state.listCart = state.listCart.filter(i => i.id != data)
        state.listCart.forEach(e => {
            e.subtotal = + (e.qty * e.price)
        })
        function sumArray(mang) {
            let sum = 0;
            let i = 0;
            while (i < mang.length) {
                sum += mang[i].subtotal;
                i++;
            }
            return sum;
        }
        function sumQty(mang) {
            let sum = 0;
            let i = 0;
            while (i < mang.length) {
                sum += mang[i].qty;
                i++;
            }
            return sum;
        }

        state.total = sumArray(state.listCart) * 1
        state.numOder = sumQty(state.listCart) * 1
    },
    setTotal(state, data) {
        state.total = data
    },
    setNumOder(state, data) {
        state.numOder = data
    }



}
const actions = {
    setCart({ commit }, data) {
        commit('setCart', data)
    },
    updateCart({ commit }, data) {
        commit('updateCart', data)
    },
    deleteCart({ commit }, data) {
        commit('deleteCart', data)
    },
    setTotal({ commit }, data) {
        commit('setTotal', data)
    },
    setNumOder({ commit }, data) {
        commit('setTotal', data)
    }
}


export default {
    state, getters, mutations, actions, namespaced: true
}