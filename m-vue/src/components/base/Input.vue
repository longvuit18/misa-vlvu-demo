<template>
    <div class="form-item">
        <label v-if="label">{{label}}{{" "}}<span v-if="required">(<span style="color: red;">*</span>)</span></label>
        <div class="box-input">
            <input
                :required="required"
                :class="{'start-icon': searchIcon, 'full-width': fullWidth, 'border-red': error, 'enter-text-right-to-left': format ==='currency'}"
                v-bind="$attrs"
                :tabindex="tabindex"
                :value="valueFormat"
                v-on:input="updateValue($event)"
                @blur="onBlur"
                ref="BaseInput"
                @keypress="keyPress"
            >
            <div
                v-if="format==='currency'"
                class="currency"
            >
                (VNĐ)
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BaseInput",
    props: {
        searchIcon: {
            type: Boolean,
            default: false
        },

        fullWidth: {
            type: Boolean,
            default: false
        },

        format: {
            type: String,
            default: ""
        },

        required: {
            type: Boolean,
            default: false
        },
        label: String,
        tabindex: String,
        value: {
            type: String
        },

        messageError: {
            type: String,
            default: ""
        }

    },
    data() {
        return {
            error: false
        };
    },

    computed: {
        valueFormat() {
            return this.format === "currency" ? this.formatNumber(this.value) : this.value;
        }
    },
    methods: {
        updateValue: function (event) {
            let value = event.target.value;
            if (this.format === "currency") {
                value = this.formatNumber(value);
                this.$emit("input", value);
                return;
            }
            this.$emit("input", value);
        },
        onBlur(e) {
            if (e.currentTarget.value === "" && this.required) {
                this.error = true;
            } else {
                this.error = false;
            }

            // validate email
            if (e.currentTarget.type === "email") {
                if (!this.validateEmail(e.currentTarget.value)) {
                    this.error = true;
                } else {
                    this.error = false;
                }
            }

            // validate phone number
            if (this.format === "phoneNumber") {
                if (!this.validatePhoneNumber(e.currentTarget.value)) {
                    this.error = true;
                } else {
                    this.error = false;
                }
            }
        },

        keyPress(event) {
            event = (event) || window.event;
            if (this.format === "currency" || this.format === "number" || this.format === "phoneNumber") {
                var charCode = (event.which) ? event.which : event.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    event.preventDefault();
                } else {
                    return true;
                }
            }
        },

        validateEmail(email) {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(email);
        },

        validatePhoneNumber(phoneNumber) {
            if (phoneNumber.length < 10) {
                return false;
            }
            return true;
        },

        formatNumber(str) {
            return Intl.NumberFormat().format(Number(str?.replaceAll(".", "")?.replaceAll(",", "")) || 0).toString();
        }
    }
};
</script>

<style scoped>
input,
select {
    border-radius: 4px;
    border: 1px solid #bbb;
    outline: none;
    height: 40px;
    padding: 0;
    padding-left: 16px;
    display: inline-block;
    box-sizing: border-box;
}

input:focus,
select:focus {
    border: 1px solid #019160;
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
    font-size: 11px;
    color: #bbb;
}

.start-icon {
    background-image: url("../../assets/icon/search.png");
    background-size: 16px 16px;
    background-position: 16px;
    background-repeat: no-repeat;
    padding-left: 40px;
}
.full-width {
    width: 100% !important;
}

.border-red {
    border: 1px solid red;
}

.box-input {
    position: relative;
}
.currency {
    position: absolute;
    top: 0px;
    line-height: 40px;
    right: 10px;
    color: #454545;
    font-style: oblique;
}

.enter-text-right-to-left {
    text-align: right;
    padding-right: 50px;
}
</style>
