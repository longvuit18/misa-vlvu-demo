<template>
    <div
        class="toast-message"
        :style="durationAnimation"
        v-if="currentToast"
    >
        <div
            class="toast-icon"
            :class="setColor(currentToast)"
        >
            <font-awesome-icon
                v-if="currentToast.type === 'success'"
                icon="check-circle"
            />
            <font-awesome-icon
                v-if="currentToast.type === 'warning'"
                icon="info-circle"
            />
            <font-awesome-icon
                v-if="currentToast.type === 'info'"
                icon="info-circle"
            />
            <font-awesome-icon
                v-if="currentToast.type === 'error'"
                icon="exclamation-triangle"
            />
        </div>
        <div class="toast-content">{{currentToast.content}}</div>
        <div
            class="toast-close"
            :class="setColor(currentToast)"
            @click="onClose"
        >
            <font-awesome-icon icon="times" />
        </div>
    </div>
</template>

<script>
import { DURATION_TOAST_MESSAGE } from "../../../constants";
export default {

    name: "ToastItem",
    props: {
        toast: {
            type: Object
        }
    },

    data() {
        return {
            durationAnimation: {},
            currentToast: this.toast,
            setTimeoutId: null
        };
    },
    created() {
        this.currentToast = this.toast;
        this.setTimeoutId = setTimeout(() => {
            this.currentToast = null;
            this.$emit("removeToast");
        }, this.toast?.duration || DURATION_TOAST_MESSAGE);
        // set thời gian delay cho toast -0.5s là do thời gian animation fadeOut mất 0.5s
        this.durationAnimation = {
            animation: `slideInLeft ease 0.3s, fadeOut linear 0.5s ${((this.toast?.duration || DURATION_TOAST_MESSAGE - 500) / 1000).toFixed(2)}s forwards`
        };
    },

    methods: {
        setColor(toast) {
            switch (toast.type) {
                case "error":
                    return "toast--error";
                case "info":
                    return "toast--info";
                case "warning":
                    return "toast--warning";
                case "success":
                    return "toast--success";
                default:
                    return "toast--info";
            }
        },

        onClose() {
            this.currentToast = null;
            this.$emit("removeToast");
            clearTimeout(this.setTimeoutId);
        }
    }
};
</script>

<style scoped>
.toast-message {
    min-width: 250px;
    height: 48px;
    font-size: 13px;
    background-color: #fff;
    color: #000;
    border-radius: 4px;

    display: flex;
    align-items: center;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
    padding-left: 12px;
    margin-bottom: 20px;
    position: relative;

    justify-content: space-between;
}

.toast-message .toast-close {
    font-size: 26px;
    margin-right: 10px;
    cursor: pointer;
}

.toast-message .toast-icon {
    margin-right: 10px;
    font-size: 24px;
}

.toast-message .toast-content {
    width: 250px;
}

.toast--error {
    color: #f65454;
}
.toast--info {
    color: blue;
}
.toast--warning {
    color: yellow;
}
.toast--success {
    color: #019160;
}
</style>
