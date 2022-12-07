<?php
// 事件定义文件
return [
    'bind'      => [
    ],

    'listen'    => [
        'AppInit'  => [],
        'HttpRun'  => [],
        'HttpEnd'  => [],
        'LogLevel' => [],
        'LogWrite' => [],
        'CustomerCallback'=>[
            'app\wework\listener\CustomerQrCallback',
            'app\wework_test\listener\CustomerCallback',
        ],
        'CustomerDelExternal'=>[
            'app\wework\listener\CustomerDelExternal',
        ],
        'CustomerDelFollow'=>[
            'app\wework\listener\CustomerDelFollow',
        ]
    ],

    'subscribe' => [
    ],
];
