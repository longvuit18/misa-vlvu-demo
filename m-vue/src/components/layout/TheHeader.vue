<template>
    <div id="header">
        <div class="header-left">
            <div class="logo-site">
                <div
                    class="toggle"
                    @click="clickToggle"
                >
                    <img
                        src="../../assets/img/toggle.png"
                        width="24"
                        height="24"
                        alt=""
                    >
                </div>
                <div class="logo">

                </div>
            </div>
        </div>
        <div class="header-right">
            <div class="select-restaurant">
                <select name="restaurant">
                    <option value="1">Nhà hàng biển đông</option>
                </select>
            </div>
            <div class="account">
                <div class="account-avatar"></div>
                <div class="account-name">Vũ Long Vũ</div>
                <div class="account-more"></div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "TheHeader",
    methods: {
        clickToggle() {
            this.$emit("clickToggle");
        }
    }
};
</script>

<style scoped>
#header {
    width: 100%;
    height: 60px;
    background-color: #fff;
    display: flex;
}

.header-left {
    width: 220px;
    border-right: 1px solid #e5e5e5;
    height: 100%;
    box-sizing: border-box;
}

.header-right {
    width: calc(100% - 221px);
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-right .select-restaurant {
    margin-left: 16px;
}

.header-right .account {
    margin-right: 16px;
    display: flex;
    align-items: center;
}

.header-right .account-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-image: url("../../assets/icon/avatar-default.png");
    background-size: contain;
}
.header-right .account-name {
    font-weight: bold;
    margin: 0px 16px 0px 16px;
}
.header-right .account-more {
    background-image: url("../../assets/icon/option.png");
    width: 20px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
}

#header .logo-site {
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 16px;
}

#header .logo-site .logo {
    background-image: url("../../assets/img/cukcuk-logo.png");
    background-size: contain;
    height: 30px;
    background-repeat: no-repeat;
    width: 100%;
}

#header .logo-site .toggle {
    /* width: 24px;
    height: 24px; */
    margin-right: 10px;
    /* background-image: url("../../assets/img/toggle.png");
    background-size: contain;
    background-repeat: no-repeat; */
    cursor: pointer;
    /* display: flex;
    justify-content: center; */
}

select {
    border: none;
    outline: none;
    font-size: 15px;
    font-weight: bold;
}
</style>
