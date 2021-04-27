<template>
    <div id="asPack">
        <div class="cond-header">
        <el-form ref="conditionForm" :model="conditionForm" label-width="100px">
            <el-row>
            <el-col :span="6"><el-form-item label="角色名称"><el-input placeholder="请输入角色名称" class="cond-input"></el-input></el-form-item></el-col>
            
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
                <el-table-column prop="userName" label="角色名称" align="center"></el-table-column>
                <el-table-column prop="totlal" label="总人数" align="center"></el-table-column>
                <el-table-column prop="role" label="角色描述" align="center"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
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
    name: 'role',
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
                path: '/addRole'
            })
        },
        handleEdit(index) {//编辑
            this.$router.push({
                name: 'updatRole',
                params: {index: index}
            })
        },
        // handleDeta(index,row) {//查看
        //     this.$router.push({
        //         name: 'asPackageDetails',
        //         params: {index: index}
        //     })
        // },
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