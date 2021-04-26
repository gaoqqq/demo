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
        <div class="cond-body" v-if="activeName == 'first'" :style="height">
            <el-radio-group v-model="infoTabs" style="margin-bottom: 10px;">
                <el-radio-button label="info">客户基本信息</el-radio-button>
                <el-radio-button label="contract">合同信息</el-radio-button>
                <el-radio-button label="ious">借据信息</el-radio-button>
                <el-radio-button label="commun">通讯方式</el-radio-button>
                <el-radio-button label="address">联系地址</el-radio-button>
            </el-radio-group>
            <div v-show="infoTabs == 'ious'" class="handClass"><span>贷款本息明细清单</span><span class="gang"></span><span>导出借据数据</span></div>
            <div v-show="infoTabs == 'commun'" class="handClass"><span>新建通讯方式</span></div>
            <div v-show="infoTabs == 'address'" class="handClass"><span>新建联系地址</span></div>
            <div v-show="infoTabs == 'info'">
                <el-row class="caseRow"><el-col :span="6">客户名称</el-col><el-col :span="6">张三</el-col><el-col :span="6">婚姻状况</el-col><el-col :span="6">未婚</el-col></el-row>
                <el-row class="caseRow"><el-col :span="6">证件号码</el-col><el-col :span="6">14273319942142445</el-col><el-col :span="6">联系方式</el-col><el-col :span="6">1322323434</el-col></el-row>
                <el-row class="caseRow"><el-col :span="6">性别</el-col><el-col :span="6">男</el-col><el-col :span="6">是否失联</el-col><el-col :span="6">未失联</el-col></el-row>
                <el-row class="caseRow" style="border-bottom:.5px solid #E3ECF6;"><el-col :span="6">民族</el-col><el-col :span="6">汉</el-col><el-col :span="6">所在公司</el-col><el-col :span="6">沈阳金瀚资产管理有限公司</el-col></el-row>
            </div>
            <div v-show="infoTabs == 'contract'">
                <el-row class="caseRow"><el-col :span="6">合同号</el-col><el-col :span="6">SW201312321423443</el-col><el-col :span="6">业务类型</el-col><el-col :span="6">信用卡消费</el-col></el-row>
                <el-row class="caseRow"><el-col :span="6">合同状态</el-col><el-col :span="6">SW201312321423443</el-col><el-col :span="6">出账日期</el-col><el-col :span="6">2019/10/21</el-col></el-row>
                <el-row class="caseRow"><el-col :span="6">授信到期日期</el-col><el-col :span="6">2019/5/20</el-col><el-col :span="6">渠道</el-col><el-col :span="6">网点</el-col></el-row>
                <el-row class="caseRow"><el-col :span="6">授信额度</el-col><el-col :span="6">230000</el-col><el-col :span="6">出账类型</el-col><el-col :span="6">授信额度下单笔消费</el-col></el-row>
                <el-row class="caseRow"><el-col :span="6">贷款用途</el-col><el-col :span="6">个人消费</el-col><el-col :span="6">贷款期限</el-col><el-col :span="6">24个月</el-col></el-row>
                <el-row class="caseRow" style="border-bottom:.5px solid #E3ECF6;"><el-col :span="6">担保方式</el-col><el-col :span="6">-</el-col><el-col :span="6">出账机构</el-col><el-col :span="6">沈阳市葫芦岛银行</el-col></el-row>
            </div>
            <div v-show="infoTabs == 'ious'">
                <el-table
                    :data="iousTable"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                >  
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column prop="agencyNo" label="借据号" align="center"></el-table-column>
                    <el-table-column prop="agencyName" label="借款人" align="center"></el-table-column>
                    <el-table-column prop="agencyName" label="业务类型" align="center"></el-table-column>
                    <el-table-column prop="agencyName" label="贷款币种" align="center"></el-table-column>
                    <el-table-column prop="agencyName" label="贷款状态" align="center"></el-table-column>
                    <el-table-column prop="agencyName" label="贷款起止日" align="center"></el-table-column>
                    <el-table-column prop="agencyName" label="开始逾期日期" align="center"></el-table-column>
                    <el-table-column prop="agencyName" label="逾期期数" align="center"></el-table-column>
                    <el-table-column prop="agencyName" label="逾期天数" align="center"></el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="conditionForm.pageIndex"
                        :page-size="conditionForm.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                    ></el-pagination>
                </div>
            </div>
            <div v-show="infoTabs == 'commun'">
                <el-table
                    :data="iousTable"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                >
                    <el-table-column prop="agencyNo" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="agencyName" label="当事人关系" align="center"></el-table-column>
                    <el-table-column prop="agencyName" label="号码" align="center"></el-table-column>
                    <el-table-column prop="agencyName" label="拨打次数" align="center"></el-table-column>
                    <el-table-column prop="agencyName" label="录入人" align="center"></el-table-column>
                    <el-table-column prop="agencyName" label="录入时间" align="center"></el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template>
                            <el-button
                                type="text"
                            >编辑</el-button>
                            <el-button
                                type="text"
                                class="red"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="conditionForm.pageIndex"
                        :page-size="conditionForm.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                    ></el-pagination>
                </div>
            </div>
            <div v-show="infoTabs == 'address'">
                <el-table
                    :data="iousTable"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                >
                    <el-table-column prop="agencyNo" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="agencyName" label="当事人关系" align="center"></el-table-column>
                    <el-table-column prop="agencyName" label="地址" align="center"></el-table-column>
                    <el-table-column prop="agencyName" label="录入人" align="center"></el-table-column>
                    <el-table-column prop="agencyName" label="录入时间" align="center"></el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template>
                            <el-button
                                type="text"
                            >编辑</el-button>
                            <el-button
                                type="text"
                                class="red"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="conditionForm.pageIndex"
                        :page-size="conditionForm.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                    ></el-pagination>
                </div>
            </div>
        </div>
        <div class="cond-body" v-if="activeName == 'second'" :style="height">
            <div class="di-title">新建电催记录</div>
            <el-table
                :data="iousTable"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="agencyNo" label="呼出时间" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="呼出对象" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="当事人关系" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="呼出号码" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="催收结果" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="通话记录" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="录入人" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="录入时间" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template>
                        <el-button
                            type="text"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            class="red"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="conditionForm.pageIndex"
                    :page-size="conditionForm.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <div class="cond-body" v-if="activeName == 'third'" :style="height">
            <div class="di-title">新建外访记录</div>
            <el-table
                :data="iousTable"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="agencyNo" label="外访时间" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="外访对象" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="外访地址" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="外访结果" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="外访记录" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="录入人" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="录入时间" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template>
                        <el-button
                            type="text"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            class="red"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="conditionForm.pageIndex"
                    :page-size="conditionForm.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <div class="cond-body" v-if="activeName == 'four'" :style="height">
            <div class="di-title">新建诉讼记录</div>
            <el-row class="lit-tabHeader g-row">
                <el-col :span="4">立案：2021年4月21日</el-col>
                <el-col :span="12">&nbsp;</el-col>
                <el-col :span="6">录入时间：2021年4月21日  21:44:04</el-col>
                <el-col :span="2" class="handle"><span class="blue" @click="detaRow">编辑</span><span class="red">删除</span></el-col>
            </el-row>
            <el-row class="g-row">
                <el-col :span="4"><span class="g-span">诉讼进程：</span>二审</el-col>
                <el-col :span="6"><span class="g-span">立案法院：</span>哈尔滨市人民法院</el-col>
                <el-col :span="6"><span class="g-span">立案案号：</span>(2020)哈刑初字第2号</el-col>
            </el-row>
            <el-row class="lit-tabHeader g-row">
                <el-col :span="4">立案：2021年4月21日</el-col>
                <el-col :span="12">&nbsp;</el-col>
                <el-col :span="6">录入时间：2021年4月21日  21:44:04</el-col>
                <el-col :span="2" class="handle"><span class="blue" @click="detaRow">编辑</span><span class="red">删除</span></el-col>
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
    name: 'caseDetails',
    data() {
        return {
            activeName: 'first',
            infoTabs: 'info',
            height: '',
            conditionForm: { pageIndex:1,pageSize:10 },
            pageTotal: 0,
            iousTable: [],
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
        this.height = 'minHeight:'+(this.$store.state.documentClientHeight-270)+'px';
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList() {
            fetchData({}).then(res => {
                // console.log(res);
                this.iousTable = res.list;
                this.pageTotal = res.pageTotal || 50;
            })
        },
        handlePageChange(val) {
            this.$set(this.conditionForm, 'pageIndex', val);
            this.getList();
        },
        detaRow() {
            this.editVisible = true;
        },
    }
}
</script>
<style scoped>
.caseRow{
    border: .5px solid #E3ECF6;
    border-bottom: none;
}
.caseRow .el-col{
    line-height: 40px;
    padding-left: 20px;
    font-size: 14px;
}
.caseRow .el-col:nth-child(2n-1){
    background: #F3F9FF;
    font-weight: 550;
}
.handClass{
    float: right;
    color: #3697FB;
    font-size: 13px;
    font-weight: 550;
    margin-top: 10px;
}
.handClass span{
    margin-left: 20px;
    cursor: pointer;
}
.gang{
    display: inline-block;
    width: 1px;
    height: 10px;
    background: #3697FB;
} 
.red {
    color: #ff0000;
}
.di-title{
    text-align: right;
    cursor: pointer;
    font-size: 13px;
    font-weight: 550;
    margin: 12px 0;
    color: #3697FB;
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
.blue {
    color: #3697FB;
}
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
.el-tabs__nav-wrap::after{
    background: none;
}
.g-row .el-col{
    text-align: center;
    font-size: 14px;
    font-weight: 550;
}
</style>