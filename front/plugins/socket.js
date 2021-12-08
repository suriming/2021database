import Vue from 'vue'
//import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io-extended'

export default ({ store }) => {
  Vue.use(VueSocketIO, io('/'),
    {
      store,
      debug: false,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    })
}