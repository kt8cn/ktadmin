/**
 * 模拟数据qrDataForm
 */
export const qrDataTableListData = [
  {
    createTime:'2022-07-07',
    customer:1,
    new:1,
    lossing:1
  }
]
/**
 * 模拟数据qrDataForm
 */
export const qrDataForm = {
  todayNew:0,
  todayLossing:0,
  totalNew:0,
  totalLossing:0
}
/**
 * 模拟数据qrDataListData
 */
export const qrDataListData = [
  {
    qrCode:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
    name:'IHDAISD',
    groupName:'默认分组',
    todayNew:0,
    todayLossing:0,
    totalNew:0,
    totalLossing:0
  }
]
/**
 * 模拟数据qrList
 */
export const qrListData = [
  {
    id:1,
    staffid:[1,2],
    staff_standby:[1],
    date: '2016-05-03',
    name: 'Tom',
    qrCode: '', //TODO 二维码图片
    staff: [{
      name: "21",
      show: true
    }, {
      name: "21",
      show: false
    }, {
      name: "21",
      show: true
    }],
    otherstaff: [{
      name: "21",
      show: true
    }, {
      name: "21",
      show: false
    }, {
      name: "21",
      show: true
    }]
  },
  {
    id:2,
    date: '2016-05-02',
    name: 'Tom',
    qrCode: '',
    address: 'No. 189, Grove St, Los Angeles',
    staff: [{
      name: "21",
      show: true
    }, {
      name: "21",
      show: false
    }, {
      name: "21",
      show: true
    }]
  },

]

/**
 * 模拟数据groupList
 */
export const qrGroupListData =  [{
  name: '全部',
  count: 7,
  id:-1,
},
{
  name: '默认分组',
  count: 7,
  id:0,
},
{
  name: 'Tom22',
  count: 0,
  id:1,
},
{
  name: 'Tom2',
  count: 0,
  id:2,
},
]
/**
 * 模拟数据form
 */
export const qrFormData = {
  id:1,
  name:'test',
  staffId:[1],
  staffStandby:[1],
  tag:[],
  groupId:1,
  skipverifyType:1,
  staffStatus:0,
  stafflineStatus:0,
  // 客户标签TODO
  tagStatus:0,
  customerbzStatus:0,
  customerdesStatus:0,
  customerdes:'',
  customerbz:'',
  customerbzqhStatus:2,
  welcomeType:1,
  welcomeContent:'',
  welcomeOtherData:[
    {
      type:"2",   // 1图片，2链接，3小程序
    setStatus:"1",
    "title":"423423424",
    "desc":"",
    "picurl":"",
    "linkSet":"1",
    "behavior":"1",
    "dynamic":"1",
    "tag":"",
    "score":"1",
    "saveRadar":"1"
    },
    {
      type:"1",
    "title":"423425687486786724",
      imgurl:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
    }
    
  ],
  staffTimeList:[
    {
      selectStaffData:[],
      selectStaffIds:[1],
      time:[],
      week:[],
    }
  ],
  staffupData:[ 
    {"staffId":"1","name":"23213",
    "avatar":"",
    "sx":100}
  ],

  daypartingStatus:1,
  skipverifyStatus:1,
  skipverifyType:1,
  mergeQrCode:''
}

