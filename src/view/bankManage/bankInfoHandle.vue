<template>
    <div>
        <t-title :titleText="str"></t-title>
        <div class="cond-body" :style="height">
            <el-form :model="collectForm" :rules="rules" ref="ruleForm" label-width="80px" label-position="left" class="demo-ruleForm">
                <el-row><el-col :span="8"><el-form-item label="银行编号"><span style="margin-left:1px;">{{collectForm.agencyNo}}</span></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="银行名称" prop="agencyName"><el-input v-model="collectForm.agencyName" placeholder="请填写银行名称"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="银行账号" prop="bankAccount"><el-input v-model="collectForm.bankAccount" placeholder="请输入银行账号"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="银行状态" prop="state">
                    <el-radio-group v-model="collectForm.state">
                        <el-radio label="停用"></el-radio>
                        <el-radio label="启用"></el-radio>
                    </el-radio-group>
                </el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="负责人" prop="head"><el-input v-model="collectForm.head" placeholder="请输入负责人"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="联系方式" prop="contact"><el-input v-model="collectForm.contact" placeholder="请输入负责人联系方式"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="办公地点" prop="office"><el-input v-model="collectForm.office" placeholder="请填写办公地点"></el-input></el-form-item></el-col></el-row>
                <el-row>
                    <el-col :span="8" class="fileCol"><el-form-item label="银行对接模板文件">
                        <el-input class="fileList" placeholder="请选择案件导入模版"></el-input><el-button style="float:right;" type="primary" plain>预览</el-button>
                    </el-form-item></el-col>
                </el-row>
                <!-- <el-row><el-col :span="8"><el-form-item label="">
                    <div>1</div>
                    <div>2</div>
                </el-form-item></el-col></el-row> -->
                <el-row><el-col :span="8"><el-form-item label="备注" prop="memo">
                    <el-input type="textarea" rows="4" v-model="collectForm.memo" placeholder="请填写银行备注"></el-input>
                </el-form-item></el-col></el-row>
                <el-row class="formFooter"><el-button>取消</el-button><el-button type="primary">提交</el-button></el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
import { fetchData } from '../../api/index';
export default {
    name: 'bankInfo',
    data() {
        return {
            str: '新建银行',
            height: '',
            rules: {
                agencyName: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
                bankAccount: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
                head: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
                contact: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
                office: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
                state: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
            },
            collectForm: {
                agencyNo: '037692',
                agencyName: '',
                bankAccount: '',
                memo: '',
                head: '',
                contact: '',
                office: '',
                state: '启用',
            },
        }
    },
    created() {
        this.height = 'minHeight:'+(this.$store.state.documentClientHeight-185)+'px';
    },
    mounted() {
        if (this.$route.fullPath == '/updataCollection') {
            this.str = '编辑银行'
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
.fileList{
    width: 80%;
}
</style>
<style>
.el-form-item__label{
    font-weight: 550;
}
.fileCol .el-form-item--small.el-form-item{
    margin-bottom: 0;
}
</style>