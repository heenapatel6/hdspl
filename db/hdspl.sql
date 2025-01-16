-- Adminer 4.8.1 MySQL 10.3.15-MariaDB dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `hdspl_admin_sessions`;
CREATE TABLE `hdspl_admin_sessions` (
  `id` varchar(40) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int(10) unsigned NOT NULL DEFAULT 0,
  `data` blob NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `hdspl_sessions`;
CREATE TABLE `hdspl_sessions` (
  `id` varchar(40) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int(10) unsigned NOT NULL DEFAULT 0,
  `data` blob NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `logs_email`;
CREATE TABLE `logs_email` (
  `email_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` text NOT NULL,
  `email_type` tinyint(1) NOT NULL,
  `module_type` tinyint(4) NOT NULL,
  `module_id` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_time` datetime NOT NULL,
  `is_delete` tinyint(1) NOT NULL,
  PRIMARY KEY (`email_log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `logs_login_details`;
CREATE TABLE `logs_login_details` (
  `logs_login_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ip_address` varchar(20) NOT NULL,
  `login_timestamp` int(11) NOT NULL,
  `logout_timestamp` int(11) NOT NULL,
  `logs_data` text NOT NULL,
  `created_time` datetime NOT NULL,
  `updated_time` datetime NOT NULL,
  PRIMARY KEY (`logs_login_details_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `plans`;
CREATE TABLE `plans` (
  `plan_id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_name` varchar(200) NOT NULL,
  `plan_code` varchar(200) NOT NULL,
  `plan_duration` varchar(500) NOT NULL,
  `price` int(11) NOT NULL,
  `otts` text NOT NULL,
  `subscriber_price` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_time` datetime NOT NULL,
  `updated_by` int(11) NOT NULL,
  `updated_time` datetime NOT NULL,
  `is_delete` tinyint(1) NOT NULL,
  PRIMARY KEY (`plan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `plans` (`plan_id`, `plan_name`, `plan_code`, `plan_duration`, `price`, `otts`, `subscriber_price`, `status`, `created_by`, `created_time`, `updated_by`, `updated_time`, `is_delete`) VALUES
(1,	'Creators Elegant Monthly Pack',	'ott_monthly_creatorscommunication_elegant',	'2',	160,	'1,2,3,4,5,6,7,8,9,10',	170,	0,	1,	'2025-01-13 10:20:33',	1,	'2025-01-15 18:28:22',	0),
(2,	'Test 2',	'TEst_12345',	'1',	125,	'7,10',	0,	0,	1,	'2025-01-13 11:46:05',	1,	'2025-01-13 15:48:47',	0),
(3,	'Test 3',	'TEst_1235689',	'2',	150,	'4,10',	0,	0,	1,	'2025-01-13 12:31:14',	1,	'2025-01-15 11:03:33',	0),
(4,	'Test 4',	'TEst_123',	'2',	160,	'1,8,9',	0,	0,	1,	'2025-01-13 12:31:26',	1,	'2025-01-13 15:48:32',	0);

DROP TABLE IF EXISTS `sa_logs_change_password`;
CREATE TABLE `sa_logs_change_password` (
  `sa_logs_change_password_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sa_user_id` bigint(20) NOT NULL,
  `old_password` text NOT NULL,
  `new_password` text NOT NULL,
  `created_time` datetime NOT NULL,
  PRIMARY KEY (`sa_logs_change_password_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `sa_logs_login_details`;
CREATE TABLE `sa_logs_login_details` (
  `sa_logs_login_details_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sa_user_id` bigint(20) NOT NULL,
  `ip_address` varchar(20) NOT NULL,
  `login_timestamp` int(11) NOT NULL,
  `logout_timestamp` int(11) NOT NULL,
  `logs_data` text NOT NULL,
  `created_time` datetime NOT NULL,
  `updated_time` datetime NOT NULL,
  PRIMARY KEY (`sa_logs_login_details_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `sa_users`;
CREATE TABLE `sa_users` (
  `sa_user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `user_type` tinyint(1) NOT NULL,
  `district` tinyint(1) NOT NULL,
  `assign_villages` text NOT NULL,
  `is_deactive` tinyint(1) NOT NULL,
  `is_npp` tinyint(1) NOT NULL,
  `npp_datetime` datetime NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_time` datetime NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `updated_time` datetime NOT NULL,
  `is_delete` tinyint(1) NOT NULL,
  PRIMARY KEY (`sa_user_id`),
  KEY `is_delete` (`is_delete`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `sa_users` (`sa_user_id`, `name`, `username`, `password`, `user_type`, `district`, `assign_villages`, `is_deactive`, `is_npp`, `npp_datetime`, `created_by`, `created_time`, `updated_by`, `updated_time`, `is_delete`) VALUES
(1,	'Admin',	'admin',	'a4ada4c5d99b252d7a97903dc0881c8464353134633462333038333833356239326139626264383931633333613930383861666664663961386230656666663166626438313832356430643064646564dd1619430cf1c8df420c',	1,	0,	'',	0,	1,	'2025-01-11 11:47:28',	1,	'2020-03-25 17:20:00',	1,	'2025-01-11 11:47:28',	0);

DROP TABLE IF EXISTS `sa_user_type`;
CREATE TABLE `sa_user_type` (
  `sa_user_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(200) NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_time` datetime NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `updated_time` datetime NOT NULL,
  `is_delete` tinyint(1) NOT NULL,
  PRIMARY KEY (`sa_user_type_id`),
  KEY `is_delete` (`is_delete`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `sa_user_type` (`sa_user_type_id`, `type`, `created_by`, `created_time`, `updated_by`, `updated_time`, `is_delete`) VALUES
(1,	'Admin',	1,	'2020-03-25 13:54:00',	0,	'0000-00-00 00:00:00',	0);

-- 2025-01-16 05:40:45
