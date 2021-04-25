<template>
    <div>
        <div class="cond-header">
            <span class="verticalBar"></span>张三 <span class="cond-i red">已起诉未判决</span>
            <el-row class="litigRow">
                <el-col :span="5">合同号：SW201312321423443</el-col>
                <el-col :span="6">合同起止日期：2019/3/20-2021/9/20</el-col>
                <el-col :span="4">已拖欠：<span>132442.00</span></el-col>
                <el-col :span="4">已预期：<span>190天</span></el-col>
                <el-col :span="5">证号：1427331992****3424</el-col>
            </el-row>
        </div>
        <div class="cond-body" :style="height">
            <div class="lit-title">诉讼记录 <span class="lit-span" @click="addLitig">录入诉讼过程</span> </div>
            <el-row class="lit-tabHeader g-row">
                <el-col :span="4">立案：2021年4月21日</el-col>
                <el-col :span="12">&nbsp;</el-col>
                <el-col :span="4">录入时间：2021年4月21日  21:44:04</el-col>
                <el-col :span="4" class="handle"><span class="green" @click="detaRow">查看</span><span class="blue" @click="detaRow">编辑</span><span class="red">删除</span></el-col>
            </el-row>
            <el-row class="g-row">
                <el-col :span="4"><span class="g-span">诉讼进程：</span>二审</el-col>
                <el-col :span="6"><span class="g-span">立案法院：</span>哈尔滨市人民法院</el-col>
                <el-col :span="6"><span class="g-span">立案案号：</span>(2020)哈刑初字第2号</el-col>
            </el-row>
            <el-row class="lit-tabHeader g-row">
                <el-col :span="4">立案：2021年4月21日</el-col>
                <el-col :span="12">&nbsp;</el-col>
                <el-col :span="4">录入时间：2021年4月21日  21:44:04</el-col>
                <el-col :span="4" class="handle"><span class="green" @click="detaRow">查看</span><span class="blue" @click="detaRow">编辑</span><span class="red">删除</span></el-col>
            </el-row>
            <el-row class="g-row">
                <el-col :span="4"><span class="g-span">诉讼进程：</span>一审</el-col>
                <el-col :span="6"><span class="g-span">立案法院：</span>哈尔滨市人民法院</el-col>
                <el-col :span="6"><span class="g-span">立案案号：</span>(2020)哈刑初字第2号</el-col>
            </el-row>
        </div>
        <el-dialog title="诉讼过程详情" :visible.sync="editVisible" width="35%" top="3%">
            <el-form ref="form" :model="litigForm" label-width="80px" label-position="left">
                <el-row><el-col :span="20"><el-form-item label="诉讼进程"><el-input v-model="litigForm.process" placeholder="请输入诉讼进程"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="20"><el-form-item label="诉讼环节"><el-input v-model="litigForm.link" placeholder="请输入诉讼环节"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="20"><el-form-item label="诉讼法院"><el-input v-model="litigForm.court" placeholder="请输入诉讼法院"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="20"><el-form-item label="录入时间"><el-input v-model="litigForm.entry" placeholder="请输入录入时间"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="20">
                    <el-form-item label="录入时间">
                        <el-table
                            :data="fileList"
                            class="table"
                            ref="multipleTable"
                            header-cell-class-name="table-header"
                        >   
                            <el-table-column prop="a" width="120" label="文档类型" align="center"></el-table-column>
                            <el-table-column label="文件名称" align="center">
                                <template slot-scope="scope"><span class="userName">{{scope.row.b}}</span></template>
                            </el-table-column>
                            <el-table-column label="操作" width="100" align="center">
                                <template>
                                    <el-button type="text">下载</el-button>
                                    <el-button type="text" class="red">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col></el-row>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { fetchData } from '../../api/index';
export default {
    name: 'litigInfoDetail',
    data() {
        return {
            height: '',
            litigForm: {
                process: '',
                link: '',
                court: '',
                entry: '',
            },
            editVisible: false,
            fileList: [{a:'开庭公告',b:'张三开庭公告.pdf'}],
        }
    },
    created() {
        this.height = 'minHeight:'+(this.$store.state.documentClientHeight-220)+'px';
    },
    mounted() {
        if (this.$route.fullPath == '/litigInfoDetail') {
            this.getList(this.$route.params.index);
        }
    },
    methods: {
        addLitig() {
            this.$router.push({
                path: '/addLitig'
            })
        },
        detaRow() {
            this.editVisible = true;
        },
        getList(id) {
            fetchData({}).then(res => {
                // console.log(res);
                this.litigForm = res.list[id];
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
.blue {
    color: #3697FB;
}
.green {
    color: #43C172;
}
.red {
    color: #ED4848;
}
.cond-i{
    font-size: 14px;
    margin-left: 5px;
}
.litigRow{
    margin-left: 15px;
    font-size: 14px;
}
.litigRow span{
    color: #ff0000;
    font-size: 18px;
}
.lit-title{
    font-size: 18px;
    font-weight: 550;
    margin-bottom: 10px;
}
.lit-span{
    float: right;
    font-size: 12px;
    color: #3697FB;
    cursor: pointer;
}
.g-row{
    line-height: 40px;
}
.lit-tabHeader{
    background: #EDF5FD;
}
.handle span{
    margin-right: 10px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
}
.g-span{
    font-weight: 500;
}
</style>
<style>
.g-row .el-col{
    text-align: center;
    font-size: 14px;
    font-weight: 550;
}
</style>