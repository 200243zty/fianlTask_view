import Vue from "vue";
import App from "./App";
import router from "./router";
import "./assets/css/index.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/js/iconfont.js";
import "@/assets/js/iconfont1.js";
import "@/assets/js/iconfont2.js";
import "@/assets/js/iconfont3.js";
import "@/assets/js/iconfont4.js";
import store from "./store";
// import UndrawUi from "undraw-ui"
// import 'undraw-ui/dist/style.css'
import VueCoreVideoPlayer from 'vue-core-video-player'
import MChat from '@maybecode/m-chat'
import JwChat from 'jwchat';

Vue.use(ElementUI);
// Vue.use(UndrawUi)
Vue.use(VueCoreVideoPlayer);
Vue.use(MChat)
Vue.use(JwChat)
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  render: (h) => h(App),
});
