<template>
    <div id="employee">
        <div class="employee-header">
            <div class="title-text">
                Danh sách nhân viên
            </div>
            <div class="group-button">
                <div class="add-button">
                    <BaseButtonIcon
                        buttonName="Thêm nhân viên"
                        icon="add.png"
                        @click="handleOpenDialog"
                    />
                </div>
                <div class="reload-button">
                    <BaseButtonIcon
                        buttonName=""
                        icon="refresh.png"
                        secondaryButton
                        @click="reloadEmployees"
                    />
                </div>
            </div>
        </div>
        <!-- Đây là phần chưa các input filter có trong page -->
        <div class="filter-bar">
            <div class="search-input">
                <BaseInput
                    searchIcon
                    placeholder="Tìm kiếm theo mã tên hoặc số điện thoại"
                    fullWidth
                    v-tooltip="'Tính năng đang phát triển'"
                />
                <!-- <div class="clear-text-button">&times;</div> -->
            </div>
            <div class="filter-input">
                <BaseCombobox
                    :items="departments"
                    :defaultItem="{value: null, text: 'Tất các phòng ban'}"
                    disabled
                    v-tooltip="'Tính năng đang phát triển'"
                />
            </div>
            <div class="filter-input">
                <BaseCombobox
                    :items="positions"
                    :defaultItem="{value: null, text: 'Tất các vị trí'}"
                    disabled
                    v-tooltip="'Tính năng đang phát triển'"
                />
            </div>
        </div>
        <!-- Đây là phần chưa table thông tin nhân viên -->
        <div class="grid">
            <div class="grid-box">
                <BaseTable
                    :columnNames="columnNames"
                    :dataProps="employees"
                    @dblClickRow="dblClickRow"
                    @rightClick="rightClickRow"
                />
            </div>
        </div>
        <div class="pagination-bar">
            <div class="pagination-box">
                <div class="paging-left">
                    Hiện thị 1-10/1000 nhân viên
                </div>
                <div class="paging-center">
                    <div
                        class="btn-firstpage"
                        @click="firstPage"
                    ></div>
                    <div
                        class="btn-prev-page"
                        @click="prevPage"
                    ></div>
                    <div class="pagination">
                        <div
                            v-for="page in totalPages"
                            :key="page"
                            class="pagination-item"
                            :class="{'active': page == pageNumber}"
                            @click="() => onPagination(page)"
                        >{{page}}</div>
                    </div>
                    <div
                        class="btn-next-page"
                        @click="nextPage"
                    ></div>
                    <div
                        class="btn-lastpage"
                        @click="lastPage"
                    ></div>

                </div>
                <div class="paging-right">
                    10 nhân viên/trang
                </div>
            </div>
        </div>
        <TheEmployeeDetails
            v-if="openDialog"
            @onClose="onCloseDialog"
            :employee="currentEmployee"
            :departments="mapDepartments(departments)"
            :positions="mapPositions(positions)"
            :state="stateDialog"
        />
        <div
            v-if="showRightClickComponent"
            class="right-click-component"
            :style="{'left': left, 'top': top}"
        >
            <BaseButton
                buttonName="Xóa"
                colorRed
                @click="deleteConfirm"
            />
        </div>
        <BasePopup
            v-if="openPopupDelete"
            :content="contentPopup"
            title="Xóa nhân viên"
            primaryButtonName="Xác nhận"
            primaryButtonColor="red"
            secondaryButtonName="Hủy"
            :open="true"
            @onClose="closePopup"
            @onConfirm="onPopupDelete"
        />
    </div>
</template>

<script>

import EmployeeApi from "../api/service/employee";
import TheEmployeeDetails from "../components/layout/TheEmployeeDetails.vue";
import { mapMutations } from "vuex";
const columnNames = [
    { key: "EmployeeCode", text: "Mã nhân viên" },
    { key: "FullName", text: "Họ và tên", sort: true },
    { key: "GenderName", text: "Giới tính" },
    { key: "DateOfBirth", text: "Ngày sinh", align: "center", format: "date" },
    { key: "PhoneNumber", text: "Điện thoại" },
    { key: "Email", text: "Email" },
    { key: "PositionName", text: "Chức vụ" },
    { key: "DepartmentName", text: "Phòng ban" },
    { key: "Salary", text: "Mức lương cơ bản", align: "right", format: "currency" },
    { key: "WorkStatus", text: "Tình trạng công việc" },
    { key: "PersonalTaxCode", text: "Mã số thuế" },
    { key: "Address", text: "Địa chỉ" },
    { key: "JoinDate", text: "Ngày vào công ti", align: "center", format: "date" }
];

const minTimeResponse = 300; // Thời gian chờ ít nhất khi có request
// trạng thái khi click để mở dialog (create là khi ân thêm nhân viên) (update là khi ấn dblclick để xem chi tiết nhân viên)
const stateDialog = {
    create: "POST",
    update: "PUT"
};
export default {
    name: "Employee",
    components: { TheEmployeeDetails },
    data() {
        return {
            columnNames: columnNames,
            employees: [],
            openDialog: false,
            currentEmployee: {},
            departments: [],
            positions: [],
            stateDialog: stateDialog.create,

            showRightClickComponent: false,
            left: 0,
            top: 0,

            // popup
            openPopupDelete: false,

            // pagination
            pageSize: 20,
            pageNumber: 0,
            totalPage: 4,
            totalRecord: 0

        };
    },

    computed: {
        contentPopup() {
            return `Bạn có chắc muốn xóa nhân viên có Mã nhân viên ${this.currentEmployee.EmployeeCode}`;
        },

        /**
         * Tạo 1 array totalPages
         * Created by: Vũ Long Vũ (19/7/2021)
         */
        totalPages() {
            return Array.from({ length: this.totalPage }, (_v, k) => k);
        }
    },
    /**
     * Lấy thông tin của toàn bộ nhân viên
     * Lấy các vị trí và các phong ban
     * CreatedBy: Vũ Long Vũ 16/7/2021
     */
    mounted() {
        this.getData();
        document.removeEventListener("click", this.handleClickOutside);
        document.addEventListener("click", this.handleClickOutside);
    },

    methods: {
        // methods từ vuex
        ...mapMutations("toastMessage", {
            setToast: "setToast"
        }),

        /**
         * Hàm lấy dữ liệu và thông tin phòng ban và vị trí
         * Created by: Vũ Long Vũ (19/7/2021)
         */
        async getData() {
            const startTime = Date.now();
            const promise = await Promise.all([
                EmployeeApi.getAll(),
                EmployeeApi.getDepartments(),
                EmployeeApi.getPositions()
            ]);
            const endTime = Date.now() - startTime;
            if (endTime < minTimeResponse) {
                await this.sleep(minTimeResponse - endTime);
            }
            this.employees = promise[0].data;

            this.departments = [
                {
                    value: null,
                    text: "Tất các phòng ban"
                },
                ...promise[1]
                    .data
                    .map(item => ({ value: item.DepartmentId, text: item.DepartmentName }))];
            this.positions = [
                {
                    value: null,
                    text: "Tất các vị trí"
                },
                ...promise[2]
                    .data
                    .map(item => ({ value: item.PositionId, text: item.PositionName }))];
        },

        // reload dữ liệu employee thì gọi hàm này
        async loadEmployees() {
            const startTime = Date.now();
            const promise = await EmployeeApi.getAll();

            const endTime = Date.now() - startTime;
            if (endTime < minTimeResponse) {
                await this.sleep(minTimeResponse - endTime);
            }

            this.employees = promise.data;
        },

        /**
         * Hàm reload lại bảng nhân viên
         * Created by: Vũ Long Vũ (19/7/2021)
         */
        reloadEmployees() {
            this.employees = [];
            this.loadEmployees();
        },

        /**
         * Hàm mở dialog
         * Created by: Vũ Long Vũ (19/7/2021)
         */
        handleOpenDialog() {
            this.stateDialog = stateDialog.create;
            this.openDialog = true;
        },

        /**
         * Đóng dialog form chi tiết nhân viên
         * Created by: Vũ Long Vũ (19/7/2021)
         */
        onCloseDialog(params) {
            this.openDialog = false;
            this.currentEmployee = {};
            if (params?.hasReloadEmployees) {
                this.employees = [];
                this.loadEmployees();
            }
        },
        /**
         * Hàm khi người dùng dblclick vào 1 hàng
         * Created by: Vũ Long Vũ (19/7/2021)
         */
        dblClickRow(employee) {
            this.currentEmployee = employee;
            this.stateDialog = stateDialog.update;
            this.openDialog = true;
        },

        /**
         * Hàm khi người dùng click chuột phải vào 1 hàng
         * Created by: Vũ Long Vũ (19/7/2021)
         */
        rightClickRow(employee, positionX, positionY) {
            this.currentEmployee = employee;
            this.top = `${positionY}px`;
            this.left = `${positionX}px`;
            this.showRightClickComponent = true;
        },

        // phương thức khi người dùng click ra bên ngoài
        handleClickOutside(event) {
            this.showRightClickComponent = false;
        },

        /**
         * Ánh xạ lại mảng phòng ban
         * Created by: Vũ Long Vũ (19/7/2021)
         */
        mapDepartments(departments) {
            const newDepartments = departments;
            newDepartments[0].text = "Chọn phòng ban";
            return newDepartments;
        },
        /**
         * Ánh xạ lại mảng vị trí
         * Created by: Vũ Long Vũ (19/7/2021)
         */
        mapPositions(positions) {
            const newPositions = positions;
            newPositions[0].text = "Chọn vị trí";
            return newPositions;
        },

        // sleep function
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        /**
         * Hàm mở popup xác nhận xáo
         * Created by: Vũ Long Vũ (19/7/2021)
         */
        deleteConfirm() {
            this.openPopupDelete = true;
        },
        /**
         * Hàm tắt popup
         * Created by: Vũ Long Vũ (19/7/2021)
         */

        closePopup() {
            this.openPopupDelete = false;
            this.showRightClickComponent = false;
            this.currentEmployee = {};
        },

        /**
         * Hàm xóa 1 nhân viên
         * Created by: Vũ Long Vũ (19/7/2021)
         */

        async onPopupDelete() {
            try {
                await EmployeeApi.deleteOne(this.currentEmployee.EmployeeId);
                this.showRightClickComponent = false;
                this.openPopupDelete = false;
                this.setToast({
                    content: `Bạn đã xóa nhân viên ${this.currentEmployee.EmployeeCode} thành công`,
                    type: "success"
                });
                this.reloadEmployees();
            } catch (error) {
                this.setToast({
                    content: "Đã xảy ra lỗi, Liên hệ với Misa để biết thêm chi tiết",
                    type: "error"
                });
                console.error(error);
                this.showRightClickComponent = false;
                this.openPopupDelete = false;
            }
            this.currentEmployee = {};
        },

        /**
         * Các hàm thực hiện pagination
         * Created by: Vũ Long Vũ (19/7/2021)
         */
        // #region

        onPagination(page) {
            this.$router.push({ path: "employee", query: { page: page } }).catch(() => { });
        },

        nextPage() {
            this.$router.push({ path: "employee", query: { page: this.pageNumber + 1 } }).catch(() => { });
        },
        prevPage() {
            this.$router.push({ path: "employee", query: { page: Math.max(0, this.pageNumber - 1) } }).catch(() => { });
        },

        lastPage() {
            this.$router.push({ path: "employee", query: { page: this.totalPage } }).catch(() => { });
        },

        firstPage() {
            this.$router.push({ path: "employee", query: { page: 0 } }).catch(() => { });
        }
        // #endregion
    },

    // xóa sự kiện này khi thoát khỏi xóa component
    destroyed() {
        document.removeEventListener("click", this.handleClickOutside);
    },

    watch: {
        /**
         * Theo dõi sự thay đổi của route để update pageNumber
         * Created by: Vũ Long Vũ (19/7/2021)
         */
        "$route.query": {
            handler(query) {
                if (query?.page) {
                    this.pageNumber = query.page;
                }
            },
            deep: true,
            immediate: true
        },
        pageNumber(page) {
            this.reloadEmployees();
        }
    }

};
</script>

<style scoped>
#employee {
    /* width: calc(100% - 221px); */
    position: relative;
    height: calc(100vh - 61px);
    transition: all 0.4s;
}

#employee .employee-header {
    display: flex;
    justify-content: space-between;
}

#employee .group-button {
    position: relative;
    margin-top: 24px;
    margin-right: 16px;
}

#employee .group-button .reload-button {
    position: absolute;
    right: 0;
    top: 50px;
}

#employee .employee-header .title-text {
    font-weight: bold;
    font-size: 20px;
    margin-left: 16px;
    margin-top: 24px;
    margin-bottom: 24px;
}

#employee .search-input {
    width: 300px;
    margin-right: 10px;
}

#employee .filter-input {
    margin-right: 10px;
}

#employee .filter-bar {
    margin-left: 16px;
    display: flex;
}

#employee .grid {
    width: 100%;
    height: calc(100% - 200px);
}

#employee .grid .grid-box {
    height: 100%;
    overflow: auto;
    margin: 16px 16px 0px 16px;
    background-color: #fff;
}

::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

/* Track */

::-webkit-scrollbar-track {
    background: #f1f1f1;
    margin-top: 37px;
}

/* Handle */

::-webkit-scrollbar-thumb {
    background: rgb(104, 104, 104);
}

/* Handle on hover */

::-webkit-scrollbar-thumb:hover {
    background: rgb(66, 66, 66);
}

.right-click-component {
    position: fixed;
}

/* pagination css */
.pagination-bar {
    position: absolute;
    width: 100%;
    height: 56px;
    bottom: 0;
    left: 0;
}

.pagination-bar .pagination-box {
    margin: 0px 16px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
}

.pagination-bar .paging-left {
    margin-left: 16px;
}

.pagination-bar .paging-right {
    margin-right: 16px;
}

.pagination-bar .paging-center {
    display: flex;
    align-items: center;
}

.pagination-bar .paging-center .pagination {
    display: flex;
    justify-content: center;
}

.pagination-bar .paging-center .pagination-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 1px solid #bbbbbb;
    border-radius: 50%;
    margin: 0px 5px;
    cursor: pointer;
}

.pagination-bar .paging-center .active {
    background-color: #019160;
    color: #fff;
}

.pagination-bar .paging-center .btn-firstpage {
    width: 20px;
    height: 20px;
    background-image: url("../assets/icon/btn-firstpage.svg");
    background-size: cover;
    margin-right: 10px;
    cursor: pointer;
}

.pagination-bar .paging-center .btn-prev-page {
    width: 20px;
    height: 20px;
    background-image: url("../assets/icon/btn-prev-page.svg");
    background-size: cover;
    margin: 0px 15px;
    cursor: pointer;
}

.pagination-bar .paging-center .btn-next-page {
    width: 20px;
    height: 20px;
    background-image: url("../assets/icon/btn-next-page.svg");
    background-size: cover;
    margin: 0px 15px;
    cursor: pointer;
}

.pagination-bar .paging-center .btn-lastpage {
    width: 20px;
    height: 20px;
    background-image: url("../assets/icon/btn-lastpage.svg");
    background-size: cover;
    margin-left: 10px;
    cursor: pointer;
}
</style>
