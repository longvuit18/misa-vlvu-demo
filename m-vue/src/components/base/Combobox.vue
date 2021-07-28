<template>
    <div class="combobox">
        <div class="form-item">
            <label v-if="label">{{label}}</label>
            <div
                class="box"
                :class="{'border-red': error}"
            >
                <input
                    type="text"
                    :tabindex="tabindex"
                    @input="onChange"
                    v-model="search"
                    @keydown.down="onArrowDown"
                    @keydown.up="onArrowUp"
                    @keydown.tab="onTab"
                    @click="showOptions"
                    @keydown.enter="onEnter"
                    @blur="onBlur"
                    @focus="onFocus"
                    ref="input"
                    v-bind="$attrs"
                />
                <div
                    class="combobox-icon"
                    @click="showOptions"
                >
                    <font-awesome-icon
                        v-if="!isOpen"
                        icon="angle-down"
                    />
                    <font-awesome-icon
                        v-else
                        icon="angle-up"
                    />
                </div>
                <ul
                    id="combobox-options"
                    v-show="isOpen"
                    style="display: none;"
                    class="combobox-options"
                >
                    <li
                        v-for="(option, i) in options"
                        :key="option.value"
                        @click="setResult(option)"
                        class="combobox-result"
                        :class="{ 'is-active': result && result.text === option.text,'current-select': i === arrowCounter }"
                    >
                        {{ option.text }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

/**
 * combobox
 * CreatedBy: Vũ Long Vũ 15/7/2921
 */
export default {
    name: "BaseCombobox",
    $emit: ["result"],
    props: {
        // là 1 array object {value: string, text: string}
        items: {
            type: Array,
            required: false,
            default: () => []
        },
        label: String,
        tabindex: String,
        defaultItem: {
            type: Object,
            default: () => null
        }
    },
    data() {
        return {
            isOpen: false,
            options: this.items,
            search: this.defaultItem?.text || this.items[0]?.text,
            result: this.defaultItem || this.items[0],
            arrowCounter: -1,
            error: false
        };
    },
    watch: {
        result() {
            this.$emit("result", this.result);
        }
    },
    // Lắng nghe sự kiện click ra bên ngoài combobox
    mounted() {
        document.addEventListener("click", this.handleClickOutside);
    },
    // xóa sự kiện này khi thoát khỏi xóa component
    destroyed() {
        document.removeEventListener("click", this.handleClickOutside);
    },
    methods: {
        // khi người dùng ấn vào 1 kết quả
        setResult(option) {
            this.search = option.text;
            this.isOpen = false;
            this.result = option;

            // chắc chắn người dùng đã chọn
            this.error = false;
        },
        // lọc kết quả của options khi người dùng nhập search
        filterOptions() {
            const filters = this.items.filter((item) => {
                return item.text?.toLowerCase()?.indexOf(this.search.toLowerCase()) > -1;
            });

            if (filters.length === 0) {
                this.isOpen = false;
                this.result = null;
            } else {
                this.isOpen = true;
                this.options = filters;
            }
        },
        // khi người dùng nhập thì sẽ bắt đầu lọc
        onChange() {
            this.filterOptions();
        },

        showOptions() {
            this.error = false;
            this.arrowCounter = -1;
            this.options = this.items;
            this.isOpen = !this.isOpen;

            // focus vào input khi click vào icon
            this.$refs.input.focus();
        },

        // phương thức khi người dùng click ra bên ngoài combobox
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isOpen = false;
                this.arrowCounter = -1;
            }
        },

        // sự kiện khi người dùng ấn mũi tên xuống
        onArrowDown() {
            if (this.arrowCounter < this.options.length - 1) {
                this.arrowCounter = this.arrowCounter + 1;
            } else {
                this.arrowCounter = 0;
            }
        },
        // sự kiện khi người dùng ấn mũi tên lên
        onArrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter - 1;
            } else {
                this.arrowCounter = this.options.length - 1;
            }
        },
        // sự kiện khi người dùng ấn enter
        onEnter() {
            if (this.isOpen && this.options.length !== 0 && this.arrowCounter !== -1) {
                this.search = this.options[this.arrowCounter].text;
                this.result = this.options[this.arrowCounter];
                this.isOpen = false;
                this.arrowCounter = -1;

                // chắc chắn người dùng đã chọn
                this.error = false;
            }
        },

        onTab() {
            if (this.arrowCounter !== -1) {
                this.search = this.options[this.arrowCounter].text;
                this.result = this.options[this.arrowCounter];
                this.isOpen = false;
                this.arrowCounter = -1;

                // chắc chắn người dùng đã chọn
                this.error = false;
            } else {
                this.isOpen = false;
            }
        },

        onBlur() {
            const indexItem = this.items.findIndex(item => item.text === this.search);
            if (indexItem > -1) {
                this.result = this.items[indexItem];
                this.error = false;
            } else {
                this.error = true;
            }
            if (!this.result) {
                this.error = true;
            }
        },

        onFocus() {
            this.isOpen = true;
        }
    }
};
</script>

<style scoped>
/* Base input */

input {
    border-radius: 4px 0 0 4px;
    border: 1px solid #bbb;
    border-right: 0px;
    outline: none;
    height: 38px;
    padding: 0;
    padding-left: 16px;
    display: inline-block;
    box-sizing: border-box;
    border: none;
    width: 100%;
}
input {
    background-color: #fff;
    color: #000;
}

.form-item {
    margin-bottom: 12px;
}

label {
    color: #000;
    margin-bottom: 4px;
    font-size: 13px;
    display: block;
}

::-webkit-input-placeholder {
    /* Edge */
    padding-left: 16px;
    font-size: 11px;
    color: #bbb;
}

:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    padding-left: 16px;
    font-size: 11px;
    color: #bbb;
}

::placeholder {
    padding-left: 16px;
    font-size: 11px;
    color: #bbb;
}
/* End style baseinput */

.combobox {
    position: relative;
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer */
    -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
    -webkit-user-select: none; /* Chrome, Safari, and Opera */
    -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
}

.border-red {
    border: 1px solid red !important;
}
.box {
    display: flex;
    border-radius: 4px;
    border: 1px solid #bbb;
    position: relative;
    box-sizing: border-box;
}

.box:focus-within {
    border: 1px solid #019160;
}

.combobox-options {
    height: auto;
    overflow: auto;
    position: absolute;
    top: 42px;
    background-color: #fff;
    z-index: 1000;
    width: 100%;
    border-radius: 4px;
    padding: 3px 0;
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.19);
}

.combobox-icon {
    display: flex;
    align-items: center;
    padding: 0 12px;
    border-left: 1px solid #bbb;
    background-color: #fff;
    cursor: pointer;
    border-radius: 0 4px 4px 0;
    box-sizing: border-box;
}

.combobox-icon:hover {
    background-color: #e9ebee;
}

.combobox-result {
    list-style: none;
    text-align: left;
    padding-left: 10px;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
}

.combobox-result:hover,
.combobox-result.current-select {
    background-color: #e9ebee;
}
.combobox-result.is-active {
    background-color: #019160;
    color: white;
}
</style>
