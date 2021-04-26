import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },



                // start
                {
                    path: '/assetPackage',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/assetPackage/asPackageindex.vue'),
                    meta: { title: '资产包管理' }
                },
                {
                    path: '/addAssetPac',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/assetPackage/asPackageInfoHandle.vue'),
                    meta: { title: '新建资产包' }
                },
                {
                    path: '/updataAssetPackage',
                    name: 'updataAssetPackage',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/assetPackage/asPackageInfoHandle.vue'),
                    meta: { title: '编辑资产包' }
                },
                {
                    path: '/asPackageDetails',
                    name: 'asPackageDetails',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/assetPackage/asPackageDetails.vue'),
                    meta: { title: '查看资产包' }
                },
                {
                    path: '/collection',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/externalSeason/collection.vue'),
                    meta: { title: '催收机构管理' }
                },
                {
                    path: '/addCollection',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/externalSeason/collectionInfoHandle.vue'),
                    meta: { title: '新建催收机构' }
                },
                {
                    path: '/updataCollection',
                    name: 'updataCollection',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/externalSeason/collectionInfoHandle.vue'),
                    meta: { title: '编辑催收机构' }
                },
                {
                    path: '/lawFirmsIndex',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/lawFirms/lawFirmsIndex.vue'),
                    meta: { title: '律所管理' }
                },
                {
                    path: '/addlawFirms',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/lawFirms/lawFirmsInfoHandle.vue'),
                    meta: { title: '新建律所' }
                },
                {
                    path: '/updatalawFirms',
                    name: 'updatalawFirms',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/lawFirms/lawFirmsInfoHandle.vue'),
                    meta: { title: '编辑律所' }
                },
                {
                    path: '/bankIndex',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/bankManage/bankIndex.vue'),
                    meta: { title: '银行管理' }
                },
                {
                    path: '/addlBank',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/bankManage/bankInfoHandle.vue'),
                    meta: { title: '新建银行' }
                },
                {
                    path: '/updatalBank',
                    name: 'updatalBank',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/bankManage/bankInfoHandle.vue'),
                    meta: { title: '编辑银行' }
                },
                {
                    path: '/litigIndex',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/litig/litigIndex.vue'),
                    meta: { title: '诉讼管理' }
                },
                {
                    path: '/addLitig',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/litig/litigInfoHandle.vue'),
                    meta: { title: '新建诉讼' }
                },
                {
                    path: '/updataLitig',
                    name: 'updataLitig',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/litig/litigInfoHandle.vue'),
                    meta: { title: '编辑诉讼' }
                },
                {
                    path: '/litigInfoDetail',
                    name: 'litigInfoDetail',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/litig/litigInfoDetail.vue'),
                    meta: { title: '诉讼记录' }
                },
                {
                    path: '/userIndex',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/userManage/userManageindex.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/addUser',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/userManage/userManageInfoHandle.vue'),
                    meta: { title: '新建用户管理' }
                },
                {
                    path: '/updatUser',
                    name: 'updatUser',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/userManage/userManageInfoHandle.vue'),
                    meta: { title: '编辑用户管理' }
                },
                {
                    path: '/roleIndex',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/roleManage/roleManageindex.vue'),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/caseIndex',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/caseManagement/caseIndex.vue'),
                    meta: { title: '案件管理' }
                },
                {
                    path: '/caseDetails',
                    name: 'caseDetails',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/caseManagement/caseDetails.vue'),
                    meta: { title: '案件查看' }
                },
                // end



                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
