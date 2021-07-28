<template>

    <div
        class="dialog"
        v-if="isOpen"
    >
        <div class="dialog-content">
            <slot />
        </div>
    </div>

</template>

<script>
export default {
    name: "BaseDialog",
    props: {
        isOpen: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
        };
    }
};
</script>

<style scoped>
.dialog {
    position: fixed;
    z-index: 101;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.dialog-content {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
