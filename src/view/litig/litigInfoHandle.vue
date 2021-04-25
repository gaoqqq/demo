<template>
    <div>
        <t-title :titleText="str"></t-title>
        <div class="cond-body" :style="height">
            <el-form :model="collectForm" :rules="rules" ref="ruleForm" label-width="80px" label-position="left" class="demo-ruleForm">
                <el-row><el-col :span="8"><el-form-item label="诉讼进程">
                    <el-select v-model="value" placeholder="请选择诉讼进程" class="handle-select mr10">
                        <el-option key="1" label="已执行" value="已执行"></el-option>
                        <el-option key="2" label="已起诉未判决" value="已起诉未判决"></el-option>
                        <el-option key="3" label="执行中" value="执行中"></el-option>
                    </el-select>
                </el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="诉讼环节">
                    <el-select v-model="value" placeholder="请选择诉讼进程" class="handle-select mr10">
                        <el-option key="1" label="已执行" value="已执行"></el-option>
                        <el-option key="2" label="已起诉未判决" value="已起诉未判决"></el-option>
                        <el-option key="3" label="执行中" value="执行中"></el-option>
                    </el-select>
                </el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="诉讼法院"><el-input v-model="collectForm.agencyName" placeholder="请填写诉讼法院"></el-input></el-form-item></el-col></el-row>
                <div v-if="str == '新建诉讼'">
                    <el-row><el-col :span="8"><el-form-item label="案号" prop="agencyName"><el-input v-model="collectForm.agencyName" placeholder="请填写机构名称"></el-input></el-form-item></el-col></el-row>
                    <el-row><el-col :span="8"><el-form-item label="开庭时间" prop="bankAccountName"><el-input v-model="collectForm.bankAccountName" placeholder="请输入银行户名"></el-input></el-form-item></el-col></el-row>
                    <el-row><el-col :span="8"><el-form-item label="开庭地点" prop="bank"><el-input v-model="collectForm.bank" placeholder="请输入开户行名称"></el-input></el-form-item></el-col></el-row>
                    <el-row><el-col :span="8"><el-form-item label="法官姓名" prop="bankAccount"><el-input v-model="collectForm.bankAccount" placeholder="请输入银行账号"></el-input></el-form-item></el-col></el-row>
                    <el-row><el-col :span="8"><el-form-item label="法官联系方式" prop="head"><el-input v-model="collectForm.head" placeholder="请输入负责人"></el-input></el-form-item></el-col></el-row>
                    <el-row><el-col :span="8"><el-form-item label="备注" prop="memo">
                        <el-input type="textarea" rows="4" v-model="collectForm.memo" placeholder="请填写机构备注"></el-input>
                    </el-form-item></el-col></el-row>
                </div>
                <el-row><el-col :span="8"><el-form-item label="资料上传">
                    <el-button type="primary" plain>预览</el-button>
                    <el-row>
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
                                <template slot-scope="scope">
                                    <el-button type="text" @click="handleDeta(scope.$index, scope.row)">下载</el-button>
                                    <el-button type="text" class="red" @click="handleDeta(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-form-item></el-col></el-row>
                <el-row class="formFooter"><el-button>取消</el-button><el-button type="primary">提交</el-button></el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
import { fetchData } from '../../api/index';
export default {
    name: 'litigInfo',
    data() {
        return {
            value: '',
            str: '新建诉讼',
            height: '',
            rules: {
                agencyName: [{ required: true, message: '请填写机构名称', trigger: 'change' }],
                bankAccountName: [{ required: true, message: '请输入银行户名', trigger: 'change' }],
                bank: [{ required: true, message: '请输入开户行名称', trigger: 'change' }],
                bankAccount: [{ required: true, message: '请输入银行账号', trigger: 'change' }],
                head: [{ required: true, message: '请输入负责人', trigger: 'change' }],
                contact: [{ required: true, message: '请输入负责人联系方式', trigger: 'change' }],
                office: [{ required: true, message: '请填写办公地点', trigger: 'change' }],
                state: [{ required: true, message: '请选择机构状态', trigger: 'change' }],
            },
            collectForm: {
                agencyNo: '037692',
                agencyName: '',
                bankAccountName: '',
                bank: '',
                bankAccount: '',
                memo: '',
                head: '',
                contact: '',
                office: '',
                state: '启用',
            },
            fileList: [{a:'开庭公告',b:'张三开庭公告.pdf'}],
        }
    },
    created() {
        this.height = 'minHeight:'+(this.$store.state.documentClientHeight-185)+'px';
    },
    mounted() {
        if (this.$route.fullPath == '/updataLitig') {
            this.str = '编辑诉讼'
            this.getList(this.$route.params.index);
        }
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
.cond-body{
    box-sizing: border-box;
    background: #fff;
    padding-top: 30px;
    padding-left: 35px;
}
.formFooter{
    text-align:center;
    padding: 20px 0;
}
.gray {
    color: #808080;
}
.handle-select{
    width: 100%;
}
.red {
    color: #ff0000;
}
.userName{
    color: #3697FB;
}
.table{
    margin-top: 15px;
}
</style>
<style>
.el-form-item__label{
    font-weight: 550;
}
</style>