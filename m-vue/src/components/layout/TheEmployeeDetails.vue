<template>
    <div>
        <BaseDialog isOpen>
            <div class="e-box">
                <div id="employee-details">
                    <div class="title">Thông tin nhân viên</div>
                    <div
                        class="close-button"
                        @click="onClose"
                    >&times;</div>
                    <BaseRow>
                        <BaseCol cols="3">
                            <div class="avatar-col">
                                <img
                                    src="../../assets/img/default-avatar.jpg"
                                    alt="default-avatar"
                                >
                                <div class="avatar-subtext">
                                    (Vui lòng chọn ảnh có định <br /> dạng .jpg .jpeg, .png, .gift)
                                </div>
                            </div>

                        </BaseCol>
                        <BaseCol cols="9">
                            <div class="common-info-title">
                                <div>A. Thông tin chung:</div>
                                <div class="border"></div>
                            </div>
                            <BaseRow>
                                <BaseCol cols="6">
                                    <BaseInput
                                        fullWidth
                                        label="Mã nhân viên"
                                        required
                                        tabindex="1"
                                        v-model="currentEmployee.EmployeeCode"
                                        ref="input-1"
                                        messageError="Bạn cần nhập mã nhân viên"
                                    />
                                    <BaseInput
                                        fullWidth
                                        label="Ngày sinh"
                                        tabindex="3"
                                        type="date"
                                        v-model="currentEmployee.DateOfBirth"
                                    />
                                    <BaseInput
                                        fullWidth
                                        label="Số CMTND/Căn cước"
                                        required
                                        tabindex="5"
                                        v-model="currentEmployee.IdentityNumber"
                                        ref="input-3"
                                        format="number"
                                    />
                                    <BaseInput
                                        fullWidth
                                        label="Nơi cấp"
                                        tabindex="7"
                                        v-model="currentEmployee.IdentityPlace"
                                    />
                                    <BaseInput
                                        fullWidth
                                        label="Email"
                                        required
                                        tabindex="8"
                                        v-model="currentEmployee.Email"
                                        type="email"
                                        ref="input-4"
                                    />
                                </BaseCol>
                                <BaseCol cols="6">
                                    <BaseInput
                                        fullWidth
                                        label="Họ và tên"
                                        required
                                        tabindex="2"
                                        v-model="currentEmployee.FullName"
                                        ref="input-2"
                                    />
                                    <BaseCombobox
                                        label="Giới tính"
                                        :items="gender"
                                        tabindex="4"
                                        :defaultItem="{value: currentEmployee.Gender, text: currentEmployee.GenderName}"
                                        @result="(result) => getData(result, 'gender')"
                                    />
                                    <BaseInput
                                        fullWidth
                                        label="Ngày cấp"
                                        tabindex="6"
                                        type="date"
                                        v-model="currentEmployee.IdentityDate"
                                    />
                                    <div style="height: 72px"></div>
                                    <BaseInput
                                        fullWidth
                                        label="Số điện thoại"
                                        v-model="currentEmployee.PhoneNumber"
                                        tabindex="9"
                                        format="phoneNumber"
                                    />
                                </BaseCol>
                            </BaseRow>
                            <div class="common-info-title">
                                <div>B. Thông tin công việc:</div>
                                <div class="border"></div>
                            </div>
                            <BaseRow>
                                <BaseCol cols="6">
                                    <BaseCombobox
                                        label="Vị trí"
                                        :items="currentPositions"
                                        tabindex="10"
                                        :defaultItem="{value: currentEmployee.PositionId, text: currentEmployee.PositionName}"
                                        @result="(result) => getData(result, 'position')"
                                    />
                                    <BaseInput
                                        fullWidth
                                        label="Mã số thuế"
                                        v-model="currentEmployee.PersonalTaxCode"
                                        tabindex="12"
                                        format="number"
                                    />
                                    <BaseInput
                                        fullWidth
                                        label="Ngày gia nhập công ty"
                                        type="date"
                                        v-model="currentEmployee.JoinDate"
                                        tabindex="14"
                                    />
                                </BaseCol>
                                <BaseCol cols="6">
                                    <BaseCombobox
                                        label="Phòng ban"
                                        :items="currentDepartments"
                                        tabindex="11"
                                        :defaultItem="{value: currentEmployee.DepartmentId, text: currentEmployee.DepartmentName}"
                                        @result="(result) => getData(result, 'department')"
                                    />
                                    <BaseInput
                                        fullWidth
                                        label="Mức lương cơ bản"
                                        v-model="currentEmployee.Salary"
                                        format="currency"
                                        tabindex="13"
                                    />
                                    <BaseCombobox
                                        label="Tình trạng công việc"
                                        :items="[]"
                                        :defaultItem="{value: currentEmployee.Gender, text: 'Đang phát triển'}"
                                        required
                                    />
                                </BaseCol>
                            </BaseRow>
                        </BaseCol>
                    </BaseRow>
                </div>
                <div class="dialog-footer">
                    <a @click="onClose">Hủy</a>
                    <BaseButton
                        :buttonName="setNameButton()"
                        @click="onConfirm"
                    />
                </div>
            </div>

        </BaseDialog>
        <BasePopup
            v-if="openPopupClose"
            content="Bạn có chắc muốn đóng form thông tin chi tiết nhân viên."
            title="Đóng form thông tin chi tiết"
            primaryButtonName="Đóng"
            secondaryButtonName="Hủy"
            :open="true"
            @onClose="closePopup"
            @onConfirm="onPopupClose"
        />

        <BasePopup
            v-if="openPopupConfirmUpdate"
            content="Bạn có chắc muốn cập nhập thông tin chi tiết nhân viên."
            title="Xác nhận cập nhập thông tin chi tiết"
            primaryButtonName="Đồng ý"
            secondaryButtonName="Hủy"
            :open="true"
            @onClose="closePopup"
            @onConfirm="onConfirmUpdate"
        />

        <BasePopup
            v-if="openPopupConfirmCreate"
            content="Bạn có chắc muốn tạo một nhân viên mới."
            title="Xác nhận tạo nhân viên"
            primaryButtonName="Đồng ý"
            secondaryButtonName="Hủy"
            :open="true"
            @onClose="closePopup"
            @onConfirm="onConfirmCreate"
        />
    </div>
</template>

<script>
import EmployeeApi from "../../api/service/employee";
import { mapMutations } from "vuex";
// trạng thái của dialog này
const stateDialog = {
    create: "POST",
    update: "PUT"
};
export default {
    name: "TheEmployeeDetails",
    props: {
        employee: Object,
        departments: Array,
        positions: Array,
        state: String
    },

    data: function () {
        return {
            dialogVisible: true,
            gender: [
                { value: 2, text: "Không xác định" },
                { value: 0, text: "Nữ" },
                { value: 1, text: "Nam" }
            ],
            currentDepartments: this.departments,
            currentPositions: this.positions,
            currentEmployee: {
                ...this.employee,
                DateOfBirth: this.formatDate(this.employee?.DateOfBirth),
                IdentityDate: this.formatDate(this.employee?.IdentityDate),
                JoinDate: this.formatDate(this.employee?.JoinDate),
                Salary: this.employee?.Salary?.toString()
            },
            disabledButton: true,
            // open popup
            openPopupClose: false,
            openPopupConfirmUpdate: false,
            openPopupConfirmCreate: false,

            // kiểm tra xem người dùng đã sửa hay thao tác gì với form chưa
            edited: false

        };
    },
    watch: {
        currentEmployee: {
            handler() {
                this.edited = true;
            },
            deep: true
        }
    },

    mounted() {
        // this.getEmployeeId();
        this.$refs["input-1"].$refs.BaseInput.focus();
    },

    methods: {
        ...mapMutations("toastMessage", {
            setToast: "setToast"
        }),

        // async getEmployeeId() {
        //     const promise = await EmployeeApi.getEmployeeId();
        //     this.currentEmployee.EmployeeCode = {
        //         ...this.currentEmployee,
        //         EmployeeCode: promise.data
        //     };
        // },
        onClose() {
            if (this.edited) {
                this.openPopupClose = true;
                return;
            }
            this.$emit("onClose");
        },

        formatDate(date) {
            if (!date) {
                return "";
            }

            let day = new Date(date).getDate();
            let month = new Date(date).getMonth() + 1;
            const year = new Date(date).getFullYear();

            if (day < 10) day = "0" + day;
            if (month < 10) month = "0" + month;
            return year + "-" + month + "-" + day;
        },

        getData(result, name) {
            switch (name) {
                case "gender":
                    this.currentEmployee = { ...this.currentEmployee, Gender: result.value, GenderName: result.text };
                    break;
                case "position":
                    this.currentEmployee = { ...this.currentEmployee, PositionId: result.value, PositionName: result.text };
                    break;

                case "department":
                    this.currentEmployee = { ...this.currentEmployee, DepartmentId: result.value, DepartmentName: result.text };
                    break;

                default:
                    break;
            }
        },

        setNameButton() {
            return this.state === stateDialog.create ? "Thêm" : "Lưu";
        },

        onConfirm() {
            let isError;
            // vị trí của lỗi
            const indexErrors = [];
            // tìm tất cả vị trí lỗi
            Object.entries(this.$refs).forEach((item, index) => {
                item[1].$refs.BaseInput.focus();
                item[1].$refs.BaseInput.blur();
                if (item[1].error === true) {
                    isError = true;
                    indexErrors.push(index);
                }
            });
            if (!isError) {
                if (this.state === stateDialog.create) {
                    this.openPopupConfirmCreate = true;
                } else {
                    this.openPopupConfirmUpdate = true;
                }
            } else {
                // focus vào lỗi đầu tiên
                Object.entries(this.$refs)[indexErrors[0]][1].$refs.BaseInput.focus();
                this.setToast({
                    content: "Bạn cần nhập đúng và đủ các trường",
                    type: "error"
                });
            }
        },

        /**
         * handle popup
         * Created by: Vũ Long Vũ 18/7/2021
         */
        closePopup() {
            this.openPopupClose = false;
            this.openPopupConfirmUpdate = false;
            this.openPopupConfirmCreate = false;
        },
        onPopupClose() {
            // đóng popup
            this.openPopupConfirmClose = false;
            this.$emit("onClose");
        },

        async onConfirmUpdate() {
            this.openPopupConfirmUpdate = false;
            try {
                await EmployeeApi.updateOne(
                    this.currentEmployee.EmployeeId,
                    {
                        ...this.currentEmployee,
                        Salary: Number(this.currentEmployee.Salary?.replaceAll(".", ""))
                    });
                this.setToast({
                    content: `Bạn đã cập nhập nhân viên mã ${this.currentEmployee.EmployeeCode} thành công!`,
                    type: "success"
                });
                this.$emit("onClose", { hasReloadEmployees: true });
            } catch (error) {
                this.setToast({
                    content: "Đã xảy ra lỗi, mở console devtool để xem!",
                    type: "error"
                });
                console.log(error);
            }
        },
        async onConfirmCreate() {
            this.openPopupConfirmCreate = false;
            try {
                await EmployeeApi.insertOne(
                    {
                        ...this.currentEmployee,
                        Salary: Number(this.currentEmployee.Salary?.replaceAll(".", ""))
                    });
                // set toast
                this.setToast({
                    content: `Bạn đã thêm 1 nhân viên mã ${this.currentEmployee.EmployeeCode} thành công!`,
                    type: "success"
                });
                this.$emit("onClose", { hasReloadEmployees: true });
            } catch (error) {
                this.setToast({
                    content: "Đã xảy ra lỗi, mở console devtool để xem!",
                    type: "error"
                });
                console.log(error);
            }
        }
    }

};
</script>

<style scoped>
#employee-details {
    padding: 12px;
    width: 650px;
}

#employee-details .title {
    text-transform: uppercase;
    font-size: 20px;
    font-weight: bold;
    margin: 12px 0px;
}
#employee-details .common-info-title {
    text-transform: uppercase;
    font-size: 15px;
    margin-bottom: 4px;
}

#employee-details .common-info-title .border {
    width: 80px;
    margin-top: 10px;
    border-bottom: 3px solid #01b075;
}
#employee-details .avatar-col {
    text-align: center;
}

#employee-details .avatar-col img {
    width: 100%;
    height: auto;
    border-radius: 50%;
    border: 1px solid #e5e5e5;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    height: 60px;
    align-items: center;
    background-color: #e9ebee;
    padding-right: 16px;
    border-radius: 0 0 4px 4px;
}
.dialog-footer a {
    height: 40px;
    padding: 0px 24px;
    margin-right: 10px;
    border-radius: 4px;
    cursor: pointer;
    line-height: 40px;
}

.e-box {
    border-radius: 4px;
    background-color: #fff;
    position: relative;
}

.dialog-footer a:hover {
    background-color: #e5e5e5;
}

.close-button {
    font-size: 25px;
    padding: 2px 10px;
    position: absolute;
    right: 0;
    cursor: pointer;
    top: 0;
}
.close-button:hover {
    background-color: #e5e5e5;
    border-radius: 0px 4px 0px 0px;
}
</style>
