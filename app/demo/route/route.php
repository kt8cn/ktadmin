<?php

use think\facade\Route;
/**
 * 管理后台
 */
Route::group('admin', function () {
	Route::any('/index', 'admin.index/index'); //首页
})->middleware(app\demo\middleware\admincheck::class);


/**
 * 用户后台
 */
Route::group('user',function(){
	Route::any('/index', 'user.index/index'); //首页
})->middleware(app\demo\middleware\check::class);