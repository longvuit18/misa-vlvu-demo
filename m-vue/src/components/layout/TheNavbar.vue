<template>
    <div id="navbar">
        <div class="nav-content">
            <router-link
                class="nav-item"
                to="/dashboard"
                active-class="active"
            >
                <div class="nav-icon">
                    <img
                        src="../../assets/icon/dashboard.png"
                        width="20"
                        height="20"
                        alt=""
                    />
                </div>
                <div
                    class="nav-text"
                    v-show="!isToggle"
                >Tổng quan</div>
            </router-link>
            <router-link
                class="nav-item"
                to="/report"
                active-class="active"
            >
                <div class="nav-icon">
                    <img
                        src="../../assets/icon/report.png"
                        width="20"
                        height="20"
                        alt=""
                    />
                </div>
                <div
                    class="nav-text"
                    v-show="!isToggle"
                >Báo cáo</div>
            </router-link>
            <router-link
                class="nav-item"
                to="/buy"
                active-class="active"
            >
                <div class="nav-icon">
                    <img
                        src="../../assets/icon/document-online.png"
                        width="20"
                        height="20"
                        alt=""
                    />
                </div>
                <div
                    class="nav-text"
                    v-show="!isToggle"
                >Mua hàng</div>
            </router-link>
            <router-link
                class="nav-item"
                to="/customer"
                active-class="active"
            >
                <div class="nav-icon">
                    <img
                        src="../../assets/icon/dic-employee.png"
                        width="20"
                        height="20"
                        alt=""
                    />
                </div>
                <div
                    class="nav-text"
                    v-show="!isToggle"
                >Danh mục khách hàng</div>
            </router-link>
            <router-link
                class="nav-item"
                to="/employee"
                active-class="active"
            >
                <div class="nav-icon">
                    <img
                        src="../../assets/icon/dic-employee.png"
                        width="20"
                        height="20"
                        alt=""
                    />
                </div>
                <div
                    class="nav-text"
                    v-show="!isToggle"
                >Danh mục nhân viên</div>
            </router-link>
            <router-link
                class="nav-item"
                to="/setting"
                active-class="active"
            >
                <div class="nav-icon">
                    <img
                        src="../../assets/icon/setting.png"
                        width="20"
                        height="20"
                        alt=""
                    />
                </div>
                <div
                    class="nav-text"
                    v-show="!isToggle"
                >Cài đặt</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "TheNavbar",
    props: {
        isToggle: {
            type: Boolean,
            default: () => false
        }
    }
};
</script>

<style scoped>
#navbar {
    height: calc(100vh - 61px);
    background-color: #fff;
    /* width: 220px; */
    border-right: 1px solid #e5e5e5;
    box-sizing: border-box;
    transition: all 0.4s;
}

.nav-content {
    width: 100%;
}

#navbar .nav-item {
    display: flex;
    height: 44px;
    line-height: 44px;
    padding-left: 16px;
    text-decoration: none;
    cursor: pointer;
}

#navbar .nav-item:hover {
    background-color: #e5e5e5;
    color: #000;
    cursor: pointer;
    position: relative;
}

#navbar .nav-item .nav-icon {
    display: flex;
    align-items: center;
    margin-right: 10px;
}

#navbar .active {
    background-color: #019160;
    color: #fff;
}

#navbar .active img {
    filter: brightness(0) invert(1);
}

#navbar .active:hover {
    background-color: #019160;
    color: #fff;
}

#navbar a {
    color: #000;
}
</style>
