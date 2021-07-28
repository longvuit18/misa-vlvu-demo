import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown, faAngleUp, faCheckCircle, faExclamationTriangle, faInfoCircle, faSort, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VTooltip from "v-tooltip";
import Vue from "vue";
import { axiosConfig } from "./api/axiosConfig";
import App from "./App.vue";
import Button from "./components/base/Button.vue";
import ButtonIcon from "./components/base/ButtonIcon.vue";
import Col from "./components/base/Col.vue";
import Combobox from "./components/base/Combobox.vue";
import Dialog from "./components/base/Dialog.vue";
import Input from "./components/base/Input.vue";
import Popup from "./components/base/Popup.vue";
import Row from "./components/base/Row.vue";
import Spin from "./components/base/Spin.vue";
import Table from "./components/base/Table.vue";
import ToastMessage from "./components/base/ToastMessage/index.vue";
import router from "./router";
import store from "./store";

// file config axios này luôn phải để ở file main.js
axiosConfig();
library.add(faAngleDown, faAngleUp, faSort, faInfoCircle, faExclamationTriangle, faCheckCircle, faTimes);

// register
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("ToastMessage", ToastMessage);
Vue.component("BaseButton", Button);
Vue.component("BaseInput", Input);
Vue.component("BaseDialog", Dialog);
Vue.component("BaseCol", Col);
Vue.component("BaseRow", Row);
Vue.component("BasePopup", Popup);
Vue.component("BaseTable", Table);
Vue.component("BaseCombobox", Combobox);
Vue.component("BaseButtonIcon", ButtonIcon);
Vue.component("BaseSpin", Spin);
Vue.use(VTooltip);

Vue.config.productionTip = false;
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
