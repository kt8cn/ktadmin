/**
 * 初始form
 */
export const qrOrignalForm = {
  id:1,
  name:'test',
  staffId:[],
  staffStandby:[],
  tag:[],
  tagStatus:0,
  groupId:1,
  skipverifyType:1,
  staffStatus:0,
  stafflineStatus:0,
  customerbzStatus:0,
  customerdesStatus:0,
  customerdes:'',
  customerbz:'',
  customerbzqhStatus:2,
  welcomeType:1,
  welcomeContent:'',
  welcomeOtherData:[],
  // 员工分时段添加 
  staffTimeList:[
    {
      selectStaffData:[],
      selectStaffIds:[],
      time:[],
      week:[],
    }
  ],
  // 员工上限
  staffupData:[ 
    {"staffid":"",
    "name":"",
    "avatar":"",
    "sx":0}
  ],
  daypartingStatus:1,
}

/**
 * 初始qrImgOrignalForm
 */
export const qrImgOrignalForm = {
  type:"1",
  "title":"",
  imgurl:''
}

/**
 * 初始qrImgOrignalForm
 */
export const qrLinkOrignalForm = {
  "type":"2",
  
  "title":"",
  "desc":"",
  "picurl":"",
  setStatus:"1",
  "linkSet":"1",

  "behavior":"1",
  "dynamic":"1",
  "tag":"",
  "score":"1",
  "saveRadar":"1"
}

export const qrMiniprogramOrignalForm = {
  type:"3",
  "title":"",
  appId:'',
  appUrl:'',
  imgurl:''
}