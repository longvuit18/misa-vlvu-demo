<template>
    <button
        v-bind:class="{'secondary-button': secondaryButton}"
        v-on="$listeners"
    >
        <img
            v-if="icon"
            :src="require('../../assets/icon/'+ icon)"
            alt="start icon"
        >
        {{buttonName}}
    </button>
</template>

<script>
export default {
    name: "BaseButtonIcon",
    props: {
        buttonName: String,
        icon: String,
        secondaryButton: {
            type: Boolean,
            default: false
        }
    },

    methods: {
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
    padding: 0px 16px 0px 16px;
    display: flex;
    align-items: center;
}

button:hover {
    background-color: #e5e5e5;
    cursor: pointer;
    background-color: #2fbe8e;
}

.secondary-button {
    background-color: #fff;
    border: 1px solid #bbb;
    border-radius: 4px;
    height: 40px;
    font-size: 13px;
    color: #fff;
    padding: 0px 16px;
    text-align: center;
}

button img {
    margin-right: 8px;
}

.secondary-button:hover {
    background-color: #e9ebee;
}

.secondary-button img {
    margin: 0;
}
</style>
