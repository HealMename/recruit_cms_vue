import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'

Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
import news from '@/views/modules/news/list'
import gongsi from '@/views/modules/gongsi/list'
import rencaiku from '@/views/modules/rencaiku/list'
import liaotianjilu from '@/views/modules/liaotianjilu/list'
import chengshi from '@/views/modules/chengshi/list'
import discusszhaopinxinxi from '@/views/modules/discusszhaopinxinxi/list'
import zhaopinxinxi from '@/views/modules/zhaopinxinxi/list'
import gangweiyaoqing from '@/views/modules/gangweiyaoqing/list'
import gerenjianli from '@/views/modules/gerenjianli/list'
import yonghu from '@/views/modules/yonghu/list'
import chat from '@/views/modules/chat/list'
import gangweifenlei from '@/views/modules/gangweifenlei/list'
import dafenjilu from '@/views/modules/dafenjilu/list'
import tousujilu from '@/views/modules/tousujilu/list'
import toudijilu from '@/views/modules/toudijilu/list'
import config from '@/views/modules/config/list'
import question from '@/views/modules/question/question'
import questionadd from '@/views/modules/question/questionadd'
import paper from '@/views/modules/question/paper'
import paperadd from '@/views/modules/question/paperadd'
import user_test from '@/views/modules/question/user_test'
import user_test_det from '@/views/modules/question/user_test_det'
import verify from '@/views/modules/verify/index'
import verify_det from '@/views/modules/verify/det'
import subjects from '@/views/modules/subjects/index'
import ModuleList from '@/views/modules/system/ModuleList'
import questionview from '@/views/modules/question/question_view'
//2.配置路由   注意：名字
const routes = [{
    path: '/index',
    name: '首页',
    component: Index,
    children: [{
        path: '/module/list',
        name: '模块管理',
        component: ModuleList,
        meta: {icon: '', title: 'center'}
    },
        {
        path: '/subjects',
        name: '科目管理',
        component: subjects,
        meta: {icon: '', title: 'center'}
    },
        {
        path: '/question',
        name: '题目',
        component: question,
        meta: {icon: '', title: 'center'}
    },{
        path: '/question/add/:id',
        name: '题库 / 添加题目',
        component: questionadd,
        meta: {icon: '', title: 'center'}
    },{
        path: '/question/view/:id',
        name: '题库 / 题目预览',
        component: questionview,
        meta: {icon: '', title: 'center'}
    },{
        path: '/paper',
        name: '试卷',
        component: paper,
        meta: {icon: '', title: 'center'}
    },{
        path: '/paper/add/:id',
        name: '试卷 / 试卷详情',
        component: paperadd,
        meta: {icon: '', title: 'center'}
    },{
        path: '/user/test/',
        name: '题目 / 做题记录',
        component: user_test,
        meta: {icon: '', title: 'center'}
    },{
        path: '/user/test/det/:id',
        name: '题目 / 做题记录',
        component: user_test_det,
        meta: {icon: '', title: 'center'}
    },{
        path: '/verify',
        name: '审核管理',
        component: verify,
        meta: {icon: '', title: 'center'}
    },{
        path: '/verify/det/:type/:id',
        name: '审核详情',
        component: verify_det,
        meta: {icon: '', title: 'center'}
    },
        {
        path: '/',
        name: '首页',
        component: Home,
        meta: {icon: '', title: 'center'}
    }, {
        path: '/updatePassword',
        name: '修改密码',
        component: UpdatePassword,
        meta: {icon: '', title: 'updatePassword'}
    }, {
        path: '/pay',
        name: '支付',
        component: pay,
        meta: {icon: '', title: 'pay'}
    }, {
        path: '/center',
        name: '个人信息',
        component: center,
        meta: {icon: '', title: 'center'}
    }
        , {
            path: '/news',
            name: '新闻资讯',
            component: news
        }
        , {
            path: '/gongsi',
            name: '公司',
            component: gongsi
        }
        , {
            path: '/rencaiku',
            name: '人才库',
            component: rencaiku
        }
        , {
            path: '/liaotianjilu',
            name: '聊天记录',
            component: liaotianjilu
        }
        , {
            path: '/chengshi',
            name: '城市',
            component: chengshi
        }
        , {
            path: '/discusszhaopinxinxi',
            name: '招聘信息评论',
            component: discusszhaopinxinxi
        }
        , {
            path: '/zhaopinxinxi',
            name: '招聘信息',
            component: zhaopinxinxi
        }
        , {
            path: '/gangweiyaoqing',
            name: '岗位邀请',
            component: gangweiyaoqing
        }
        , {
            path: '/gerenjianli',
            name: '个人简历',
            component: gerenjianli
        }
        , {
            path: '/yonghu',
            name: '用户',
            component: yonghu
        }
        , {
            path: '/chat',
            name: '客服咨询',
            component: chat
        }
        , {
            path: '/gangweifenlei',
            name: '岗位分类',
            component: gangweifenlei
        }
        , {
            path: '/dafenjilu',
            name: '打分记录',
            component: dafenjilu
        }
        , {
            path: '/tousujilu',
            name: '投诉记录',
            component: tousujilu
        }
        , {
            path: '/toudijilu',
            name: '投递记录',
            component: toudijilu
        }
        , {
            path: '/config',
            name: '轮播图管理',
            component: config
        }
    ]
},
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {icon: '', title: 'login'}
    },
    {
        path: '/register',
        name: 'register',
        component: register,
        meta: {icon: '', title: 'register'}
    },
    {
        path: '/',
        name: '首页',
        redirect: '/index'
    }, /*默认跳转路由*/
    {
        path: '*',
        component: NotFound
    }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
    mode: 'hash',
    /*hash模式改为history*/
    routes // （缩写）相当于 routes: routes
})

export default router;
