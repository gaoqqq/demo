<template>
    <div>
        <t-title :titleText="str"></t-title>
        <div class="cond-body" :style="height">
            <el-form :model="collectForm" :rules="rules" ref="ruleForm" label-width="120px" label-position="left" class="demo-ruleForm">
                <el-row><el-col :span="8"><el-form-item label="角色名称"><el-input v-model="collectForm.agencyName" placeholder="请填写姓名"></el-input></el-form-item></el-col></el-row>
                <el-row><el-col :span="8"><el-form-item label="角色描述">
                    <el-input type="textarea" rows="4" v-model="collectForm.memo" placeholder="请填写角色描述"></el-input>
                </el-form-item></el-col></el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="权限配置">
                           <el-tree
                                :props="props"
                                :load="loadNode"
                                lazy
                                show-checkbox
                                @check-change="handleCheckChange">
                            </el-tree>
                        </el-form-item>
                </el-col>
                </el-row>
                <el-row class="formFooter"><el-button>取消</el-button><el-button type="primary">提交</el-button></el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
import { fetchData } from '../../api/index';
export default {
    name: 'roleEditInfo',
    data() {
        return {
            str: '新建角色',
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
            props: {
                label: 'name',
                children: 'zones'
            },
            count: 1
        }
    },
    created() {
        this.height = 'minHeight:'+(this.$store.state.documentClientHeight-185)+'px';
    },
    mounted() {
        if (this.$route.fullPath == '/updatRole') {
            this.str = '编辑角色'
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
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      handleNodeClick(data) {
        console.log(data);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: '案件管理' }, { name: '案件管理1' }]);
        }
        if (node.level > 3) return resolve([]);

        var hasChild;
        if (node.data.name === '案件管理') {
          hasChild = true;
        } else if (node.data.name === '案件管理1') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }

        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [{
              name: '案件管理' + this.count++
            }, {
              name: '案件管理' + this.count++
            }];
          } else {
            data = [];
          }

          resolve(data);
        }, 500);
      }
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
.el-tree {
    border: 1px solid #DCDFE6;
    min-height: 200px;
}
</style>