<template>
    <BaseDialog :isOpen="open">
        <div class="popup">
            <div class="popup-header">
                <div class="title">{{title}}</div>
                <div
                    class="close-button"
                    @click="closePopup"
                >&times;</div>
            </div>
            <div class="popup-content">
                <div class="content-icon">
                    <font-awesome-icon icon="exclamation-triangle" />
                </div>
                <div class="content-text">
                    {{content}}
                </div>
            </div>
            <div class="popup-action">
                <a
                    v-if="secondaryButtonName"
                    @click="closePopup"
                >{{secondaryButtonName}}</a>
                <BaseButton
                    :buttonName="primaryButtonName"
                    @click="primaryButtonClick"
                    :colorRed="primaryButtonColor === 'red'"
                />
            </div>
        </div>
    </BaseDialog>
</template>

<script>

export default {
    name: "BasePopup",
    props: {
        title: {
            type: String,
            default: () => ""
        },
        content: {
            type: String,
            default: () => ""
        },
        open: {
            type: Boolean,
            default: () => false,
            required: true
        },
        primaryButtonName: {
            type: String,
            default: () => ""
        },

        primaryButtonColor: {
            type: String,
            default: () => ""
        },
        secondaryButtonName: {
            type: String,
            default: () => ""
        }
    },

    methods: {
        closePopup() {
            this.$emit("onClose");
        },
        primaryButtonClick() {
            this.$emit("onConfirm");
        }
    }

};
</script>

<style scoped>
.popup {
    background-color: #fff;
    width: 450px;
    border-radius: 4px;
}

.popup .popup-header {
    display: flex;
    position: relative;
}

.popup .popup-header .title {
    margin: 24px;
    font-size: 15px;
    font-weight: bold;
    color: #000;
}

.popup .popup-header .close-button {
    font-size: 25px;
    padding: 2px 10px;
    position: absolute;
    right: 0;
    cursor: pointer;
}

.popup .popup-header .close-button:hover {
    background-color: #e5e5e5;
    border-radius: 0px 4px 0px 0px;
}
.popup .popup-content {
    margin: 0px 24px 24px 24px;
    display: flex;
}

.popup .popup-content .content-text {
    font-size: 13px;
}

.popup .popup-content .content-icon {
    margin-right: 16px;
}

.popup .popup-action {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 24px;
    background-color: #e9ebee;
    border-radius: 0px 0px 4px 4px;
}

.popup .popup-action a {
    height: 40px;
    padding: 0px 24px;
    margin-right: 10px;
    border-radius: 4px;
    cursor: pointer;
    line-height: 40px;
}

.popup .popup-action a:hover {
    background-color: #e5e5e5;
}
</style>
