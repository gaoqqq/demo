<template>
    <div>
        <t-title :titleText="str"></t-title>
        <div class="asp-tabs"> 
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first"></el-tab-pane>
                <el-tab-pane label="统计信息" name="second"></el-tab-pane>
                <el-tab-pane label="公债信息" name="third"></el-tab-pane>
            </el-tabs>
        </div>
        <div v-if="activeName == 'first'" class="cond-body" :style="height">
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
        <div v-show="activeName == 'second'">
            <div class="statistical">
                <div class="statisticalTitle">总债权额</div>
                <el-progress :text-inside="true" :stroke-width="17" :percentage="67" status="exception"></el-progress>
            </div>
            <div class="statistical" id="assteRece" :style="clientW"></div>
            <div class="statistical" id="loanEcharts" :style="clientW"></div>
            <div class="userInfo">用户画像</div>
            <div class="userEchBox" id="sexEcharts" :style="clientWTwo"></div>
            <div class="userEchBox litig" :style="clientWTwo">
                <div class="litigTitle">
                    诉讼情况
                    <div class="tRight"><span style="background:#2DDEBF;"></span>已诉<span style="background:#FFB64D;"></span>未诉</div>
                </div>
                <div class="litigOne"><el-progress type="circle" color="#2DDEBF" :percentage="68"></el-progress></div>
                <div class="litigTwo"><el-progress type="circle" color="#FFB64D" :percentage="21"></el-progress></div>
            </div>
            <div class="userEchBox" id="ageEcharts" :style="clientWTwo"></div>
            <div class="userEchBox litig" :style="clientWTwo">
                <div class="litigTitle" style="margin-bottom:20px;">学历分布</div>
                <el-progress :percentage="46" :format="format"></el-progress>
                <el-progress :percentage="58" :format="format"></el-progress>
                <el-progress :percentage="73" :format="format"></el-progress>
                <el-progress :percentage="65" :format="format"></el-progress>
                <el-progress :percentage="32" :format="format"></el-progress>
                <el-progress :percentage="26" :format="format"></el-progress>
                <el-progress :percentage="15" :format="format"></el-progress>
            </div>
        </div>
        <div v-if="activeName == 'third'" class="cond-body" :style="height">
            <div class="asTableTitle">本资产包共债信息</div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                >
                <el-table-column prop="agencyNo" label="姓名" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="所属资产包" align="center"></el-table-column>
                <el-table-column prop="head" label="案件编号" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <span :class="scope.row.state==='启用'?'green':'red'">{{scope.row.state}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            class="gray"
                            @click="handleDeta(scope.$index, scope.row)"
                        >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="asTableTitle" style="margin-top:40px;">其它资产包共债信息</div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                >
                <el-table-column prop="agencyNo" label="姓名" align="center"></el-table-column>
                <el-table-column prop="agencyName" label="所属资产包" align="center"></el-table-column>
                <el-table-column prop="head" label="案件编号" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <span :class="scope.row.state==='启用'?'green':'red'">{{scope.row.state}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            class="gray"
                            @click="handleDeta(scope.$index, scope.row)"
                        >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { fetchData } from '../../api/index';
export default {
    name: 'asPackInfo',
    data() {
        return {
            str: '查看资产包',
            clientW: '',
            clientWTwo: '',
            activeName: 'first',
            height: '',
            tableData: [],
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
        this.getList(this.$route.params.index);
        this.$nextTick(() => {
            this.assetEchartsInit();
        })
        this.resetDocumentClientWidth()
    },
    methods: {
        assetEchartsInit() {
            let myChart = this.$echarts.init(document.getElementById('assteRece'))
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                color: ['#24ACDC','#FFD641'],
                title: { text: '资产省级区域回款分布' },
                grid:{ x:70,y:70,x2:5,y2:20 },
                legend: {
                    data: ['总债权额', '回款额']
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {show: false},
                        data: ['上海','北京','山西','江西','河北','湖南','广东','深圳','湖北','黑龙江','湖南']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                    }
                ],
                series: [
                    {
                        name: '总债权额',
                        type: 'bar',
                        emphasis: {
                            focus: 'series'
                        },
                        data: [1040, 1230, 610, 234, 1000, 820, 700, 680, 540, 1090, 1170],
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,color: '#24DFCE'}, {
                                    offset: 1,color: '#24ACDC'
                                }]),
                            }
                        },
                    },
                    {
                        name: '回款额',
                        type: 'bar',
                        emphasis: {
                            focus: 'series'
                        },
                        data: [555, 420, 180, 370, 585, 187, 30, 790, 540, 780, 400],
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,color: '#FFD641'}, {
                                    offset: 1,color: '#EC7C2A'
                                }]),
                            }
                        },
                    }
                ]
            });
            //资产省级区域回款分布图表end  
            let myChartOne = this.$echarts.init(document.getElementById('loanEcharts'))
            myChartOne.setOption({
                title: { text: '贷款预期时间分布' },
                color: ['#FC6E82'],
                grid:{ x:70,y:70,x2:5,y2:20 },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['M1～M3', 'M3～M6', 'M6～M9', 'M9～M12', 'M12～M15', 'M15～M18', 'M18～M21', 'M21～M24', '超过M24']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    itemStyle: { normal: { areaStyle: { type: 'default' },  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,color: '#FC6E82'}, {
                                    offset: 1,color: '#fff'
                                }]), } },
                    data: [170, 450, 300, 1180, 400, 940, 1130, 786, 900],
                    type: 'line',
                    smooth: true
                }]
            })
            //贷款预期时间分布图表endlitigEcharts
            let myChartTwo = this.$echarts.init(document.getElementById('sexEcharts'))
            myChartTwo.setOption({
                title: { text: '性别比例' },
                tooltip: {trigger: 'item'},
                grid:{ x:70,y:70,x2:5,y2:20 },
                color: ['#767D94','#FF96A6','#69B1FC'],
                legend: {
                    top: 'top',
                    left: 'right'
                },
                series: [
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [0, 130],
                        center: ['40%', '50%'],
                        roseType: 'radius',
                        itemStyle: {
                            borderRadius: 8
                        },
                        data: [
                            {value: 2000, name: '未知'},
                            {value: 3032, name: '女'},
                            {value: 6180, name: '男'}
                        ]
                    }
                ]
            })
            //性别比例图表end
            let myChartThe = this.$echarts.init(document.getElementById('ageEcharts'))
            myChartThe.setOption({
                title: { text: '年龄分布' },
                color: ['#65B1FF'],
                grid:{ x:45,y:40,x2:5,y2:20 },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['0','0～17岁', '18～24岁', '25～29岁', '30～34岁', '35～39岁', '40岁以上', '未知']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    itemStyle: { normal: { areaStyle: { type: 'default' },  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,color: '#65B1FF'}, {
                                    offset: 1,color: '#fff'
                                }]), } },
                    data: [0,4000, 8280, 11130, 3900, 7844, 1834, 2130],
                    type: 'line',
                    smooth: true
                }]
            })
            //诉讼情况图表end
        },
        format(percentage) {
            if (percentage === 46) return '初中'
            if (percentage === 58) return '高中'
            if (percentage === 73) return '大专'
            if (percentage === 65) return '本科'
            if (percentage === 32) return '研究生'
            if (percentage === 26) return '博士'
            if (percentage === 15) return '硕士'
        },
        resetDocumentClientWidth() {
            var clientWidth = document.querySelector('.content').clientWidth;
            this.clientW = `width:${clientWidth-90}px;height:400px;`
            this.clientWTwo = `width:${(clientWidth-90)/2-5}px;height:300px;`
        },
        getList(id) {
            fetchData({}).then(res => {
                // console.log(res);
                this.tableData = res.list;
                this.collectForm = res.list[id];
            })
        },
        handleClick(tab, event) {
            // console.log(tab, event);
        },
    }
}
</script>
<style scoped>
.cond-body{
    box-sizing: border-box;
    background: #fff;
    padding: 0 35px;
    padding-top: 30px;
}
.formFooter{
    text-align:center;
    padding: 20px 0;
}
.asp-tabs{
    background: #fff;
    padding: 3px;
    padding-left: 35px;
    margin-bottom: 10px;
}
.asTableTitle{
    font-size: 14px;
    font-weight: 550;
    margin-bottom: 20px;
}
.statisticalTitle{
    font-size: 14px;
    font-weight: 550;
    margin-bottom: 8px;
}
.statistical{
    padding: 20px 35px;
    background: #fff;
    margin-bottom: 10px;
}
.userEchBox:nth-child(2n-1){
    display: inline-block;
    padding: 10px 17px;
    margin-right: 5px;
    margin-bottom: 10px;
    background: #fff;
}
.userEchBox:nth-child(2n){
    display: inline-block;
    padding: 10px 17px;
    margin-left: 5px;
    margin-bottom: 10px;
    background: #fff;
}
.userInfo{
    font-size: 20px;
    font-weight: 550;
    color: #3697FB;
    padding: 10px 0;
    padding-left: 35px;
    background: #EBF4FE;
}
.litig{
    vertical-align: top;
}
.litigOne,.litigTwo{
    display: inline-block;
    margin-top: 7%;
    margin-left: 10%;
}
.litigTitle{
    font-size: 18px;
    font-weight: 550;
}
.tRight{
    float: right;
}
.tRight{
    font-size: 12px;
    font-weight: 500;
    vertical-align: middle;
}
.tRight span{
    display: inline-block;
    width: 25px;
    height: 14px;
    border-radius: 3px;
    margin: 0 10px;
    vertical-align: -2px;
}
</style>
<style>
.buyTime .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
}
.el-form-item__label{
    font-weight: 550;
}
.el-tabs__nav-wrap::after{
    background: none;
}
.asp-tabs .el-tabs__header{
    margin: 0;
}
.el-progress-circle{
    width: 200px!important;
    height: 200px!important;
}
.el-progress{
    margin-bottom: 22px;
}
.el-progress__text{
    font-size: 12px!important;
}
</style>