class Snackbar {
    base = $("#snackbar");

    message = "message snackbar";
    color = "#019160";

    /**
     * Khởi tạo 1 toast message
     * @param {string} message Message cần thông báo với người dùng 
     * @param {*} color Màu của các icon
     * @param {*} icon 1 element icon của font awesome
     * createdBy: Vũ Long Vũ 12/7/2021
     */
    constructor(message, color = "#019160", icon = `<i class="fa fa-check" aria-hidden="true" style="color: #019160"></i>`) {
        this.message = message;
        this.color = color;
        this.icon = icon;
    }


    /**
     * Hàm tạo snackbar
     * createBy: Vũ Long Vũ 12/7/2021 
     */
    initSnackbar() {
        if (!this.base) {
            this.base = $("<div id='snackbar'></div>");
        }
        this.base.empty();
        const html = `
            <div class="toast-icon">
                ${this.icon}
            </div>
            <div class="toast-message">${this.message}</div>
            <div class="toast-close" style="color: ${this.color}">&times;</div>
        `;

        this.base.append(html);
    }
    /**
    *  Hiện snackbar
    *  created by: Vũ Long Vũ 12/7/2021
    * */
    showSnackbar() {
        this.initSnackbar();

        this.base.addClass("show");
        // ấn vào button đóng
        this.base.on("click", ".toast-close", function (e) {
            e.preventDefault();
            this.base.removeClass("show");
            return;
        })
        setTimeout(() => {
            this.base.removeClass("show");
        }, 4000);
        return;
    }
}