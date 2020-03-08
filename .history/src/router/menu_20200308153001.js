import Main from '@/view/main'
export default [{
    path: '/official',
    name: 'official',
    // redirect: '/customer-case',
    meta: {
        icon: 'social-buffer',
        title: '入驻咨询师'
    },
    component: Main,
    children: [{
            path: 'home',
            name: 'home',
            meta: {
                icon: 'arrow-graph-up-right',
                title: '入驻协议'
            },
            component: () =>
                import ('@/view/single-page/enter')
        },
        {
            path: 'enter2',
            name: 'enter2',
            meta: {
                icon: 'arrow-graph-up-right',
                title: '个人信息'
            },
            component: () =>
                import ('@/view/single-page/enter2')
        },
        {
            path: 'enter3',
            name: 'enter3',
            meta: {
                icon: 'arrow-graph-up-right',
                title: '专业资质'
            },
            component: () =>
                import ('@/view/single-page/enter3')
        },
        {
            path: 'enter4',
            name: 'enter4',
            meta: {
                icon: 'arrow-graph-up-right',
                title: '咨询服务设置'
            },
            component: () =>
                import ('@/view/single-page/enter4')
        }
    ]
}]