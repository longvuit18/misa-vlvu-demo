<template>
    <div class="loader"></div>
</template>

<script>
export default {
    name: "Spin"
};
</script>

<style>
.loader {
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid #019160;
    width: 40px;
    height: 40px;
    -webkit-animation: spin 1s linear infinite; /* Safari */
    animation: spin 1s linear infinite;
}
</style>
