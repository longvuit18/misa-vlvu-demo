
export const toastMessage = {
	namespaced: true,

	state: {
		toast: {}
	},

	mutations: {
		setToast(state, newToast) {
			state.toast = newToast;
		}
	}
};
