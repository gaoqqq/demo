<template>
    <div id="case">
        <div class="cond-header">
        <el-form ref="conditionForm" :model="conditionForm" label-width="100px">
            <el-row>
            <el-col :span="8"><el-form-item label="案件类型">
                <el-radio v-model="radio" label="1">全部案件</el-radio>
                <el-radio v-model="radio" label="2">未分案</el-radio>
                <el-radio v-model="radio" label="3">已分案</el-radio>
            </el-form-item></el-col>
            <el-col :span="6"><el-form-item label="客户名称"><el-input placeholder="请输入客户名称" class="cond-input"></el-input></el-form-item></el-col>
            <el-col :span="6"><el-form-item label="合同号"><el-input placeholder="请输入合同号" class="cond-input"></el-input></el-form-item></el-col>
            <el-col :span="4">
                <div style="float:right;margin-right:20px;">
                    <el-button type="primary" plain>查询</el-button>
                    <el-button type="info" plain>重置</el-button>
                </div>
            </el-col>
            <el-col :span="6"><el-form-item label="证件号码"><el-input placeholder="请输入证件号码" class="cond-input"></el-input></el-form-item></el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="6">
                <el-form-item label="是否失联">
                    <el-select v-model="conditionForm.name" placeholder="请选择机构状态" class="handle-select mr10">
                        <el-option key="1" label="未失联" value="未失联"></el-option>
                        <el-option key="2" label="失联" value="失联"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="8">
                <div style="float:right;margin-right:20px;">
                    <el-button type="primary">导入案件</el-button>
                    <el-button type="success">导出案件</el-button>
                    <el-button type="warning">批量分案</el-button>
                    <el-button type="danger">导入记录</el-button>
                </div>
            </el-col>
            </el-row>
        </el-form>
        </div>
        <div class="cond-body" :style="height">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="agencyNo" label="客户名称" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="合同号" align="center"></el-table-column>
                <el-table-column label="已拖欠" align="center">
                    <template slot-scope="scope"><span class="red">{{scope.row.head}}</span></template>
                </el-table-column>
                <el-table-column prop="contact" label="已预期" align="center"></el-table-column>
                <el-table-column prop="office" label="证件号" align="center"></el-table-column>
                <el-table-column label="是否失联" align="center">
                    <template>
                        <!-- <span :class="scope.row.state==='未失联'?'green':'red'">{{scope.row.state}}</span> -->
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            @click="handleDeta(scope.$index)"
                        >查看</el-button>
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
</template>
<script>
import { fetchData } from '../../api/index';
export default {
    name: 'case',
    data() {
        return {
            radio: '1',
            conditionForm: { name:'',pageIndex:1,pageSize:10 },
            tableData: [],
            pageTotal: 0,
            height: '',
        }
    },
    filters: {},
    created() {
        this.height = 'height:'+(this.$store.state.documentClientHeight-205)+'px';
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {//表格数据
            fetchData(this.conditionForm).then(res => {
                // console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        handleDeta(index) {//查看
            this.$router.push({
                name: 'caseDetails',
                params: {index: index}
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.conditionForm, 'pageIndex', val);
            this.getData();
        }
    }
}
</script>
<style scoped>
.cond-header{
    background: #fff;
    padding-top: 18px;
    padding-bottom: 1px;
    margin-bottom: 15px;
    /* padding-left: 20px; */
}
.cond-body{
    background: #fff;
}
.cond-input{
    width: 200px;
}
.butRight{
    float: right;
    margin-right: 20px;
}
.green {
    color: #43C172;
}
.gray {
    color: #808080;
}
.red {
    color: #ff0000;
}
</style>
<style>
#case .el-dialog__body{
    padding-top: 5px;
}
#case .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    margin-bottom: 13px;
}
#case .el-dialog__header{
    background: #E3ECF6;
}
</style>