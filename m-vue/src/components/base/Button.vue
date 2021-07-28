<template>
    <button
        v-bind:class="{'fix-width': widthButton, 'secondary-button': secondaryButton, 'color-red': colorRed}"
        v-on="$listeners"
        v-bind="$attrs"
    >
        <img
            v-if="startIcon"
            :src="require('../../assets/icon/'+ startIcon)"
            alt="start icon"
        >
        {{buttonName}}
    </button>
</template>

<script>
const maxWidthButton = 3;

export default {
    name: "BaseButton",
    props: {
        buttonName: String,
        startIcon: String,
        secondaryButton: Boolean,
        colorRed: {
            type: Boolean,
            default: () => false
        }
    },

    data() {
        return {
            widthButton: this.buttonName.trim().split(" ").length < maxWidthButton
        };
    }

};
</script>

<style scoped>
button {
    background-color: #019160;
    border: none;
    color: #fff;
    height: 40px;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    padding: 0px 24px 0px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

button:hover {
    background-color: #2fbe8e;
}

.secondary-button {
    background-color: #fff;
    border: 1px solid #bbb;
    border-radius: 4px;
    height: 40px;
    font-size: 13px;
    color: #fff;
    padding: 0px 24px;
    text-align: center;
}

.secondary-button:hover {
    background-color: #e9ebee;
}

.fix-width {
    padding-left: 0;
    padding-right: 0;
    width: 100px;
}

.color-red {
    background-color: #f65454;
}

.color-red:hover {
    background-color: #f06868;
}
</style>
