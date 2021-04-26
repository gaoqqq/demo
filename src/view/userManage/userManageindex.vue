<template>
    <div id="asPack">
        <div class="cond-header">
        <el-form ref="conditionForm" :model="conditionForm" label-width="100px">
            <el-row>
            <el-col :span="6"><el-form-item label="用户名称"><el-input placeholder="请输入用户名称" class="cond-input"></el-input></el-form-item></el-col>
             <el-col :span="6">
                <el-form-item label="角色">
                    <el-select v-model="conditionForm.name" placeholder="请选择角色" class="handle-select mr10">
                        <el-option key="1" label="催收人员" value="催收人员"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="团队">
                    <el-select v-model="conditionForm.name" placeholder="请选择团队" class="handle-select mr10">
                        <el-option key="1" label="中信银行" value="中信银行"></el-option>
                        <el-option key="2" label="招商银行" value="招商银行"></el-option>
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
                <el-table-column prop="agencyNo" label="用户名称" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="性别" align="center"></el-table-column>
                <el-table-column prop="head" label="角色" align="center"></el-table-column>
                <el-table-column prop="contact" label="联系方式" align="center"></el-table-column>
                <el-table-column prop="office" label="在职情况" align="center"></el-table-column>
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
        <el-dialog :title="editform.head" :visible.sync="editVisible" width="60%" top="3%">
            <el-form ref="form" :model="editform" label-width="80px" label-position="left">
                <el-row><el-col :span="20"><el-form-item label="身份证号"><span style="margin-left:1px;">{{editform.bankAccount}}</span></el-form-item></el-col></el-row>
                <el-row><el-col :span="20"><el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="editform.gender">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item></el-col></el-row>
                 <el-row><el-col :span="20"><el-form-item label="手机号码" prop="contact"><el-input v-model="editform.contact" placeholder="请输入手机号码"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="20"><el-form-item label="员工类型" prop="bankAccountName"><el-input v-model="editform.bankAccountName" placeholder="请输入员工类型"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="20"><el-form-item label="所属团队" prop="bank"><el-input v-model="editform.bank" placeholder="请输入所属团队"></el-input></el-form-item></el-col></el-row>
               <el-row><el-col :span="20"><el-form-item label="员工状态" prop="state">
                    <el-radio-group v-model="editform.state">
                        <el-radio label="启用"></el-radio>
                        <el-radio label="停用"></el-radio>
                    </el-radio-group>
                </el-form-item></el-col></el-row>
                 <el-row><el-col :span="20"><el-form-item label="在职情况" prop="job">
                    <el-radio-group v-model="editform.job">
                        <el-radio label="在职"></el-radio>
                        <el-radio label="离职"></el-radio>
                    </el-radio-group>
                </el-form-item></el-col></el-row>

                <el-row><el-col :span="20"><el-form-item label="用户名" prop="head"><el-input v-model="editform.head" placeholder="请输入用户名"></el-input></el-form-item></el-col></el-row>
               
                <el-row><el-col :span="20"><el-form-item label="角色" prop="office"><el-input v-model="editform.office" placeholder="请填角色"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="20"><el-form-item label="备注" prop="memo">
                    <el-input type="textarea" rows="4" v-model="editform.memo" placeholder="请填写机构备注"></el-input>
                </el-form-item></el-col></el-row>
            </el-form>
        </el-dialog>
    </div> 
</template>
<script>
import { fetchData } from '../../api/index';
export default {
    name: 'userManage',
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
                gender:'',
                job:''
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
                path: '/addUser'
            })
        },
        handleEdit(index) {//编辑
            this.$router.push({
                name: 'updatUser',
                params: {index: index}
            })
        },
         handleDeta(index,row) {//查看
            this.editform = {...row};
            this.editform.head = '姓名:'+this.editform.head;
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
</style>
<style>
#asPack .el-dialog__body{
    padding-top: 5px;
}
#asPack .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    margin-bottom: 13px;
}
#asPack .el-dialog__header{
    background: #E3ECF6;
}
</style>