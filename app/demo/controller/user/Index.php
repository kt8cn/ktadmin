<?php
declare (strict_types = 1);

namespace app\demo\controller\user;
use app\demo\controller\BaseUser;

class Index extends BaseUser
{
    public function index()
    {
    	return view();
    }
}
