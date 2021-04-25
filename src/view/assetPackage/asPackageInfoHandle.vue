<template>
    <div>
        <t-title :titleText="str"></t-title>
        <div class="cond-body" :style="height">
            <el-form :model="collectForm" :rules="rules" ref="ruleForm" label-width="120px" label-position="left" class="demo-ruleForm">
                <el-row><el-col :span="8"><el-form-item label="资产包编号"><span style="margin-left:1px;">{{collectForm.agencyNo}}</span></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="资产包名称"><el-input v-model="collectForm.agencyName" placeholder="请填写机构名称"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="资产包状态">
                    <el-radio-group v-model="collectForm.state">
                        <el-radio label="结项"></el-radio>
                        <el-radio label="进行中"></el-radio>
                    </el-radio-group>
                </el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="转让方机构"><el-input v-model="collectForm.bankAccountName" placeholder="请输入银行户名"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="转让方名称"><el-input v-model="collectForm.bank" placeholder="请输入开户行名称"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="转让方负责人"><el-input v-model="collectForm.bankAccount" placeholder="请输入银行账号"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="转让方负责人联系方式"><el-input v-model="collectForm.head" placeholder="请输入负责人"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="我方负责人"><el-input v-model="collectForm.contact" placeholder="请输入负责人联系方式"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="我方负责人联系方式"><el-input v-model="collectForm.office" placeholder="请填写办公地点"></el-input></el-form-item></el-col></el-row>
                <el-row class="buyTime"><el-col :span="8"><el-form-item label="购入时间">
                    <el-date-picker
                        v-model="collectForm.office"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="备注">
                    <el-input type="textarea" rows="4" v-model="collectForm.memo" placeholder="请填写机构备注"></el-input>
                </el-form-item></el-col></el-row>
                <el-row class="formFooter"><el-button>取消</el-button><el-button type="primary">提交</el-button></el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
import { fetchData } from '../../api/index';
export default {
    name: 'asPackInfo',
    data() {
        return {
            str: '新建资产包',
            height: '',
            rules: {},
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
        if (this.$route.fullPath == '/updataAssetPackage') {
            this.str = '编辑资产包'
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
</style>
<style>
.buyTime .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
}
.el-form-item__label{
    font-weight: 550;
}
</style>