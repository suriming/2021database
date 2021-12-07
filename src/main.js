import Vue from 'vue' 
import App from './App.vue' 
import VueMaterial from 'vue-material' 
import 'vue-material/dist/vue-material.css' 
import 'vue-material/dist/theme/black-green-light.css' 
import Directives from '../plugin/directives' 

///서버와 소켓연결을 위한 모듈 import
import io from 'socket.io-client'; 
//연결하려는 localhost 서버의 url
const socket = io('http://localhost:3000'); 

//소켓을 vue 변수로 등록하여 컴포넌트에서 사용
Vue.prototype.$socket = socket;

Vue.use(VueMaterial) 
Vue.use(Directives) 

Vue.config.productionTip = false 
new Vue({ 
    render: h => h(App), 
}).$mount('#app')
