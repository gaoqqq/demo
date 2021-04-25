<template>
    <div>
        <div class="cond-header">
            <span class="verticalBar"></span>张三 <span class="cond-i green">未失联</span>
            <el-row class="litigRow">
                <el-col :span="3">信用卡消费</el-col>
                <el-col :span="5">合同号：SW201312321423443</el-col>
                <el-col :span="4">已拖欠：<span>132442.00元</span></el-col>
                <el-col :span="3">已预期：<span>190天</span></el-col>
                <el-col :span="5">证号：1427331992****3424</el-col>
            </el-row>
        </div>
        <div class="asp-tabs"> 
            <el-tabs v-model="activeName">
                <el-tab-pane label="基本信息" name="first"></el-tab-pane>
                <el-tab-pane label="电催记录" name="second"></el-tab-pane>
                <el-tab-pane label="外访管理" name="third"></el-tab-pane>
                <el-tab-pane label="诉讼记录" name="four"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="cond-body" :style="height">
        </div>
    </div>
</template>
<script>
import { fetchData } from '../../api/index';
export default {
    name: 'caseDetails',
    data() {
        return {
            activeName: 'first',
            height: '',
        }
    },
    created() {
        this.height = 'minHeight:'+(this.$store.state.documentClientHeight-185)+'px';
    },
    mounted() {
        // this.getList(this.$route.params.index);
    },
    methods: {
        getList(id) {
            fetchData({}).then(res => {
                // console.log(res);
                this.collectForm = res.list[id];
            })
        },
    }
}
</script>
<style scoped>
.cond-header{
    background: #fff;
    /* height: 50px; */
    line-height: 40px;
    font-size: 18px;
    font-weight: 550;
    padding-left: 20px;
    margin-bottom: 10px;
}
.cond-header .verticalBar{
    display: inline-block;
    width: 2px;
    height: 20px;
    background: #3697FB;
    vertical-align: -3px;
    margin-right: 10px;
}
.cond-body{
    box-sizing: border-box;
    background: #fff;
    padding: 0 35px;
    padding-top: 30px;
}
.asp-tabs{
    background: #fff;
    padding: 3px;
    padding-left: 35px;
    margin-bottom: 10px;
}
.formFooter{
    text-align:center;
    padding: 20px 0;
}
.litigRow{
    margin-left: 15px;
    font-size: 14px;
}
.litigRow span{
    color: #ff0000;
    font-size: 18px;
}
.green {
    color: #43C172;
}
.cond-i{
    font-size: 14px;
    margin-left: 5px;
}
</style>
<style>
.asp-tabs .el-tabs__header{
    margin: 0;
}
</style>