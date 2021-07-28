import axios from "axios";

/**
 * Config axios cho page
 * Created by: Vũ Long Vũ (20/7/2021)
 */
export const axiosConfig = () => {
	axios.defaults.baseURL = "http://cukcuk.manhnv.net";
	// axios.defaults.headers.common.Authorization = AUTH_TOKEN;
	axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

	axios.interceptors.request.use(request => {
		// console.log(request);
		// Edit request config
		return request;
	}, error => {
		// console.log(error);
		return Promise.reject(error);
	});

	axios.interceptors.response.use(response => {
		// console.log(response);
		// Edit response config
		return response;
	}, error => {
		// console.log(error);
		return Promise.reject(error);
	});
};
