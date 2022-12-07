export const levelList = [
	{
		name: '青铜等级',
		titleList: [{ text: '经营值达到', num: 100 }],
		path: 'level1.751e5590.png',
		background: 'linear-gradient(to right bottom, rgb(246, 232, 221), rgb(215, 176, 155))',
		color: 'rgb(127, 89, 75)'
	},
	{
		name: '白银等级',
		titleList: [{ text: '经营值达到', num: 110 }],
		path: 'level2.38911613.png',
		background: 'linear-gradient(to right bottom, rgb(237, 235, 247), rgb(192, 199, 226))',
		color: 'rgb(96, 104, 138)'
	},
	{
		name: '白银等级',
		titleList: [{ text: '经营值达到', num: 110 }],
		path: 'level3.f2e03e3a.png',
		background: 'linear-gradient(to right bottom, rgb(246, 238, 218), rgb(226, 187, 128))',
		color: 'rgb(143, 102, 73)'
	},

	{
		name: '铂金Lv1等级',
		titleList: [{ text: '经营值达到', num: 210 }],
		path: 'level1.751e5590.png',
		background: 'linear-gradient(to right bottom, rgb(241, 239, 253), rgb(176, 176, 226))',
		color: 'rgb(109, 105, 154)'
	},
	{
		name: '铂金Lv2等级',
		titleList: [{ text: '经营值达到', num: 280 }],
		path: 'level2.38911613.png',
		background: 'linear-gradient(to right bottom, rgb(241, 239, 253), rgb(176, 176, 226))',
		color: 'rgb(109, 105, 154)'
	},
	{
		name: '砖石Lv1等级',
		titleList: [
			{ text: '经营值达到', num: 380 },
			{ text: '且粉丝量达到', num: 10000 }
		],
		path: 'level3.f2e03e3a.png',
		background: 'linear-gradient(to right bottom, rgb(127, 174, 233), rgb(77, 126, 204))',
		color: 'rgb(255, 255, 255)'
	}
]
export const equityList = [
	{
		name: '青铜权益',
		children: [
			{
				title: '在线预约',
				path: 'data:image/png;base64,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',
				markText: ''
			},
			{
				title: '团购工具',
				path: 'data:image/png;base64,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',
				markText: ''
			},
			{
				title: '线索搜集',
				path: 'data:image/png;base64,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',
				markText: ''
			},
			{
				title: '行业工具',
				path: 'data:image/png;base64,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',
				markText: ''
			},
			{
				title: '官网主页',
				path: 'data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QDKRXhpZgAATU0AKgAAAAgABgESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgEoAAMAAAABAAIAAAITAAMAAAABAAEAAIdpAAQAAAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAeQAAAHAAAABDAyMjGRAQAHAAAABAECAwCgAAAHAAAABDAxMDCgAQADAAAAAQABAACgAgAEAAAAAQAAAGCgAwAEAAAAAQAAAGCkBgADAAAAAQAAAAAAAAAAAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wgARCABgAGADASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAAIDBAYBBwX/xAAXAQEBAQEAAAAAAAAAAAAAAAABAAID/9oADAMBAAIQAxAAAAH1QOURxroZQQZSppKrDZOdy8ryQ6ABAKNXj5/0KAKaxVlFFBAM41jGxc7c5dhiivUzMafj0GUIGWivYgrzDWZH0zrj4eS9O8ur0y5Tuc9gMUkNquKo5oyL6sTKJrioZgElSxl7zplrLaj0QjKgHa4zyjxgy//EACQQAAEDBAEEAwEAAAAAAAAAAAEAAgQDEBEgBRUxMzQSEzBB/9oACAEBAAEFArlyyb5KDtSic7g4QObk5/EHFn6ypLI7YspkgaMTu95s5tFPeXua4tdCniroO9+Rk1Gu046VU+e1fw/yPxtOpRq8XTbSUP1bu72r+BQ/Ur+BQ/UsO77vHyZ0crpL10l66OVSZ9dKzLEY/EDNyMojG4GUBjUtWL4Qbp//xAAYEQADAQEAAAAAAAAAAAAAAAABEBEAIP/aAAgBAwEBPwHV1HkO68jHBFTRBTn/xAAaEQACAwEBAAAAAAAAAAAAAAABEAACERIg/9oACAECAQE/AZjxDyUBsrXJYbCM8XMoYUF0Z0UVr1f/xAAnEAABAwEFCQEAAAAAAAAAAAABAAIDERAgITFyEiIwMzRQUaGxQf/aAAgBAQAGPwLtO9n+BbuDvHC2Y8ZPiLnmpKDmmhCDJcH/AHgGGFprSpN1sMoJrkb8mk2Me57qkVTnNe6oFkOm/JpNkOlSaTZDpvub5FFzvS6hdQud6TWZ7Ip2TG5//8QAJBAAAgEEAQMFAQAAAAAAAAAAAAERECExQSBRYaEwcZHR8MH/2gAIAQEAAT8hqnVxuGIStnVE+DQh3s5s9hAoyZ29GZ2E7DQo4yZ5fDljvgZfi2hpbgscXiDuGQ2PwYTRaxreuB4QeapoLBWiZvmsjsJE9NV2O1VU8Kf5EhZDZFBMpp3gmwikhTG/BIav7nQ0eJP3OgsHgarKCbrPjhOHQUwYf4f2dz8P7OxMVOwlVNjRM9GQJWpAuM5mYEDg1J0RutVTvVElGK//2gAMAwEAAgADAAAAEPPP/wBzTz7/AO/c943/APr9fp43O2LL3/dLGNf7PP/EABkRAAMBAQEAAAAAAAAAAAAAAAABERAgMP/aAAgBAwEBPxD1BuDoUCd1iCTkgjsmf//EABwRAAICAwEBAAAAAAAAAAAAAAABEBExQVEhYf/aAAgBAgEBPxAXZVFWPmF3FNukNNOnC7EqLFCF8E5lih+idiyNS8HPJkYH1H0PpD6hdy+Y/8QAJhABAAIBAwQBBAMAAAAAAAAAAQARIRAxUSBBYXGBMKHR8JGxwf/aAAgBAQABPxDRQLWiEwbcs3xr1Eu7EmzNst7hODXkgJY2dA3MUz6HW7j4QrDRUK7Ef7A+ilnyICE2ZSHdy9OEzWjJ/hLmVrdk8nJ02i+2SXLjHQiuze/s5Y+VrRf8RkaWim4QnY7P4XouXmpknXfOQhxzT/bFqypza3cuXMMiiZs7QQOazNHfk86mLTJWvYQF1nd3hQPBBfjQ0L7FxsEKYmi6xC1+S52GDhnbnUyhKFy3r+y5S8fU5B7fE5h7vKLH1P2vGtS+ZeB7YdTYLENwSpU1RPP8wAAQ2AghQRUdxkXK+7/MFcFg3axrTb9EBEdmLS7dn6LU9u7CAGxoFEMU7c9bHDmFUdACkshOXXhm9L4lJuSl2JtS+ZmtfBAFCjX/2Q==',
				markText: ''
			},
			{
				title: '用户营销',
				path: 'data:image/png;base64,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',
				markText: ''
			},
			{
				title: '直播福袋',
				path: 'data:image/png;base64,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',
				markText: ''
			},
			{
				title: '直播卡片',
				path: 'data:image/png;base64,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',
				markText: ''
			}
		]
	},
	{
		name: '白银权益',
		children: [
			{
				title: '在线预约',
				path: 'data:image/png;base64,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',
				markText: ''
			}
		]
	}
]
export const strategyList = [
	{
		children: [
			{
				content: '配置进入会话自动回复',
				timestamp: '经营值+2'
			},
			{
				content: '配置联系电话',
				timestamp: '经营值+3'
			},
			{
				content: '开通团购',
				timestamp: '经营值+4'
			},
			{
				content: '开启商家主页展示',
				timestamp: '经营值+4'
			},
			{
				content: '商家主页至少配置3个模块',
				timestamp: '经营值+4'
			},
			{
				content: '配置在线预约',
				timestamp: '经营值+4'
			},
			{
				content: '添加子账号',
				timestamp: '经营值(当月有效)+4'
			}
		]
	},
	{
		children: [
			{
				content: '每周至少1天直播',
				timestamp: '经营值(当月有效)+2'
			},
			{
				content: '群聊发经营工具',
				timestamp: '经营值(当月有效)+2'
			},
			{
				content: '配置关键词自动回复',
				timestamp: '经营值(当月有效)+2'
			},
			{
				content: '创建1个粉丝群',
				timestamp: '经营值(当月有效)+3'
			},
			{
				content: '群发群聊消息',
				timestamp: '经营值(当月有效)+3'
			},
			{
				content: '在粉丝群内发红包',
				timestamp: '经营值(当月有效)+3'
			},
			{
				content: '配置商家头图',
				timestamp: '经营值(当月有效)+4'
			}
		]
	},
	{
		children: [
			{
				content: '周访问企业服务中心1天',
				timestamp: '经营值(当月有效)+1'
			},
			{
				content: '每周至少1天发视频',
				timestamp: '经营值(当月有效)+1'
			},
			{
				content: '每周至少2天发视频',
				timestamp: '经营值(当月有效)+2'
			},
			{
				content: '每周至少3天发视频',
				timestamp: '经营值(当月有效)+3'
			},
			{
				content: '周访问企业服务中心3天',
				timestamp: '经营值(当月有效)+2'
			},
			{
				content: '周访问企业服务中心3天',
				timestamp: '经营值(当月有效)+3'
			},
			{
				content: '学习企业号核心功能',
				timestamp: '经营值(当月有效)+4'
			}
		]
	},
	{
		children: [
			{
				content: '访问企业任务中心权益列表',
				timestamp: '积分+10'
			},
			{
				content: '周访问企业服务中心超4天',
				timestamp: '积分+10'
			},
			{
				content: '访问企业服务中心',
				timestamp: '积分+10'
			},
			{
				content: '完成一次有效直播',
				timestamp: '积分+30'
			},
			{
				content: '学习短视频制作课程',
				timestamp: '积分+100'
			},
			{
				content: '一周内超过3天发布短视频',
				timestamp: '积分+100'
			},
			{
				content: '绑定2个及以上员工账号',
				timestamp: '积分+100'
			}
		]
	}
]
export const shootGuideList = [
	{
		name: '企业相关',
		children: [
			{
				title: '公司前台',
				textList: ['前台介绍公司/微笑、礼貌打招呼', '（例如：南方网通欢迎您）']
			},
			{
				title: '办公环境',
				textList: ['介绍各部门办公区域、娱乐设施、休息区']
			},
			{
				title: '企业文化墙',
				textList: ['介绍企业文化宣传语、发展历程']
			},
			{
				title: '荣誉资质',
				textList: ['介绍各种重要奖项证书']
			},
			{
				title: '老板办公室',
				textList: ['介绍一些重要物品']
			},
			{
				title: '生产车间',
				textList: ['介绍不同产品生产线及生产产品、环境等']
			},
			{
				title: '仓库展示',
				textList: ['介绍仓库的货物摆放数量及热卖出库的数量']
			},
			{
				title: '主营业务',
				textList: ['介绍公司主要经营哪些业务及产品等']
			}
		]
	},
	{
		name: '产品相关',
		children: [
			{
				title: '产品介绍',
				textList: ['介绍产品有哪些作用及优势，产品怎么操作使用', '（多个产品可拍摄多个视频）']
			},
			{
				title: '产品分类',
				textList: ['介绍公司不同产品及不同介绍用途', '（多个产品可拍摄多个视频）']
			},
			{
				title: '应用场景',
				textList: ['介绍不同产品应用到相应的场景', '（多个产品可拍摄多个视频）']
			},
			{
				title: '产品展示',
				textList: ['多角度展示产品的特点或卖点', '（多个产品可拍摄多个视频）']
			}
		]
	},
	{
		name: '人物采访',
		children: [
			{
				title: '老板专访',
				textList: ['老板的创业历程', '公司的战略目标', '公司未来的方向', '与同行业相比，有什么优势?']
			},
			{
				title: '客户反馈',
				textList: ['客户购买或使用产品后', '好评反馈及效果']
			},
			{
				title: '员工采访',
				textList: ['介绍不同产品应用到相应的场景', '（多个产品可拍摄多个视频）']
			},
			{
				title: '产品展示',
				textList: ['你是什么时候加入公司的?', '你为什么选择公司？', '来了公司，最大的变化？', '有什么想对公司说的？']
			}
		]
	}
]
export const shootGuideattentionList = [
	{
		content: '在拍摄前，请用纸巾等物品将手机镜头擦拭干净，通过反光查看手机镜头表面是否有沾粘物。',
		timestamp: '第1条'
	},
	{
		content: '曝光正常，不要出现画面内明暗差别过大的情况。',
		timestamp: '第2条'
	},
	{
		content: '在拍摄前，请用纸巾等物品将手机镜头擦拭干净，通过反光查看手机镜头表面是否有沾粘物。',
		timestamp: '第3条'
	},
	{
		content: '画面时长不宜短于8秒。',
		timestamp: '第4条'
	},
	{
		content: '对单一物品（产品、场景）从拍摄角度，距离，这两点出发，每段素材应不低于3-6条。',
		timestamp: '第5条'
	},
	{
		content: '在拍摄有人正在操作工具、产品等画面内容时，应保持画面稳定，不要晃动镜头。',
		timestamp: '第6条'
	},
	{
		content: '如有需要拍摄（产品介绍，公司介绍，产品分类，主营业务等），通过口播的方式完成内容的拍摄。',
		timestamp: '第7条'
	},
	{
		content: '在有人员配合出镜的情况下，请保持人物面部、肢体曝光正常。',
		timestamp: '第8条'
	}
]
export const videoScriptList = [
	{
		name: '企业相关1',
		children: [
			{
				title: '企业简介',
				content:
					'xxxxx科技有限公司，简称xx（xxx），公司成立于xxxx年，坐落于中国xx之都——xxx市，旗下共有两大品牌，xxxx和xxxx，是一家集设计、研发、生产xx设备和xx应用解决方案（包括智能系统和程序开发）的制造型企业'
			},
			{
				title: '公司理念',
				content: '创新谋发展， 以品质求生存，以真诚博共赢，以高效取突破'
			},
			{
				title: '宣传标语',
				content: 'xxx产品，想到即用到'
			},
			{
				title: '发展历程',
				content: '可根据实际情况选择提供'
			},
			{
				title: '公司团队',
				content:
					'你想要的效果，都能帮您实现。拥有专业的设计人员和研发团队。针对不同领域和应用范围开发适合的xx产品，并提供多种适用效果，为您的预想多份选择...'
			},
			{
				title: '企业文化',
				content: '以客户为中心，深度挖掘需求，实现价值以奋斗者为本，强大xx舞台，实现梦想'
			},
			{
				title: '企业目标',
				content: '用光和影点缀世界，营造美好生活，让企业成为xx行业永远的引领者'
			}
		]
	},
	{
		name: '企业相关2',
		children: [
			{
				title: '企业简介',
				content:
					'xxxxx科技有限公司，简称xx（xxx），公司成立于xxxx年，坐落于中国xx之都——xxx市，旗下共有两大品牌，xxxx和xxxx，是一家集设计、研发、生产xx设备和xx应用解决方案（包括智能系统和程序开发）的制造型企业'
			},
			{
				title: '公司理念',
				content: '创新谋发展， 以品质求生存，以真诚博共赢，以高效取突破'
			},
			{
				title: '宣传标语',
				content: 'xxx产品，想到即用到'
			},
			{
				title: '发展历程',
				content: '可根据实际情况选择提供'
			},
			{
				title: '公司团队',
				content:
					'你想要的效果，都能帮您实现。拥有专业的设计人员和研发团队。针对不同领域和应用范围开发适合的xx产品，并提供多种适用效果，为您的预想多份选择...'
			},
			{
				title: '企业文化',
				content: '以客户为中心，深度挖掘需求，实现价值以奋斗者为本，强大xx舞台，实现梦想'
			},
			{
				title: '企业目标',
				content: '用光和影点缀世界，营造美好生活，让企业成为xx行业永远的引领者'
			}
		]
	},
	{
		name: '产品相关',
		children: [
			{
				title: '企业简介',
				content:
					'xxxxx科技有限公司，简称xx（xxx），公司成立于xxxx年，坐落于中国xx之都——xxx市，旗下共有两大品牌，xxxx和xxxx，是一家集设计、研发、生产xx设备和xx应用解决方案（包括智能系统和程序开发）的制造型企业'
			},
			{
				title: '公司理念',
				content: '创新谋发展， 以品质求生存，以真诚博共赢，以高效取突破'
			},
			{
				title: '宣传标语',
				content: 'xxx产品，想到即用到'
			},
			{
				title: '发展历程',
				content: '可根据实际情况选择提供'
			},
			{
				title: '公司团队',
				content:
					'你想要的效果，都能帮您实现。拥有专业的设计人员和研发团队。针对不同领域和应用范围开发适合的xx产品，并提供多种适用效果，为您的预想多份选择...'
			},
			{
				title: '企业文化',
				content: '以客户为中心，深度挖掘需求，实现价值以奋斗者为本，强大xx舞台，实现梦想'
			},
			{
				title: '企业目标',
				content: '用光和影点缀世界，营造美好生活，让企业成为xx行业永远的引领者'
			}
		]
	}
]
export const keyWordSettingList = [
	{
		name: '主词',
		min: 5,
		max: 10,
		children: [
			{
				text: '落花灯'
			},
			{
				text: '灯光'
			},
			{
				text: '水纹灯'
			},
			{
				text: '水纹灯'
			},
			{
				text: '投影'
			}
		]
	},
	{
		name: '前缀',
		min: 3,
		max: 5,
		children: [
			{
				text: '文旅'
			},
			{
				text: '夜游'
			},
			{
				text: '景观'
			}
		]
	},
	{
		name: '后缀',
		min: 3,
		max: 5,
		children: [
			{
				text: '厂家'
			},
			{
				text: '应用'
			},
			{
				text: '效果'
			}
		]
	},
	{
		name: '扶持话题',
		min: 0,
		max: 5,
		children: [
			{
				text: ''
			}
		]
	}
]
