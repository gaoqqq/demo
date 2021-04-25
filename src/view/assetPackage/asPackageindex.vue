<template>
    <div id="asPack">
        <div class="cond-header">
        <el-form ref="conditionForm" :model="conditionForm" label-width="100px">
            <el-row>
            <el-col :span="6"><el-form-item label="资产包名称"><el-input placeholder="请输入资产包名称" class="cond-input"></el-input></el-form-item></el-col>
            <el-col :span="6"><el-form-item label="转让方名称"><el-input placeholder="请输入转让方名称" class="cond-input"></el-input></el-form-item></el-col>
            <el-col :span="6">
                <el-form-item label="资产包状态">
                    <el-select v-model="conditionForm.name" placeholder="请选择资产包状态" class="handle-select mr10">
                        <el-option key="1" label="结项" value="结项"></el-option>
                        <el-option key="2" label="进行中" value="进行中"></el-option>
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
                <el-table-column prop="agencyNo" label="资产包编号" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="转让方名称" align="center"></el-table-column>
                <el-table-column prop="head" label="转让方负责人" align="center"></el-table-column>
                <el-table-column prop="contact" label="转让方机构" align="center"></el-table-column>
                <el-table-column prop="office" label="我方负责人" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <span :class="scope.row.state==='启用'?'green':'red'">{{scope.row.state}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="提交时间" align="center"></el-table-column>

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
    </div> 
</template>
<script>
import { fetchData } from '../../api/index';
export default {
    name: 'asPack',
    data() {
        return {
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
        addCollec() {//新增
            this.$router.push({
                path: '/addAssetPac'
            })
        },
        handleEdit(index) {//编辑
            this.$router.push({
                name: 'updataAssetPackage',
                params: {index: index}
            })
        },
        handleDeta(index,row) {//查看
            this.$router.push({
                name: 'asPackageDetails',
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