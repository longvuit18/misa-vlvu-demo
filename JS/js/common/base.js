$(document).ready(function () {
    initEventBase();
});

function initEventBase() {
    /**
     * Dropdown event
     * created by: Vũ Long Vũ 6/7/2021
     */

    // click to show dropdown list
    $(".misa-dropdown").click(function (e) {
        var dropdownList = $(this).find(".dropdown-list");
        var arrowIcon = $(this).find(".arrow-icon").find("i");

        if ($(arrowIcon).hasClass("down")) {
            $(arrowIcon).removeClass("down");
            $(arrowIcon).addClass("up");
        } else {
            $(arrowIcon).removeClass("up");
            $(arrowIcon).addClass("down");
        }
        $(dropdownList).toggle();
    })


    $(".misa-dropdown .dropdown-list").on("click", ".dropdown-item", function (e) {
        // lấy misa-dropdown là root của dropdown
        var misaDropdown = $(this).parent().parent();
        var dropdownText = $(misaDropdown).find(".dropdown-text");
        // set text cho dropdown text
        $(dropdownText).text($(this).text());

        $(misaDropdown).find(".dropdown-list .dropdown-item").removeClass("selected");
        $(this).addClass("selected");

    })


    /**
     * Validate input
     * created by: Vũ Long Vũ 7/7/2021
     */

    // báo input đỏ khi chưa nhập dữ liệu
    $("input[required]").each(function () {
        $(this).blur(function () {
            if (!$(this).val()) {
                $(this).addClass("border-red");
                $(this).attr("title", "Bạn phải nhập trường này!");
                $(this).attr("validate", false);
            } else {
                $(this).removeClass("border-red");
                $(this).attr("title", "");
                $(this).attr("validate", true);
            }
        })
    })

    $('input[name="number"]').keyup(function (e) {
        if (/\D/g.test(this.value)) {
            // Filter non-digits from input value.
            this.value = this.value.replace(/\D/g, '');
        }
    });

    // check email phải đúng định dạng
    $("input[type='email']").each(function () {
        var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        $(this).blur(function () {
            if (!regex.test($(this).val())) {
                $(this).addClass("border-red");
                $(this).attr("title", "Bạn phải nhập đúng định dạng email!");
                $(this).attr("validate", false);
            } else {
                $(this).removeClass("border-red");
                $(this).attr("title", "");
                $(this).attr("validate", true);
            }
        })
    });

}

/**
 *  Tạo base để thực hiện các hành động thêm sửa xóa
 *  created by: Vũ Long Vũ 6/7/2021
 */
class BaseJS {
    constructor() {
    }

    // lấy url từ page cụ thể
    setUrl(url) {
        this.url = url;
    }

    /**
     *  Load data từ server khi đã có url
     *  created by: Vũ Long Vũ 6/7/2021
     */
    //#region load data
    loadData(fieldId) {
        $(".grid table").find("tbody").empty();
        $.ajax({
            type: "GET",
            url: this.url,
        }).done(res => {
            let tbody = $(".grid table").find("tbody");
            if ($(".grid table").find("tbody")) {
                tbody.empty();
            } else {
                tbody = $("<tbody></tbody>");
            }
            $.each(res, (index, item) => {
                const tr = $("<tr></tr>");
                $(tr).data("id", item[fieldId]);
                $(".grid table thead th").each((_i, th) => {
                    const fieldName = $(th).attr("fieldName");
                    const formatType = $(th).attr("formatType");
                    let data = item[fieldName] || "";
                    let style = "";

                    switch (formatType) {
                        case "date":
                            data = formatDate(data);
                            style = "text-align: center;"
                            break;
                        case "currency":
                            data = data ? Intl.NumberFormat("vn-VN").format(Number(data)).replace(".", ",") : "";
                            style = "text-align: right;"
                            break;
                        default:
                            break;
                    }
                    const td = `<td style="${style}">${data}</td>`;
                    $(tr).append(td);

                })
                $(tbody).append(tr);
            })

            $(".grid table").append(tbody);
        });


    }
    //#endregion
}

function formatDate(date) {
    if (!date) {
        return "";
    }

    let day = new Date(date).getDate();
    let month = new Date(date).getMonth() + 1;
    let year = new Date(date).getFullYear();

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    return day + "/" + month + "/" + year;

}