<template>
    <div id="bank">
        <div class="cond-header">
        <el-form ref="conditionForm" :model="conditionForm" label-width="100px">
            <el-row>
            <el-col :span="6"><el-form-item label="银行名称"><el-input placeholder="请输入银行名称" class="cond-input"></el-input></el-form-item></el-col>
            <el-col :span="6"><el-form-item label="银行负责人"><el-input placeholder="请输入银行负责人" class="cond-input"></el-input></el-form-item></el-col>
            <el-col :span="6">
                <el-form-item label="银行状态">
                    <el-select v-model="conditionForm.name" placeholder="请选择银行状态" class="handle-select mr10">
                        <el-option key="1" label="启用" value="启用"></el-option>
                        <el-option key="2" label="停用" value="停用"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" plain>查询</el-button>
                <el-button type="info" plain>重置</el-button>
                <el-button type="primary" class="butRight" @click="addCollec()">新建</el-button>
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
                <el-table-column prop="agencyNo" label="银行编号" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="银行名称" align="center"></el-table-column>
                <el-table-column prop="head" label="负责人" align="center"></el-table-column>
                <el-table-column prop="contact" label="联系方式" align="center"></el-table-column>
                <el-table-column prop="office" label="办公地点" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <span :class="scope.row.state==='启用'?'green':'red'">{{scope.row.state}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            class="gray"
                            @click="handleDeta(scope.$index, scope.row)"
                        >查看</el-button>
                        <el-button
                            type="text"
                            @click="handleEdit(scope.$index)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
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
        <el-dialog :title="editform.agencyName" :visible.sync="editVisible" width="35%" top="3%">
            <el-form ref="form" :model="editform" label-width="80px" label-position="left">
                <el-row><el-col :span="20"><el-form-item label="银行编号"><span style="margin-left:1px;">{{editform.agencyNo}}</span></el-form-item></el-col></el-row>
                <el-row><el-col :span="20"><el-form-item label="银行状态" prop="state">
                    <el-radio-group v-model="editform.state">
                        <el-radio label="停用"></el-radio>
                        <el-radio label="启用"></el-radio>
                    </el-radio-group>
                </el-form-item></el-col></el-row>
                <!-- <el-row><el-col :span="20"><el-form-item label="银行户名" prop="bankAccountName"><el-input v-model="editform.bankAccountName" placeholder="请输入银行户名"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="20"><el-form-item label="开户银行" prop="bank"><el-input v-model="editform.bank" placeholder="请输入开户行名称"></el-input></el-form-item></el-col></el-row> -->
                <el-row><el-col :span="20"><el-form-item label="银行账号" prop="bankAccount"><el-input v-model="editform.bankAccount" placeholder="请输入银行账号"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="20"><el-form-item label="负责人" prop="head"><el-input v-model="editform.head" placeholder="请输入负责人"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="20"><el-form-item label="联系方式" prop="contact"><el-input v-model="editform.contact" placeholder="请输入负责人联系方式"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="20"><el-form-item label="办公地点" prop="office"><el-input v-model="editform.office" placeholder="请填写办公地点"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="20"><el-form-item label="银行对接模板文件">
                    <div class="fileBox">
                        <div>案件导入模版名称.word</div>
                        <div>案件导入模版名称案件三.word</div>
                    </div>
                </el-form-item></el-col></el-row>
                <el-row><el-col :span="20"><el-form-item label="备注" prop="memo">
                    <el-input type="textarea" rows="4" v-model="editform.memo" placeholder="请填写银行备注"></el-input>
                </el-form-item></el-col></el-row>
            </el-form>
        </el-dialog>
    </div> 
</template>
<script>
import { fetchData } from '../../api/index';
export default {
    name: 'bank',
    data() {
        return {
            conditionForm: { name:'',pageIndex:1,pageSize:10 },
            tableData: [],
            pageTotal: 0,
            height: '',
            editVisible: false,
            editform: {
                agencyNo: '',
                agencyName: '',
                state: '',
                bankAccountName: '',
                bank: '',
                bankAccount: '',
                head: '',
                contact: '',
                office: '',
                memo: '',
            }
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
        addCollec() {//新增
            this.$router.push({
                path: '/addlBank'
            })
        },
        handleEdit(index) {//编辑
            this.$router.push({
                name: 'updatalBank',
                params: {index: index}
            })
        },
        handleDeta(index,row) {//查看
            this.editform = {...row};
            this.editform.agencyName = '银行名称:'+this.editform.agencyName;
            this.editVisible = true;
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
.fileBox{
    width: 100%;
    border: 1px solid #DBDBDB;
    border-radius: 6px;
}
</style>
<style>
#bank .el-dialog__body{
    padding-top: 5px;
}
#bank .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    margin-bottom: 13px;
}
#bank .el-dialog__header{
    background: #E3ECF6;
}
</style>