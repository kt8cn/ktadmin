<?php

namespace app\demo\controller;

use app\BaseController;
use think\facade\Db;
use think\Request;
use think\facade\Session;

class BaseUser extends BaseController
{
    protected $req;
    protected $user;
    protected $wid;
    protected $token;


    public function  __construct(Request $request){
        $this->req = $request;
        $this->host  = $request->host();
        $url  = $request->url();
        //$this->token = $this->req->header('UserToken');
        $this->token = Session::get('UserToken');
        $this->user = Db::table('kt_base_user')->where([['token', '=', $this->token], ['expire_time', '>',time()]])->find();
        if($this->user){
            $this->wid = $this->user['id'];
            Session::set('wid',$this->user['id']);
            Session::set('uid',$this->user['agid']);
        } 
    }
}