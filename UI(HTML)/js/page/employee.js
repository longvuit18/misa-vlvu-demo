$(document).ready(function () {
    initEvent();
    new EmployeeJS().loadData();

});

function initEvent() {
    const popupConfirmQuit = new PopupJs("Pop-up thông báo", "Bạn có chắc muốn tắt form này không?", "<a>Tiếp tục nhập</a>", "<button>Đóng</button>");
    const popupConfirmSave = new PopupJs("Pop-up thông báo", "Bạn có thay đổi thông tin của form?", "<a>Hủy</a>", "<button>Ok</button>");
    // ấn vào toggle để ẩn và hiện navbar
    // $(".navbar .toogler-icon").click(function (e) {
    //     e.preventDefault();
    //     if ($(this).hasClass("thumb-navbar-active")) {
    //         $(".navbar-content").show();
    //         $(".thumb-navbar-content").css("display", "none");
    //         $(this).removeClass("thumb-navbar-active");
    //         $(".content").animate(
    //             {
    //                 left: "221px",
    //             },
    //             500,
    //             () => {
    //                 $(".content").css("width", "calc(100% - 221px)")
    //             }
    //         )
    //     } else {
    //         $(this).toggleClass("thumb-navbar-active");
    //         $(".navbar-content").css("display", "none");
    //         $(".thumb-navbar-content").show();

    //         $(".content").animate(
    //             {
    //                 left: "52px",
    //                 width: "100%",
    //             },
    //             500,
    //             () => {
    //                 $(".content").css("width", "calc(100% - 52px)")
    //             }
    //         )
    //     }
    // });


    // Mở dialog employee-details
    $(".add-button button").click(function (e) {
        e.preventDefault();
        $(".employee-details .dialog").show();
    });

    // show confirm popup khi ấn x
    $(" .employee-details .dialog .container .close-button").click(function (e) {
        e.preventDefault();
        popupConfirmQuit.showPopup(() => closeDialog())
    });
    // show confirm popup khi ấn Hủy
    $(" .employee-details .content-action a").click(function (e) {
        e.preventDefault();
        popupConfirmQuit.showPopup(() => closeDialog())

    })

    // active navbar item khi người dùng ấn vào
    $(".nav-item").on("click", function (e) {
        $(".nav-item").removeClass("active");
        $(this).toggleClass("active");
    });

    // doubclick vao row để mở dialog chi tiết nhân viên và lấy data từ api binding vào dialog
    $(".grid table").on("dblclick", "tbody tr", function () {
        $(".employee-details .dialog").show();
        $("input").removeClass("border-red")
        $("#btnSave").attr("type", "PUT");
        const id = $(this).find("td[fieldName='id']").html();
        $("#txtEmployeeId").val(id);

        $.ajax({
            type: "GET",
            url: `http://cukcuk.manhnv.net/v1/Employees/${id}`,
        }).done((res) => {
            $("#txtEmployeeCode").val(res["EmployeeCode"]);
            $("#txtDateOfBirth").val(new Date(res["DateOfBirth"]).toISOString().substr(0, 10));
            $("#txtIdentityNumber").val(res["IdentityNumber"]);
            $("#txtIdentityPlace").val(res["IdentityPlace"]);
            $("#txtFullName").val(res["FullName"]);
            $("#txtEmail").val(res["Email"]);
            $("#txtPhoneNumber").val(res["PhoneNumber"]);
            $("#txtGenderName").val(res["GenderName"]);
            $("#txtIdentityDate").val(new Date(res["IdentityDate"]).toISOString().substr(0, 10));
            $("#txtPersonalTaxCode").val(res["PersonalTaxCode"]);
            $("#txtSalary").val(res["Salary"]);
        }).fail(error => {
            console.error(error);
        });
    })

    // nhập input thì mới xuất hiện clear button
    // $(".content .filter-bar .search-input input").keyup(function (e) {
    //     if ($(this).val()) {
    //         $(this).parent().find(".clear-text-button").show()
    //     } else {
    //         $(this).parent().find(".clear-text-button").hide()
    //     }
    // });

    // click clear button thì xóa text trong input
    // $(".content .filter-bar .search-input .clear-text-button").click(function (e) {
    //     $(this).parent().find("input").val("")
    //     $(this).hide();
    // });

    // click lưu để kiếm tra validate và post data lên server
    // $("#btnSave").click(function () {
    //     $("input[required], input[type='email']").each(function () {
    //         $(this).trigger("blur");
    //     });

    //     var inputValidates = $("input[validate=false]");
    //     if (inputValidates && inputValidates.length > 0) {
    //         alert("bạn cần nhập đúng và đủ thông tin!");
    //         $(inputValidates[0]).focus();
    //         return;
    //     }
    //     const request = {};
    //     $(".employee-details .dialog, input, select").each(function () {
    //         const id = $(this).attr("id");
    //         if (id) {
    //             Object.assign(request, { [`${id.substr(3)}`]: $(this).val() })
    //         }
    //     });

    //     popupConfirmSave.showPopup(() => {
    //         new EmployeeJS().update(request);
    //         closeDialog();
    //     });


    // })

}


/**
 *  class hành động thêm sửa xóa cho page employee
 *  created by: Vũ Long Vũ 6/7/2021
 */
class EmployeeJS extends BaseJS {
    constructor() {
        super();
        this.setUrl("http://cukcuk.manhnv.net/v1/Employees");
    }
    /**
    *  update thông tin nhân viên
    * @param {object} : dữ liệu muốn update
    *  created by: Vũ Long Vũ 8/7/2021
    */
    update(request) {
        const me = this;
        const method = $("#btnSave").attr("type");
        const id = $("#txtEmployeeId").val();
        $.ajax({
            type: method,
            url: `http://cukcuk.manhnv.net/v1/Employees/${id}`,
            contentType: "application/json-patch+json",
            data: JSON.stringify(request),

        }).done((res) => {
            me.loadData();
        }).fail(error => {
            console.error(error);
        });
    }

}

/**
 *  Đóng dialog chi tiết nhân viên
 *  created by: Vũ Long Vũ 6/7/2021
 */
function closeDialog() {
    $(".employee-details .dialog").hide();
    // xóa giá trị có trong input và value của dialog
    $(".employee-details .dialog input, select").each(function () {
        $(this).val("");
    });
    $("#btnSave").attr("type", "");
}


