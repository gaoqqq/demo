<template>
    <div>
        <t-title :titleText="str"></t-title>
        <div class="cond-body" :style="height">
            <el-form :model="collectForm" :rules="rules" ref="ruleForm" label-width="120px" label-position="left" class="demo-ruleForm">
                <el-row><el-col :span="8"><el-form-item label="姓名"><el-input v-model="collectForm.agencyName" placeholder="请填写姓名"></el-input></el-form-item></el-col></el-row>
                  <el-row><el-col :span="8"><el-form-item label="身份证号"><el-input v-model="collectForm.bankAccount" placeholder="请填写身份证号"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="性别">
                    <el-radio-group v-model="collectForm.gender">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item></el-col></el-row>
                 <el-row><el-col :span="8"><el-form-item label="手机号码"><el-input v-model="collectForm.office" placeholder="请填写手机号码"></el-input></el-form-item></el-col></el-row>
                 <el-row>
                    <el-col :span="8">
                        <el-form-item label="员工类型">
                            <el-select v-model="collectForm.name" placeholder="请选择员工类型">
                                <el-option key="1" label="本部" value="本部"></el-option>
                                <el-option key="2" label="外部" value="外部"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                 <el-row>
                    <el-col :span="8">
                        <el-form-item label="所属团队">
                            <el-select v-model="collectForm.name" placeholder="请选择员工类型" class="handle-select mr10">
                                <el-option key="1" label="本部" value="本部"></el-option>
                                <el-option key="2" label="华行资产" value="华行资产"></el-option>
                                <el-option key="3" label="中信银行" value="中信银行"></el-option>
                                <el-option key="4" label="金厚资产" value="金厚资产"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row><el-col :span="8"><el-form-item label="员工状态">
                    <el-radio-group v-model="collectForm.state">
                        <el-radio label="停用"></el-radio>
                        <el-radio label="启用"></el-radio>
                    </el-radio-group>
                </el-form-item></el-col></el-row>
                 <el-row><el-col :span="8"><el-form-item label="在职情况">
                    <el-radio-group v-model="collectForm.job">
                        <el-radio label="在职"></el-radio>
                        <el-radio label="离职"></el-radio>
                    </el-radio-group>
                </el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="用户名"><el-input v-model="collectForm.bankAccountName" placeholder="请输入用户名"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="角色"><el-input v-model="collectForm.bank" placeholder="请输入角色"></el-input></el-form-item></el-col></el-row>
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
            str: '新建用户',
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
                state: '停用',
                gender:'男',
                job:'在职'
            },
        }
    },
    created() {
        this.height = 'minHeight:'+(this.$store.state.documentClientHeight-185)+'px';
    },
    mounted() {
        if (this.$route.fullPath == '/updatUser') {
            this.str = '编辑用户'
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