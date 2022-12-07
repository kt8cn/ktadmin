<?php 
// +----------------------------------------------------------------------
// | 狂团[kt8.cn]旗下KtAdmin是为独立版SAAS系统而生的快速开发框架.
// +----------------------------------------------------------------------
// | [KtAdmin] Copyright (c) 2022 http://ktadmin.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------

namespace app\base\model;
use think\facade\Db;
use think\facade\Session;

/*
* 基础功能model
*/
class BaseModel
{
	static protected $uid;
	/**
	 * 获取应用下xml配置信息
	 * @param $app 应用目录
	 * @return
	 */
	static public function getMainfest($app){
		$path = base_path().'/'.$app.'/mainfest.xml';
		$xml = [];
		if(is_file($path)) $xml = json_decode(json_encode(simplexml_load_file($path,'SimpleXMLElement', LIBXML_NOCDATA)), 1);
		return $xml;
	}
	/**
	 * 获取 随机数
	 * @param leg  长度
	 * @return 
	 */
	static public function  getCode(){
		return rand(100000,999999);
	}
	/**
	 * 获取 
	 * @param $host 域名,不带协议
	 * @return 
	 */
	static public function  getLoginInfo($host){
		$admin = Db::table('kt_base_agent')->field('id,key_word,describe,record_number,user_logo,login_logo,domain,webname,webtitle,login_background,register_check,registration_audit,company_name')->where('domain',$host)->find();
		if(!$admin) $admin = Db::table('kt_base_agent')->field('id,key_word,record_number,describe,user_logo,login_logo,domain,webname,webtitle,login_background,register_check,registration_audit,company_name')->where('isadmin',1)->find();
		return $admin;
	}

	/**
	 * 判断当前代理是否是 管理员
	 * 
	 * @return 
	 */
	static public function  isAdmin($uid){
		$res = Db::table('kt_base_agent')->where('id',$uid)->value('isadmin') ?: 0;
		return $res;
	}
	/**
	 * 获取管理员id
	 * 
	 * @return 
	 */
	static public function  getAdminId(){
		$res = Db::table('kt_base_agent')->where('isadmin',1)->value('id');
		return $res;
	}
	/**
	 * 根据文件夹获取配置信息
	 * @return 
	 */
	static public function  getMainfestByName($code){
		$res = [];
		$base = base_path();
		$filePath = $base."/".$code."/mainfest.xml";
		if(is_file($filePath)){
            $xml=simplexml_load_file($filePath,'SimpleXMLElement', LIBXML_NOCDATA);
            $xmlArr = json_decode(json_encode($xml), 1);
            if(isset($xmlArr['application'])) $res = $xmlArr['application'];
        }
		return $res;
	}
	
	/**
	 * 获取当前代理下所有代理id,包括下级的下级代理id
	 * 
	 * @return $ids 代理id array()
	 */
	static public function  getAdentIds($uid){
		$ids = [];
		$ids[] = $uid;
		self::getAdentId($uid,$ids);
		return $ids;
	}
	static public function  getAdentId($uid,&$ids){
		$res = Db::table('kt_base_agent')->where('pid',$uid)->column('id');
		if(count($res)>0){
			foreach ($res as $id) {
				$ids[] = $id;
				self::getAdentId($id,$ids);
			}
		}
		return $ids;
	}

	/**
	 * 获取 云存储配置, 当前代理未设置自动获取上级代理配置
	 * @param $uid 账户id
	 * @return 
	 */
 	static public function getStorageInfo($uid=''){
 		$uid = $uid ?: Session::get('uid');
		$res = Db::table('kt_base_storage_config')->field('uid,type,oss_id,oss_secret,oss_endpoint,oss_bucket,cos_secretId,cos_secretKey,cos_bucket,cos_endpoint,kodo_key,kodo_secret,kodo_domain,kodo_bucket')->where('uid',$uid)->find();
		if(!$res){
			$user = Db::table('kt_base_agent')->find($uid);
			if($user['isadmin'] == 1) return $res;
			$res = self::getStorageInfo($user['pid']);
		}
		return $res;
	}

	/**
	 * 获取 当前用户云存储配置
	 * @param $uid 账户id
	 * @return 
	 */
 	static public function storageInfo(){
 		$uid = Session::get('uid');
		$res = Db::table('kt_base_storage_config')->field('uid,type,oss_id,oss_secret,oss_endpoint,oss_bucket,cos_secretId,cos_secretKey,cos_bucket,cos_endpoint,kodo_key,kodo_secret,kodo_domain,kodo_bucket')->where('uid',$uid)->find();
		return $res;
	}

	/**
	 * 保存 云存储配置
	 * @param $data 更新数据 array
	 * @return 
	 */
 	static public function storageUpdate($data){
 		$uid = Session::get('uid');
 		$config =  Db::table('kt_base_storage_config')->where('uid',$uid)->find();
 		$param = [];
 		if($config) $param['id'] = $config['id'];
 		$param['uid'] = $uid;
 		$param['type'] = $data['type'];
 		switch ($data['type']) {
 			case '2':
 				$param['oss_id'] = $data['oss_id'];
 				$param['oss_secret'] = $data['oss_secret'];
 				$param['oss_endpoint'] = $data['oss_endpoint'];
 				$param['oss_bucket'] = $data['oss_bucket'];
 				break;
 			case '3':
 				$param['cos_secretId'] = $data['cos_secretId'];
 				$param['cos_secretKey'] = $data['cos_secretKey'];
 				$param['cos_bucket'] = $data['cos_bucket'];
 				$param['cos_endpoint'] = $data['cos_endpoint'];
 				break;
 			case '4':
 				$param['kodo_key'] = $data['kodo_key'];
 				$param['kodo_secret'] = $data['kodo_secret'];
 				$param['kodo_domain'] = $data['kodo_domain'];
 				$param['kodo_bucket'] = $data['kodo_bucket'];
 				break;
 		}
		$res = Db::table('kt_base_storage_config')->save($param);
		return 'ok';
	}

	/**
	 * 初始化云存储数据
	 * @return 
	 */
	static private function inisetStorage(){
		$uid = Session::get('uid');
		$config = Db::table('kt_base_storage_config')->where('wid',$wid)->find();
		if(!$config){
			Db::table('kt_base_storage_config')->insert(
			 	[
			 		'uid' => $uid,
			 		'type' => 1,
			 		'create_time'=>date("Y-m-d H:i:s"),
			 		'update_time'=>date("Y-m-d H:i:s"),
			 	]
			);
		} 
	}
}