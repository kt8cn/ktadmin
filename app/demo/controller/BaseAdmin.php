<?php

namespace app\demo\controller;

use app\BaseController;
use think\facade\Db;
use think\Request;
use think\facade\Session;

class BaseAdmin extends BaseController
{
    protected $req;
    protected $admin;
    protected $uid;
    protected $token;
    protected $host;

    public function  __construct(Request $request){
        if(Session::has('uid')) Session::delete('uid');
        $this->req = $request;
        $this->host  = $request->host();
        //$this->token = $this->req->header('AdminToken');
        $this->token = Session::get('AdminToken');
        $this->admin = Db::table('kt_base_agent')->where([['agency_token', '=', $this->token], ['expire_time', '>',time()]])->find();
        if($this->admin){
            $this->uid = $this->admin['id'];
            Session::set('uid',$this->admin['id']);
        }
    }   
}