<template>
    <div id="toast-message">
        <ToastItem
            v-for="(toast, index) in toasts"
            :key="index"
            :toast="toast"
            @removeToast="removeToast"
        />
    </div>
</template>

<script>
import ToastItem from "./ToastItem.vue";
export default {
    name: "ToastMessage",
    components: { ToastItem },
    props: {
        newToast: {
            type: Object
        }
    },

    data() {
        return {
            durationAnimation: {},
            toasts: [],
            countToastRemoved: 0
        };
    },

    destroyed() {
        this.toasts = [];
    },

    watch: {
        newToast: {
            handler(value) {
                this.toasts = [
                    ...this.toasts,
                    value
                ];
            },
            deep: true
        },

        countToastRemoved(count) {
            if (count === this.toasts.length) {
                this.toasts = [];
                this.countToastRemoved = 0;
            }
        }
    },

    methods: {
        removeToast() {
            this.countToastRemoved++;
        }
    }
};
</script>

<style scoped>
#toast-message {
    right: 20px;
    top: 20px;
    z-index: 99999;
    position: fixed;
}
</style>
