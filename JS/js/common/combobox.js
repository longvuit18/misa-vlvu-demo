$(document).ready(function () {

    // vị trí con trỏ di chuyển trên item
    let currentFocus = -1;
    // data dữ liệu của của combobox
    var data = [
        { value: 0, text: "Nữ" },
        { value: 1, text: "Nam" },
        { value: 2, text: "Khác" },
    ]
    // binding data vào combobox
    let comboboxList = $(".combobox-list");
    comboboxList.empty();
    data.forEach(d => {
        const item = `<div class="combobox-item">${d.text}</div>`;
        $(item).data("value", d.value);
        comboboxList.append(item);
    })

    // click button arrow down để focus vào input
    $(".combobox-button").click(function () {
        $(".combobox-list").toggle();
        $(this).parent().find("input").focus();

        // reset lại list item người dùng có thể xem được tất cả item
        $(this).parent().find(".combobox-list .combobox-item").removeClass("hide-item");
        currentFocus = -1;
    });

    // click vào item để chọn 
    $(".m-combobox").on("click", ".combobox-item", function () {
        $(this).parent().find(".combobox-item").removeClass("selected");
        var input = $(this).parent().parent().find("input");
        input.val($(this).text());
        input.focus();
        input.data("value", $(this).data("value"));
        $(".combobox-list").hide();
        $(this).addClass("selected");
    });

    // khi người dùng nhập dữ liệu từ input vào
    $(".m-combobox input").keyup(function (e) {
        const filterText = $(this).val();
        const comboboxItems = $(this).parent().find(".combobox-item");
        $(this).parent().find(".combobox-list").show();
        comboboxItems.each(function (_i, value) {
            if ($(value).text().toLowerCase().indexOf(filterText.toLowerCase()) > -1) {
                $(value).removeClass("hide-item");
            } else {
                $(value).addClass("hide-item");
            }

        })
        let filterItems = comboboxItems.filter((i, v) => {
            return !$(v).hasClass("hide-item")
        });
        // sự kiện khi người dùng ấn nút mũi tên xuống
        if (e.keyCode === 40) {
            currentFocus++;
            filterItems.removeClass("autocomplete-active");
            if (currentFocus >= filterItems.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = filterItems.length - 1;

            $(filterItems[currentFocus]).addClass("autocomplete-active");
            // sự kiện khi người dùng nhấn mũi tên lên
        } else if (e.keyCode === 38) {
            currentFocus--;
            let filterItems = comboboxItems.filter((i, v) => {
                return !$(v).hasClass("hide-item")
            });
            filterItems.removeClass("autocomplete-active");
            if (currentFocus >= filterItems.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = filterItems.length - 1;

            $(filterItems[currentFocus]).addClass("autocomplete-active");
        }
        // khi người dùng ấn enter
        if (e.keyCode === 13) {
            $(filterItems[currentFocus]).click();
            currentFocus = -1;
        }


    });

    // validate dữ liệu nhập vào
    $(".m-combobox input").blur(function () {
        $(this).parent().find(".combobox-button").removeClass("border-focus");
        if (data.findIndex(item => item.text === $(this).val()) === -1) {
            $(this).addClass("border-red");
            $(this).parent().find(".combobox-button").addClass("border-red");
        } else {
            $(this).removeClass("border-red");
            $(this).parent().find(".combobox-button").removeClass("border-red");

        }
    })
});