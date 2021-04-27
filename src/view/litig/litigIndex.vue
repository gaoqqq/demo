<template>
    <div id="litig">
        <div class="cond-header">
        <el-form ref="conditionForm" :model="conditionForm" label-width="100px">
            <el-row>
            <el-col :span="6"><el-form-item label="客户名称"><el-input placeholder="请输入客户名称" class="cond-input"></el-input></el-form-item></el-col>
            <el-col :span="6"><el-form-item label="合同号"><el-input placeholder="请输入合同号" class="cond-input"></el-input></el-form-item></el-col>
            <el-col :span="6">
                <el-form-item label="诉讼进程">
                    <el-select v-model="conditionForm.name" placeholder="请选择诉讼进程" class="handle-select mr10">
                        <el-option key="1" label="已执行" value="已执行"></el-option>
                        <el-option key="2" label="已起诉未判决" value="已起诉未判决"></el-option>
                        <el-option key="3" label="执行中" value="执行中"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" plain>查询</el-button>
                <el-button type="info" plain>重置</el-button>
                <el-button type="primary" class="butRight">导出</el-button>
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
                @selection-change="handleSelectionChange"
            >   
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column label="客户名称" align="center">
                    <template slot-scope="scope"><span class="userName">{{scope.row.userName}}</span></template>
                </el-table-column>
                <el-table-column prop="ht" label="合同号" align="center"></el-table-column>
                <el-table-column prop="jc" label="诉讼进程" align="center"></el-table-column>
                <el-table-column prop="lah" label="立案案号" align="center"></el-table-column>
                <el-table-column prop="createTime" label="立案时间" align="center"></el-table-column>
                <el-table-column prop="fy" label="立案法院" align="center"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            class="gray"
                            @click="handleDeta(scope.$index)"
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
    </div> 
</template>
<script>
import { fetchData } from '../../api/index';
export default {
    name: 'litig',
    data() {
        return {
            conditionForm: { 
                name:'',
                pageIndex:1,
                pageSize:10 ,
                userName:'',
                ht:""
                },
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
        handleEdit(index) {//编辑
            this.$router.push({
                name: 'updataLitig',
                params: {index: index}
            })
        },
        handleDeta(index) {//查看
            this.$router.push({
                name: 'litigInfoDetail',
                params: {index: index}
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.conditionForm, 'pageIndex', val);
            this.getData();
        },
        handleSelectionChange(val) {
            console.log(val);
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
.userName{
    color: #3697FB;
}
</style>
<style>
#litig .el-dialog__body{
    padding-top: 5px;
}
#litig .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    margin-bottom: 13px;
}
#litig .el-dialog__header{
    background: #E3ECF6;
}
</style>