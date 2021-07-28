import axios from "axios";
import { BaseApi } from "../base";
class EmployeeApi extends BaseApi {
	constructor() {
		const route = "/v1/Employees";
		super(route);
	}

	/**
	 * Lấy thông tin của departments
	 * @returns axios promise
	 * Created by: Vũ Long Vũ (20/7/2021)
	 */
	async getDepartments() {
		return await axios.get("/api/Department");
	}

	/**
	 * Lấy thông tin của positions
	 * @returns axios promise
	 * Created by: Vũ Long Vũ (20/7/2021)
	 */
	async getPositions() {
		return await axios.get("/v1/Positions");
	}

	/**
	 * Lấy id mới cho nhân viên
	 * @returns axios promise
	 * Created by: Vũ Long Vũ (20/7/2021)
	 */
	async getEmployeeId() {
		return await axios.get("/v1/Employees/NewEmployeeCode");
	}

	// override here
}

export default new EmployeeApi();
