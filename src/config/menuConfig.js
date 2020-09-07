const menuList = [
    {
        title: '首页', // 菜单标题名称
        key: '/home', // 对应的path
        icon: 'DashboardOutlined', // 图标名称
        isPublic: true, // 公开的
    },
    {
        title: '商品',
        key: '/products',
        icon: 'AppstoreOutlined',
        children: [
            {
                title: '品类管理',
                key: '/category',
                icon: 'BarsOutlined'
            },
            {
                title: '商品管理',
                key: '/product',
                icon: 'ToolOutlined'
            },
        ]
    },
    {
        title: '用户管理',
        key: '/user',
        icon: 'UserOutlined',
        children: [
            {
                title: '用户列表',
                key: '/user/list',
                icon: 'BarsOutlined'
            },
            {
                title: '个人中心',
                key: '/user/center',
                icon: 'UserOutlined'
            },
            {
                title: '个人设定',
                key: '/user/setting',
                icon: 'SettingOutlined'
            },
        ]
    },
    {
        title: '角色管理',
        key: '/role',
        icon: 'SafetyOutlined',
    },

    {
        title: '图形图表',
        key: '/charts',
        icon: 'AreaChartOutlined',
        children: [
            {
                title: '柱形图',
                key: '/charts/bar',
                icon: 'BarChartOutlined'
            },
            {
                title: '折线图',
                key: '/charts/line',
                icon: 'LineChartOutlined'
            },
            {
                title: '饼图',
                key: '/charts/pie',
                icon: 'PieChartOutlined'
            },
        ]
    },
]

export default menuList