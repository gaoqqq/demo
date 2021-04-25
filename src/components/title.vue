<template>
    <div>
        <div class="cond-header">
            <span></span>{{titleText}}
        </div>
        <!-- <div class="cond-body"></div> -->
    </div>
</template>
<script>
export default {
    name: 'tTitle',
    props: {
        titleText: {
            type: String
        }
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {

    }
}
</script>
<style scoped>
.cond-header{
    background: #fff;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    font-weight: 550;
    padding-left: 20px;
    margin-bottom: 10px;
}
.cond-header span{
    display: inline-block;
    width: 2px;
    height: 20px;
    background: #3697FB;
    vertical-align: -3px;
    margin-right: 10px;
}
</style>