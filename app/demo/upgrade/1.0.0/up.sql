SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for aa
-- ----------------------------
DROP TABLE IF EXISTS `aa`;
CREATE TABLE `aa`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wid` int(11) NULL DEFAULT NULL,
  `aa` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '11' COMMENT '哈哈',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for bb
-- ----------------------------
DROP TABLE IF EXISTS `bb`;
CREATE TABLE `bb`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wid` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

SET FOREIGN_KEY_CHECKS = 1;
