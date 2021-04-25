<template>
    <div>
        <t-title :titleText="str"></t-title>
        <div class="cond-body" :style="height">
            <el-form :model="collectForm" :rules="rules" ref="ruleForm" label-width="80px" label-position="left" class="demo-ruleForm">
                <el-row><el-col :span="8"><el-form-item label="律所编号"><span style="margin-left:1px;">{{collectForm.agencyNo}}</span></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="律所名称" prop="agencyName"><el-input v-model="collectForm.agencyName" placeholder="请填写律所名称"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="律所状态" prop="state">
                    <el-radio-group v-model="collectForm.state">
                        <el-radio label="停用"></el-radio>
                        <el-radio label="启用"></el-radio>
                    </el-radio-group>
                </el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="银行户名" prop="bankAccountName"><el-input v-model="collectForm.bankAccountName" placeholder="请输入银行户名"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="开户银行" prop="bank"><el-input v-model="collectForm.bank" placeholder="请输入开户行名称"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="银行账号" prop="bankAccount"><el-input v-model="collectForm.bankAccount" placeholder="请输入银行账号"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="负责人" prop="head"><el-input v-model="collectForm.head" placeholder="请输入负责人"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="联系方式" prop="contact"><el-input v-model="collectForm.contact" placeholder="请输入负责人联系方式"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="办公地点" prop="office"><el-input v-model="collectForm.office" placeholder="请填写办公地点"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="备注" prop="memo">
                    <el-input type="textarea" rows="4" v-model="collectForm.memo" placeholder="请填写律所备注"></el-input>
                </el-form-item></el-col></el-row>
                <el-row class="formFooter"><el-button>取消</el-button><el-button type="primary">提交</el-button></el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
import { fetchData } from '../../api/index';
export default {
    name: 'lawFirmsInfo',
    data() {
        return {
            str: '新建律所',
            height: '',
            rules: {
                agencyName: [{ required: true, message: '请填写律所名称', trigger: 'change' }],
                bankAccountName: [{ required: true, message: '请输入银行户名', trigger: 'change' }],
                bank: [{ required: true, message: '请输入开户行名称', trigger: 'change' }],
                bankAccount: [{ required: true, message: '请输入银行账号', trigger: 'change' }],
                head: [{ required: true, message: '请输入负责人', trigger: 'change' }],
                contact: [{ required: true, message: '请输入负责人联系方式', trigger: 'change' }],
                office: [{ required: true, message: '请填写办公地点', trigger: 'change' }],
                state: [{ required: true, message: '请选择律所状态', trigger: 'change' }],
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
        }
    },
    created() {
        this.height = 'minHeight:'+(this.$store.state.documentClientHeight-185)+'px';
    },
    mounted() {
        if (this.$route.fullPath == '/updataCollection') {
            this.str = '编辑律所'
            this.getList(this.$route.params.index);
        }
    },
    methods: {
        getList(id) {
            fetchData({}).then(res => {
                console.log(res);
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
</style>
<style>
.el-form-item__label{
    font-weight: 550;
}
</style>