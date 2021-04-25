<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    created() {
    },
    mounted() {
        this.resetDocumentClientHeight()
        window.onresize = () => {
            this.resetDocumentClientHeight()
        }
    },
    methods: {
        // 重置窗口可视高度
        resetDocumentClientHeight() {
            var clientHeight = document.body.clientHeight;
            this.$store.commit('resizeHeight',clientHeight)
        },
    }
}
</script>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /* 深色主题 */
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>