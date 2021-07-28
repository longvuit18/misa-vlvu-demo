<template>
    <div
        :class="col"
        class="space"
    >
        <slot />
    </div>
</template>

<script>
export default {
    name: "BaseCol",
    props: {
        cols: {
            type: String,
            default: () => 12
        }
    },
    data() {
        return {
            col: `col-${this.cols}`
        };
    }
};
</script>

<style scoped>
.space {
    padding: 4px;
}
.col-1 {
    width: calc(100% / 12);
}
.col-2 {
    width: calc(100% / 6);
}
.col-3 {
    width: calc(100% / 4);
}
.col-4 {
    width: calc(100% / 3);
}
.col-5 {
    width: calc(100% / (12 / 5));
}
.col-6 {
    width: calc(100% / 2);
}
.col-7 {
    width: calc(100% / (12 / 7));
}
.col-8 {
    width: calc(100% / (12 / 8));
}
.col-9 {
    width: calc(100% / (12 / 9));
}
.col-10 {
    width: calc(100% / (12 / 10));
}
.col-11 {
    width: calc(100% / (12 / 11));
}

.col-12 {
    width: 100%;
}
</style>
