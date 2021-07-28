<template>
    <div>
        <TheHeader @clickToggle="clickToggle" />
        <div id="content">
            <TheNavbar
                :style="'width:' + widthNavbar + 'px'"
                :isToggle="isToggle"
            />
            <router-view :style="width" />
        </div>

        <ToastMessage :newToast="$store.state.toastMessage.toast" />
    </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheNavbar from "./components/layout/TheNavbar.vue";

const widthNavbar = 220; // giá trị width ban đầu của navbar
export default {
    components: {
        TheHeader,
        TheNavbar
    },

    data() {
        return {
            widthNavbar: widthNavbar,
            isToggle: false
        };
    },

    computed: {
        width() {
            return `width: calc(100% - ${this.widthNavbar + 1}px)`; // 1px là của border
        }
    },

    methods: {
        clickToggle() {
            if (this.widthNavbar === widthNavbar) {
                this.widthNavbar = 52;
                setTimeout(() => {
                    this.isToggle = true;
                }, 100);

                return;
            }
            this.widthNavbar = widthNavbar;
            setTimeout(() => {
                this.isToggle = false;
            }, 200);
        }
    }

};
</script>
<style lang="css" src="./css/common/common.css"></style>
<style lang="css">
#content {
    display: flex;
    justify-content: space-between;
}
</style>
