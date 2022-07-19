/*
 Navicat Premium Data Transfer

 Source Server         : happy
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : element

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 19/07/2022 20:46:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for good_search
-- ----------------------------
DROP TABLE IF EXISTS `good_search`;
CREATE TABLE `good_search`  (
  `id` int(10) NOT NULL,
  `imgUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pprice` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `oprice` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `discount` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of good_search
-- ----------------------------
INSERT INTO `good_search` VALUES (1, '../../static/img/commodity (1).jpg', '大姨绒毛大款2020年必须买,不买你就不行了', '299', '659', '5.2');
INSERT INTO `good_search` VALUES (2, '../../static/img/commodity (1).jpg', '大款', '399', '659', '5.2');
INSERT INTO `good_search` VALUES (3, '../../static/img/commodity (1).jpg', '大款绒毛大款2020年必须买,不买你就不行了', '499', '659', '5.2');
INSERT INTO `good_search` VALUES (4, '../../static/img/commodity (1).jpg', '大姨绒毛大款2020年必须买,不买你就不行了', '599', '659', '5.2');

SET FOREIGN_KEY_CHECKS = 1;
