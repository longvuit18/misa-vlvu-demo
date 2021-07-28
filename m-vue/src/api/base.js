import axios from "axios";

/**
 * Base Api đây là nơi chưa các api dùng chung
 * Created by: Vũ Long Vũ (20/7/2021)
 */
export class BaseApi {
	route = "";

	/**
	 * Khởi tạo BaseApi
	 * @param {string} path Đây là path (phần ngay sau base_url)
	 */
	constructor(route) {
		this.route = route || "";
	}

	/**
	 * hàm lấy tất cả data từ api
	 * @returns {Promise} Trả về 1 axios promise
	 */
	async getAll() {
		return await axios.get(this.route);
	}

	/**
	 * hàm lấy 1 item từ api bằng id
	 * @returns {Promise} Trả về 1 axios promise
	 */
	async getItemById(id) {
		return await axios.get(`${this.route}/${id}`);
	}

	/**
	 * thêm 1 item
	 * @param {string} id id của item đó
	 * @param {object} data những dữ liệu mình muốn update
	 * @returns {Promise} Trả về 1 axios promise
	 */
	async insertOne(data) {
		return await axios.post(`${this.route}`, data);
	}

	/**
	 * update 1 item
	 * @param {string} id id của item đó
	 * @param {object} data những dữ liệu mình muốn update
	 * @returns {Promise} Trả về 1 axios promise
	 */
	async updateOne(id, data) {
		return await axios.put(`${this.route}/${id}`, data);
	}

	/**
	 * Xóa 1 item
	 * @param {string} id id của item đó
	 * @returns {Promise} Trả về 1 axios promise
	 */
	async deleteOne(id) {
		return await axios.delete(`${this.route}/${id}`);
	}
}
