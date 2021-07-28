/**
 *  Tạo popup cho page
 *  created by: Vũ Long Vũ 8/7/2021
 * */
class PopupJs {

    base = $("#popup");
    /**
     * Khởi tạo popup
     * @param {steing} title 
     * @param {string} content 
     * @param {html} secondaryButton 
     * @param {html} primaryButton
     * createBy: Vũ Long Vũ 8/8/2021 
     */
    constructor(title, content, secondaryButton = null, primaryButton) {
        this.title = title ?? "popup";
        this.content = content ?? "content popup";
        this.secondaryButton = secondaryButton;
        this.primaryButton = primaryButton;
    }

    /**
     * Hàm tạo popup
     * createBy: Vũ Long Vũ 8/8/2021 
     */
    initPopup() {
        if (!this.base) {
            this.base = $("<div id='popup'></div>");
        }
        const html = `
        <div class="dialog" style="display: block;">
            <div class="dialog-content" style="padding:0px">
                <div class="popup">
                    <div class="popup-header">
                        <div class="title">${this.title}</div>
                        <div class="close-button">&times;</div>
                    </div>
                    <div class="popup-content">
                        <div class="content-icon">
                            <img src="../content/icon/btn-next-page.svg" alt="">
                        </div>
                        <div class="content-text">
                            ${this.content}
                        </div>
                    </div>
                    <div class="popup-action">
                        ${this.secondaryButton ?? ""}
                        ${this.primaryButton ?? ""}
                    </div>
                </div>
            </div>
        </div>`;

        this.base.append(html);
    }
    /**
    *  Hiện popup
    *   @param {function} action hành động sau khi popup được xác nhận
    *  created by: Vũ Long Vũ 8/7/2021
    * */
    showPopup(action = null) {
        const me = this;
        this.initPopup();

        // ấn vào button đóng
        $("#popup").on("click", ".close-button", function (e) {
            e.preventDefault();
            me.hidePopup();

        })

        // ấn vào secondary button
        $("#popup").on("click", ".popup-action a", function (e) {
            e.preventDefault();
            me.hidePopup();
        })

        // ấn vào primary button
        $("#popup").on("click", ".popup-action button", function (e) {
            e.preventDefault();
            me.hidePopup();
            action();
        })

    }

    /**
    *  Ẩn popup
    *  created by: Vũ Long Vũ 8/7/2021
    * */
    hidePopup() {
        this.base.empty();
    }


}