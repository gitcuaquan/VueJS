import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import auth from './modules/auth'
import databill from './modules/databill'
import user from './modules/user'
import comment from './modules/comment'
import post from './modules/post'
import cart from './modules/cart';



export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      auth, databill, user, comment, post, cart
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
