import Vue from "vue";
import Vuex from "vuex";
import { toastMessage } from "./modules/toastMessage";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		toastMessage
	}
});
