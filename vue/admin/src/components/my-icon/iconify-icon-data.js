/**
 * iconify 图标加载中心
 * 为了使用动态图标组件，又不想全量引入（按需加载）
 * 使用步骤：
 *   1. 在 https://icon-sets.iconify.design/ 挑选或搜索想要的图标
 *   2. 选中想要的图标，在下方 Selected icon 处看图标名等信息
 *      比如选中了 ep:add-location，即 Element Plus（在iconify中使用缩写ep） 的 AddLocation 图标
 *   3. 在本文件中导出该图标文件：
 *      export * as EpAddLocation from '~icons/ep/add-location'
 *      导出名称为图标库(ep)+图标名(add-location)的大驼峰，引入路径为 ~icons/图标库/图标名
 *   4. 复制当前iconify页面url为该引入图标添加注释
 * 相关文档：
 *   https://element-plus.gitee.io/zh-CN/component/icon.html
 *   https://github.com/antfu/unplugin-icons
 * 相关配置：vue.config.js - plugins - Icons
 */

// https://icon-sets.iconify.design/ant-design/dashboard-outlined/
export * as AntDesignDashboardOutlined from '~icons/ant-design/dashboard-outlined'

// https://icon-sets.iconify.design/ant-design/menu-fold-outlined/
export * as AntDesignMenuFoldOutlined from '~icons/ant-design/menu-fold-outlined'

// https://icon-sets.iconify.design/ant-design/menu-unfold-outlined/
export * as AntDesignMenuUnfoldOutlined from '~icons/ant-design/menu-unfold-outlined'

// https://icon-sets.iconify.design/ant-design/bars-outlined/
export * as AntDesignBarsOutlined from '~icons/ant-design/bars-outlined'

// https://icon-sets.iconify.design/ep/bell/
export * as EpBell from '~icons/ep/bell'

// https://icon-sets.iconify.design/ep/goods/
export * as EpGoods from '~icons/ep/goods'

// https://icon-sets.iconify.design/ep/home-filled/
export * as EpHomeFilled from '~icons/ep/home-filled'

export * as AntDesignPlusSquare from '~icons/ant-design/plus-square-filled'

export * as File from '~icons/arcticons/file-commander'

export * as MoreVertical from '~icons/akar-icons/more-vertical'

export * as Down from '~icons/akar-icons/chevron-down'

export * as Question from '~icons/ant-design/question-circle-outlined'

export * as Person from '~icons/bi/person-fill'

export * as Back from '~icons/ep/back'

export * as Add from '~icons/carbon/add'

export * as PersonSquare from '~icons/bi/person-square'

export * as Pic from '~icons/icon-park-solid/pic'

export * as LinkChain from '~icons/akar-icons/link-chain'

export * as MiniProgram from '~icons/ri/mini-program-fill'

export * as Edit from '~icons/bxs/edit'

export * as Bell from '~icons/bi/bell-fill'

export * as StarFill from '~icons/bi/bookmark-star-fill'

export * as Star from '~icons/clarity/star-solid'

export * as Fresh from '~icons/ci/refresh-02'

export * as Check from '~icons/akar-icons/check'
export * as Setting from '~icons/ep/setting'
export * as User from '~icons/bx/user'
export * as HelpFilled from '~icons/ep/help-filled'
export * as Present from '~icons/ep/present'
export * as ArrowUpThick from '~icons/akar-icons/arrow-up-thick'
export * as Menu from '~icons/ep/menu'
