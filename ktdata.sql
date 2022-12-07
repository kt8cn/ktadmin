

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `kt_base_agent`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_agent`;
CREATE TABLE `kt_base_agent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `un` varchar(20) NOT NULL COMMENT '用户名',
  `pwd` varchar(32) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '密码',
  `key_word` varchar(100) DEFAULT NULL COMMENT '网站关键词',
  `describe` varchar(255) DEFAULT NULL COMMENT '网站描述',
  `company_name` varchar(100) DEFAULT NULL COMMENT '公司名称',
  `company_address` varchar(255) DEFAULT NULL COMMENT '公司地址',
  `record_number` varchar(100) DEFAULT NULL COMMENT '备案号',
  `gzh_code` varchar(255) DEFAULT NULL COMMENT '公众号二维码',
  `kf_code` varchar(255) DEFAULT '' COMMENT '客服二维码',
  `email` varchar(50) DEFAULT NULL COMMENT '邮箱',
  `telephone` varchar(20) DEFAULT NULL COMMENT '联系电话',
  `isadmin` tinyint(1) DEFAULT '0' COMMENT '是否是管理员',
  `balance` decimal(10,2) DEFAULT NULL COMMENT '余额',
  `domain` varchar(255) DEFAULT NULL COMMENT '网站域名',
  `webname` varchar(255) DEFAULT '' COMMENT '网站名称',
  `webtitle` varchar(255) DEFAULT NULL COMMENT '网站标题',
  `qq` varchar(1024) DEFAULT NULL COMMENT '联系QQ',
  `pid` int(11) unsigned DEFAULT NULL COMMENT '开通人员id',
  `rtime` datetime DEFAULT NULL COMMENT '注册时间',
  `isstop` tinyint(1) DEFAULT '0' COMMENT '是否禁用 1:开启  0:禁用',
  `level` int(11) DEFAULT '1' COMMENT '代理级别',
  `register_check` tinyint(1) DEFAULT '1' COMMENT '验证码功能（1开启，2关闭）',
  `agency_token` varchar(255) DEFAULT NULL COMMENT '登录时获取的token',
  `expire_time` varchar(255) DEFAULT NULL COMMENT '登录token到期时间',
  `copyright` varchar(255) DEFAULT NULL COMMENT '版权',
  `registration_audit` int(10) DEFAULT NULL COMMENT '注册审核 （1开启，2关闭）',
  `user_logo` varchar(255) DEFAULT NULL COMMENT '用户后台LOGO',
  `login_logo` varchar(255) DEFAULT NULL COMMENT '登录页LOGO',
  `login_background_status` varchar(255) DEFAULT NULL COMMENT '1: 默认 2:自定义',
  `login_background` varchar(255) DEFAULT NULL COMMENT '登录页背景图',
  `status` int(10) DEFAULT '1' COMMENT '0为停用1为启用',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `lasttime` datetime DEFAULT NULL COMMENT '最后登录时间',
  `pc_official` tinyint(1) DEFAULT NULL COMMENT 'PC官网1开启 2关闭',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='代理用户表';

-- ----------------------------
-- Records of kt_base_agent
-- ----------------------------
INSERT INTO `kt_base_agent` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '狂团', '狂团', '狂团', '狂团', '粤ICP备18075561号', 'http://demo.kt8.cn/storage/upload/base/2022-09-07/6318bc386de87.png', 'http://demo.kt8.cn/storage/upload/base/2022-09-07/6318bc31cdf5b.png', null, '4001188032', '1', '64954003.00', 'demo.kt8.cn', 'KtAdmin', '狂团框架管理系统', '', '0', '2022-08-13 14:10:33', '1', null, '2', '1ca17a84-3d53-11ed-85ab-00163e0ecae0', '1664771618', '狂团KtAdmin框架', '1', 'http://weidogstest.oss-cn-beijing.aliyuncs.com/base/base_63172fd9d4150.png', 'http://weidogstest.oss-cn-beijing.aliyuncs.com/base/base_63172fdf62914.png', '1', 'http://weidogstest.oss-cn-beijing.aliyuncs.com/949c6004e2ceb22f5fde1f650befa0fa.png', '1', null, '2022-09-26 12:26:50', null);

-- ----------------------------
-- Table structure for `kt_base_agent_apporder`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_agent_apporder`;
CREATE TABLE `kt_base_agent_apporder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `wid` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL COMMENT '内容',
  `app_id` int(11) DEFAULT NULL COMMENT '应用id',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  `create_time` datetime DEFAULT NULL,
  `openapp_id` int(11) DEFAULT NULL COMMENT '购买应用id',
  `specs_id` int(1) DEFAULT NULL COMMENT '规格id',
  `bh` varchar(255) DEFAULT NULL COMMENT '订单编号',
  `specs_content` text COMMENT '规格内容',
  `discount_price` decimal(10,2) DEFAULT NULL COMMENT '折后价',
  `setmeal_type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1: 单个开通  2:套餐开通',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of kt_base_agent_apporder
-- ----------------------------

-- ----------------------------
-- Table structure for `kt_base_agent_recharge_record`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_agent_recharge_record`;
CREATE TABLE `kt_base_agent_recharge_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT 'base_agent',
  `money` double NOT NULL COMMENT '充值金额',
  `recharge_time` datetime NOT NULL COMMENT '充值时间',
  `out_trade_no` varchar(255) NOT NULL COMMENT '订单号',
  `type` int(10) DEFAULT '1' COMMENT '1为充值，2为扣除，3为支付',
  `status` int(11) DEFAULT '1',
  `agid` int(10) DEFAULT NULL COMMENT '充值方或者扣除方id',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='代理充值记录';

-- ----------------------------
-- Records of kt_base_agent_recharge_record
-- ----------------------------

-- ----------------------------
-- Table structure for `kt_base_app_package`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_app_package`;
CREATE TABLE `kt_base_app_package` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL COMMENT '代理ID',
  `name` varchar(255) DEFAULT NULL COMMENT '套餐名称',
  `specs` longtext COMMENT '规格{duration:时长；duration_type:1:天2:月3:年；old_price:原价;price:售价}',
  `apps` longtext COMMENT '包含应用',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `ctime` datetime DEFAULT NULL,
  `utime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of kt_base_app_package
-- ----------------------------

-- ----------------------------
-- Table structure for `kt_base_imglib`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_imglib`;
CREATE TABLE `kt_base_imglib` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL COMMENT '账户id',
  `pid` int(11) DEFAULT NULL COMMENT '上级目录',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `url` varchar(255) DEFAULT NULL COMMENT '图片可访问地址',
  `oss_type` tinyint(1) DEFAULT NULL COMMENT '1: 本地 2:阿里云 3:腾讯云 4:七牛云',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='上传的图片库列表';

-- ----------------------------
-- Records of kt_base_imglib
-- ----------------------------

-- ----------------------------
-- Table structure for `kt_base_kt_plugin`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_kt_plugin`;
CREATE TABLE `kt_base_kt_plugin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '应用名称',
  `type` tinyint(1) DEFAULT '1' COMMENT '来源途径: 1:本地上传  2:远程安装',
  `version` varchar(20) DEFAULT NULL COMMENT '已安装版本号',
  `identifie` varchar(255) DEFAULT NULL COMMENT '应用标识',
  `file_name` varchar(255) DEFAULT NULL COMMENT '本地上传的文件名',
  `buytime` char(20) DEFAULT NULL COMMENT '应用购买时间',
  `can_update` tinyint(1) DEFAULT '0' COMMENT '是否可以更新',
  `new_version` varchar(255) DEFAULT NULL COMMENT '最新版本',
  `expire_date` datetime DEFAULT NULL COMMENT '免费升级到期时间',
  `orderbh` varchar(255) DEFAULT NULL COMMENT '订单编号',
  `plugin_id` int(11) DEFAULT NULL COMMENT '插件id',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  `create_time` datetime DEFAULT NULL COMMENT '上传时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `code` varchar(255) DEFAULT NULL COMMENT 'code',
  `uid` int(11) DEFAULT NULL COMMENT '上传者id',
  `dir_name` varchar(255) DEFAULT NULL COMMENT '目录名',
  PRIMARY KEY (`id`),
  UNIQUE KEY `plugin_id` (`plugin_id`) USING BTREE COMMENT '插件id唯一'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='云市场插件记录表';

-- ----------------------------
-- Records of kt_base_kt_plugin
-- ----------------------------

-- ----------------------------
-- Table structure for `kt_base_ktconfig`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_ktconfig`;
CREATE TABLE `kt_base_ktconfig` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL COMMENT '狂团配置  key',
  `secret` varchar(255) DEFAULT NULL COMMENT '狂团配置  secret',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of kt_base_ktconfig
-- ----------------------------

-- ----------------------------
-- Table structure for `kt_base_loginlog`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_loginlog`;
CREATE TABLE `kt_base_loginlog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `wid` int(11) DEFAULT NULL COMMENT '账户id',
  `uip` char(50) DEFAULT NULL COMMENT 'ip',
  `admin` tinyint(1) DEFAULT NULL COMMENT '1: 代理登录  2:用户后台',
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=803 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of kt_base_loginlog
-- ----------------------------
INSERT INTO `kt_base_loginlog` VALUES ('799', '1', '36.99.250.216', '2', '2022-09-26 12:23:26');
INSERT INTO `kt_base_loginlog` VALUES ('800', '1', '36.99.250.197', '1', '2022-09-26 12:24:29');
INSERT INTO `kt_base_loginlog` VALUES ('801', '1', '153.35.52.224', '1', '2022-09-26 12:26:50');
INSERT INTO `kt_base_loginlog` VALUES ('802', '1', '153.35.52.191', '2', '2022-09-26 12:29:34');

-- ----------------------------
-- Table structure for `kt_base_market_app`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_market_app`;
CREATE TABLE `kt_base_market_app` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL COMMENT '代理id',
  `code` varchar(255) DEFAULT NULL COMMENT '应用编码(和配置文件相对应)',
  `name` varchar(255) DEFAULT NULL COMMENT '应用名称',
  `logo` varchar(255) DEFAULT NULL COMMENT '应用图标',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `recom` tinyint(1) DEFAULT '0' COMMENT '推荐 0设为不推荐 1设为推荐',
  `try_days` int(11) DEFAULT NULL COMMENT '试用天数',
  `scene` varchar(255) DEFAULT NULL COMMENT '适用场景',
  `type` int(11) DEFAULT NULL COMMENT '分类',
  `version` varchar(255) DEFAULT NULL COMMENT '已安装版本号',
  `shelves` tinyint(1) DEFAULT '0' COMMENT '上下架 0下架 1上架',
  `label` varchar(255) DEFAULT NULL COMMENT '标签',
  `specs` longtext COMMENT '规格{duration:时长；duration_type:1:天2:月3:年；old_price:原价;price:售价}',
  `user_link` varchar(255) DEFAULT NULL COMMENT '用户后台首页',
  `admin_link` varchar(255) DEFAULT NULL COMMENT '管理后台首页',
  `app_type` tinyint(1) DEFAULT '1' COMMENT '应用类型: 1主应用 2插件 3工具; 注: 插件类型时, 文件夹名必须在主应用后面拼接 plugin, 如demo_plugin_demo',
  `describe` text COMMENT '描述',
  `pid` int(11) DEFAULT '0' COMMENT '非主引擎时 上级id, 最上级为0',
  `c_time` datetime DEFAULT NULL,
  `u_time` datetime DEFAULT NULL,
  `install_type` tinyint(1) DEFAULT '1' COMMENT '来源途径: 1:本地上传  2:远程安装',
  `file_name` varchar(255) DEFAULT NULL COMMENT '本地上传的文件名',
  `expire_date` datetime DEFAULT NULL COMMENT '免费升级到期时间',
  `orderbh` varchar(255) DEFAULT NULL COMMENT '订单编号',
  `target` tinyint(1) DEFAULT '2' COMMENT '首页打开方式1：当前窗口 2新窗口',
  `author` varchar(255) DEFAULT NULL COMMENT '作者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of kt_base_market_app
-- ----------------------------
INSERT INTO `kt_base_market_app` VALUES ('11', '1', 'demo', '狂团demo应用', 'https://kt8logo.oss-cn-beijing.aliyuncs.com/app.png', '1', '0', '7', '狂团dmeo应用，基于KtAdmin可以快速开发出各种saas应用\n', '6', '1.0.0', '1', '[\"\\u72c2\\u56e2\",\"\\u6d4b\\u8bd5\\u5e94\\u7528\",\"\\u4f18\\u8d28\\u5e94\\u7528\"]', '[{\"id\":1,\"duration\":\"1\",\"price\":\"1\",\"old_price\":\"1000\",\"duration_type\":\"3\",\"index\":0}]', '/demo/user/index', '/demo/admin/index', '1', '这是一个demo示例应用', '0', null, '2022-09-08 16:09:47', '1', null, null, null, '2', null);

-- ----------------------------
-- Table structure for `kt_base_market_type`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_market_type`;
CREATE TABLE `kt_base_market_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL COMMENT '代理id',
  `name` varchar(255) DEFAULT NULL COMMENT '分类名称',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `level` int(11) DEFAULT '1' COMMENT '等级 1:一级分类 2：二级分类',
  `pid` int(11) DEFAULT NULL COMMENT '上级分类id',
  `c_time` datetime DEFAULT NULL,
  `u_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of kt_base_market_type
-- ----------------------------
INSERT INTO `kt_base_market_type` VALUES ('6', '1', '默认', '1', '1', '0', '2022-09-08 16:02:13', null);

-- ----------------------------
-- Table structure for `kt_base_pay_config`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_pay_config`;
CREATE TABLE `kt_base_pay_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `config` text COMMENT '支付配置',
  `type` varchar(100) DEFAULT NULL COMMENT '类型: wx 微信  ali 支付宝',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='支付配置';

-- ----------------------------
-- Records of kt_base_pay_config
-- ----------------------------
INSERT INTO `kt_base_pay_config` VALUES ('3', '1', '1,1,1,1', 'wx');

-- ----------------------------
-- Table structure for `kt_base_recharge`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_recharge`;
CREATE TABLE `kt_base_recharge` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bh` char(50) DEFAULT NULL COMMENT '编号',
  `order_bh` char(50) DEFAULT NULL COMMENT '订单编号',
  `wid` int(11) DEFAULT NULL COMMENT '账户id',
  `uip` char(50) DEFAULT NULL COMMENT '请求ip',
  `amount` decimal(10,2) DEFAULT NULL COMMENT '金额',
  `status` char(50) DEFAULT NULL COMMENT '状态',
  `alipayzt` char(50) DEFAULT NULL,
  `bz` varchar(250) NOT NULL,
  `ifok` int(11) DEFAULT NULL COMMENT '是否支付 1:已支付  0:未支付',
  `wxddbh` char(50) DEFAULT NULL COMMENT '微信订单编号',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL,
  `jyh` varchar(255) DEFAULT NULL COMMENT '交易单号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of kt_base_recharge
-- ----------------------------
INSERT INTO `kt_base_recharge` VALUES ('41', '202209081604235125|1', '202209081604235125|1', '1', '', '1.00', '等待买家付款', null, '微信', '0', null, '2022-09-08 16:04:23', '2022-09-08 16:04:23', null);

-- ----------------------------
-- Table structure for `kt_base_robot`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_robot`;
CREATE TABLE `kt_base_robot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL COMMENT 'url连接地址',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of kt_base_robot
-- ----------------------------

-- ----------------------------
-- Table structure for `kt_base_sms_config`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_sms_config`;
CREATE TABLE `kt_base_sms_config` (
  `id` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL COMMENT '代理id',
  `access_key_id` varchar(255) DEFAULT NULL COMMENT '阿里云短信key',
  `access_key_secret` varchar(255) DEFAULT NULL COMMENT '阿里云短信密钥',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='阿里云短信配置';

-- ----------------------------
-- Records of kt_base_sms_config
-- ----------------------------
INSERT INTO `kt_base_sms_config` VALUES ('1', '1', '123', 'dcs');

-- ----------------------------
-- Table structure for `kt_base_sms_template`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_sms_template`;
CREATE TABLE `kt_base_sms_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `bh` varchar(20) DEFAULT NULL,
  `sign_name` varchar(100) DEFAULT NULL,
  `template_code` varchar(100) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of kt_base_sms_template
-- ----------------------------
INSERT INTO `kt_base_sms_template` VALUES ('3', '1', '001', '1', '1', '1');

-- ----------------------------
-- Table structure for `kt_base_storage_config`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_storage_config`;
CREATE TABLE `kt_base_storage_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL COMMENT '账户id',
  `type` tinyint(1) DEFAULT '1' COMMENT '1: local本地 2:oss阿里云 3: cos 腾讯云 4: kodo七牛云',
  `oss_id` varchar(100) DEFAULT NULL COMMENT '阿里云 id',
  `oss_secret` varchar(100) DEFAULT NULL COMMENT '阿里云 secret',
  `oss_endpoint` varchar(100) DEFAULT NULL COMMENT '阿里云  访问域名',
  `oss_bucket` varchar(100) DEFAULT NULL COMMENT '阿里云bucket',
  `cos_secretId` varchar(100) DEFAULT NULL COMMENT '腾讯云 id',
  `cos_secretKey` varchar(100) DEFAULT NULL COMMENT '腾讯云 key',
  `cos_bucket` varchar(100) DEFAULT NULL COMMENT '腾讯云 bucket',
  `cos_endpoint` varchar(100) DEFAULT NULL COMMENT '腾讯云 endpoint',
  `kodo_key` varchar(100) DEFAULT NULL COMMENT '七牛云 key',
  `kodo_secret` varchar(100) DEFAULT NULL COMMENT '七牛云 secret',
  `kodo_domain` varchar(100) DEFAULT NULL COMMENT '七牛云 domain',
  `kodo_bucket` varchar(100) DEFAULT NULL COMMENT '七牛云 bucket',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='云存储配置';

-- ----------------------------
-- Records of kt_base_storage_config
-- ----------------------------

-- ----------------------------
-- Table structure for `kt_base_user`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_user`;
CREATE TABLE `kt_base_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `un` varchar(200) NOT NULL COMMENT '用户名',
  `pwd` varchar(32) NOT NULL COMMENT '密码',
  `email` varchar(50) DEFAULT NULL COMMENT '邮箱',
  `telephone` varchar(20) DEFAULT NULL COMMENT '电话',
  `qq` int(11) DEFAULT NULL COMMENT 'qq',
  `logtimes` bigint(20) DEFAULT '0' COMMENT '登录次数 每登一次加一',
  `isadmin` tinyint(1) DEFAULT '1' COMMENT '1: 管理账户 2:子用户',
  `level_id` tinyint(1) DEFAULT '1' COMMENT '用户级别',
  `mendtime` datetime DEFAULT NULL COMMENT '到期时间',
  `agid` int(11) unsigned DEFAULT '0' COMMENT '上级代理id',
  `isstop` tinyint(1) DEFAULT '1' COMMENT '账号状态: 1正常   0:停用，2待审核',
  `xiane` smallint(6) DEFAULT '1' COMMENT '账户限额',
  `balance` decimal(10,2) DEFAULT NULL COMMENT '账户余额',
  `alias` varchar(255) DEFAULT NULL COMMENT '别名',
  `token` varchar(255) DEFAULT NULL COMMENT 'token',
  `expire_time` char(20) DEFAULT '' COMMENT 'token过期时间',
  `create_time` datetime DEFAULT NULL COMMENT '注册时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `status` int(10) DEFAULT '1' COMMENT '1为正常，0为禁用，2为作废',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注信息',
  `contacts` varchar(255) DEFAULT NULL COMMENT '联系人',
  `lasttime` datetime DEFAULT NULL COMMENT '最后一次登陆时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `user_un` (`un`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='系统用户（客户）表';

-- ----------------------------
-- Records of kt_base_user
-- ----------------------------
INSERT INTO `kt_base_user` VALUES ('1', '123456', 'e10adc3949ba59abbe56e057f20f883e', null, '', null, '138', '2', '2', '2022-10-31 00:00:00', '1', '1', '1', '9997.00', '33', 'f727a990-3d52-11ed-9364-00163e0ecae0', '1664771532', '2020-08-01 18:09:54', '2022-09-26 12:32:04', '1', null, '123', '2022-09-26 12:29:34');

-- ----------------------------
-- Table structure for `kt_base_user_appauth`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_user_appauth`;
CREATE TABLE `kt_base_user_appauth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wid` int(11) DEFAULT NULL COMMENT '账户id',
  `title` varchar(255) DEFAULT NULL COMMENT '应用标题',
  `code` varchar(255) DEFAULT NULL COMMENT '应用标识',
  `create_time` datetime DEFAULT NULL,
  `mend_time` datetime DEFAULT NULL COMMENT '到期时间',
  `set_meal` int(10) DEFAULT NULL COMMENT '对应表套餐id',
  `name` varchar(255) DEFAULT NULL COMMENT '应用名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='用户应用权限';

-- ----------------------------
-- Records of kt_base_user_appauth
-- ----------------------------

-- ----------------------------
-- Table structure for `kt_base_user_openapp`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_user_openapp`;
CREATE TABLE `kt_base_user_openapp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wid` int(11) DEFAULT NULL COMMENT '账户id',
  `title` varchar(255) DEFAULT NULL COMMENT '应用标题',
  `code` varchar(255) DEFAULT NULL COMMENT '应用标识',
  `mend_time` datetime DEFAULT NULL COMMENT '到期时间',
  `name` varchar(255) DEFAULT NULL COMMENT '应用名称',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `app_id` int(11) DEFAULT NULL COMMENT '引擎id',
  `logo` varchar(255) DEFAULT NULL COMMENT 'logo',
  `version` varchar(255) DEFAULT NULL COMMENT '版本',
  `sequence` int(5) DEFAULT NULL COMMENT '序号 越大越靠前',
  `self_title` varchar(255) DEFAULT NULL COMMENT '自定义标题',
  `pid` int(11) DEFAULT '0' COMMENT '上级id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='用户购买的引擎';

-- ----------------------------
-- Records of kt_base_user_openapp
-- ----------------------------
INSERT INTO `kt_base_user_openapp` VALUES ('12', '1', null, 'demo', '2025-09-15 16:05:07', '狂团demo应用', '2022-09-08 16:05:07', '2022-09-26 12:32:04', '11', 'https://kt8logo.oss-cn-beijing.aliyuncs.com/app.png', '1.0.0', '1', '6666', '0');

-- ----------------------------
-- Table structure for `kt_base_user_order`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_user_order`;
CREATE TABLE `kt_base_user_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wid` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL COMMENT '内容',
  `app_id` int(11) DEFAULT NULL COMMENT '应用id',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  `create_time` datetime DEFAULT NULL,
  `openapp_id` int(11) DEFAULT NULL COMMENT '购买应用id',
  `status` tinyint(1) DEFAULT NULL COMMENT '1:待支付  2:支付成功 3:支付失败',
  `balance_pay` decimal(10,2) DEFAULT NULL COMMENT '余额支付金额',
  `specs_id` int(1) DEFAULT NULL COMMENT '规格id',
  `bh` varchar(255) DEFAULT NULL COMMENT '订单编号',
  `specs_content` text COMMENT '规格内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of kt_base_user_order
-- ----------------------------
INSERT INTO `kt_base_user_order` VALUES ('55', '1', null, '11', '1.00', '2022-09-08 16:04:23', null, '1', null, '1', '202209081604235125|1', '{\"id\":1,\"duration\":\"1\",\"price\":\"1\",\"old_price\":\"1000\",\"duration_type\":\"3\",\"index\":0}');
INSERT INTO `kt_base_user_order` VALUES ('56', '1', null, '11', '1.00', '2022-09-08 16:04:45', null, '1', null, '1', '202209081604457371|1', '{\"id\":1,\"duration\":\"1\",\"price\":\"1\",\"old_price\":\"1000\",\"duration_type\":\"3\",\"index\":0}');
INSERT INTO `kt_base_user_order` VALUES ('57', '1', '用户试用', '11', '0.00', '2022-09-08 16:05:07', '12', '2', null, null, null, null);
INSERT INTO `kt_base_user_order` VALUES ('58', '1', null, '11', '1.00', '2022-09-08 16:14:59', null, '1', null, '1', '202209081614598412|1', '{\"id\":1,\"duration\":\"1\",\"price\":\"1\",\"old_price\":\"1000\",\"duration_type\":\"3\",\"index\":0}');
INSERT INTO `kt_base_user_order` VALUES ('59', '1', null, '11', '1.00', '2022-09-08 16:21:44', null, '1', null, '1', '202209081621447164|1', '{\"id\":1,\"duration\":\"1\",\"price\":\"1\",\"old_price\":\"1000\",\"duration_type\":\"3\",\"index\":0}');
INSERT INTO `kt_base_user_order` VALUES ('60', '1', null, '11', '1.00', '2022-09-08 16:21:47', null, '1', null, '1', '202209081621471603|1', '{\"id\":1,\"duration\":\"1\",\"price\":\"1\",\"old_price\":\"1000\",\"duration_type\":\"3\",\"index\":0}');
INSERT INTO `kt_base_user_order` VALUES ('61', '1', '用户购买规格时长1年的套餐', '11', '1.00', '2022-09-08 16:23:27', null, '2', null, '1', '202209081623276569|1', '{\"id\":1,\"duration\":\"1\",\"price\":\"1\",\"old_price\":\"1000\",\"duration_type\":\"3\",\"index\":0}');
INSERT INTO `kt_base_user_order` VALUES ('62', '1', '用户购买规格时长1年的套餐', '11', '1.00', '2022-09-08 16:24:42', null, '2', null, '1', '202209081624429084|1', '{\"id\":1,\"duration\":\"1\",\"price\":\"1\",\"old_price\":\"1000\",\"duration_type\":\"3\",\"index\":0}');
INSERT INTO `kt_base_user_order` VALUES ('63', '1', '用户购买规格时长1年的套餐', '11', '1.00', '2022-09-26 12:32:04', null, '2', null, '1', '202209261232049885|1', '{\"id\":1,\"duration\":\"1\",\"price\":\"1\",\"old_price\":\"1000\",\"duration_type\":\"3\",\"index\":0}');

-- ----------------------------
-- Table structure for `kt_base_user_recharge_record`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_user_recharge_record`;
CREATE TABLE `kt_base_user_recharge_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT 'base_user',
  `money` double NOT NULL COMMENT '充值金额',
  `recharge_time` datetime NOT NULL COMMENT '充值时间',
  `out_trade_no` varchar(255) NOT NULL COMMENT '订单号',
  `type` int(10) DEFAULT '1' COMMENT '1为充值，2为扣除，3为支付',
  `status` int(11) DEFAULT '1',
  `agid` int(10) DEFAULT NULL COMMENT '充值方或者扣除方id',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='用户充值记录';

-- ----------------------------
-- Records of kt_base_user_recharge_record
-- ----------------------------
INSERT INTO `kt_base_user_recharge_record` VALUES ('27', '1', '10000', '2022-09-08 16:04:38', '20220908160438166262427857771', '1', '1', '1', '');

-- ----------------------------
-- Table structure for `kt_base_user_template`
-- ----------------------------
DROP TABLE IF EXISTS `kt_base_user_template`;
CREATE TABLE `kt_base_user_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL COMMENT '代理id',
  `code` varchar(255) DEFAULT NULL COMMENT '应用标识',
  `ctime` datetime DEFAULT NULL,
  `utime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of kt_base_user_template
-- ----------------------------
