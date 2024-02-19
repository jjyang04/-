import request from "../ulits/https";
// const store = user_store();
// 医院后台登录
export const post_login = (data) => {
  // console.log(params);
  return request.post("/api/Login", data);
};

// 获取用户信息
export const get_userinfo = (params) => {
  // console.log(params);
  return request.get("/api/getInfo", { params });
};

// 获取路由
export const get_router = (params) => {
  // console.log(params);
  return request.get("/api/getRouters", { params });
};

// 点击生成图片验证码

export const get_captcha_image = (params) => {
  // console.log(params);
  return request.get("/api/captchaImage", { params });
};

// 获取部门下拉数列表
export const get_system_dept_tree = (params) => {
  // console.log(params);
  return request.get("/api/system/dept/treeselect", { params });
};

// 查询部门列表
export const get_system_dept_list_exclude = (params) => {
  console.log(params);
  return request.get("/api/system/dept/list/exclude", { params });
};

// 根据部门编号获取详细信息
export const get_system_dept = (params) => {
  // console.log(params);
  return request.get("/api/system/dept/list", { params });
};
// 获取部门列表
export const get_system_dept_list = (params) => {
  // console.log(params);
  return request.get("/api/system/dept/list", { params });
};

// 创建部门
export const post_create_dept = (data) => {
  // console.log(params);
  return request.post("/api/system/dept", data);
};

// 创建部门
export const put_create_dept = (data) => {
  console.log(data);
  return request.put("/api/system/dept", data);
};

// 删除部门
export const delete_create_dept = (params) => {
  // console.log(params);
  return request.delete(`/api/system/dept/${params}`);
};

// 查询操作日志
export const get_operlog_list = (params) => {
  console.log(params);
  return request.get("/api/monitor/operlog/list", { params });
};

// 查询订单列表
export const get_business_list = (params) => {
  console.log(params);
  return request.get("/api/business/Payorder/list", { params });
};

// 查询操登录日志
export const get_logininfor_list = (params) => {
  console.log(params);
  return request.get("/api/monitor/logininfor/list", { params });
};
// 删除指定登录日志
export const delete_monitor_logininfor = (params) => {
  console.log(params);
  return request.delete(`/api/monitor/logininfor/${params}`);
};

// 删除全部登录日志
export const delete_monitor_logininfor_clean = (params) => {
  // console.log(params);
  return request.delete(`/api/monitor/logininfor/clean`, { params });
};

// 获取系统角色管理
export const get_userinfo_list = (params) => {
  // console.log(params);
  return request.get("/api/system/role/list", { params });
};

// 修改角色状态
export const put_userinfo_changeStatus = (params) => {
  // console.log(params);
  return request.put("/api/system/role/changeStatus", { params });
};

// 查询就诊卡列表
export const get_cards_lsit = (params) => {
  // console.log(params);
  return request.get("/api/business/Cards/list", { params });
};

// 查询科室列表
export const get_dept_lsit = (params) => {
  // console.log(params);
  return request.get("/api/business/Dept/list", { params });
};

// 添加科室
export const post_dept = (data) => {
  // console.log(params);
  return request.post("/api/business/Dept", data);
};

// 删除科室
export const delete_dept_lsit = (params) => {
  // console.log(params);
  return request.delete(`/api/business/Dept/${params}`);
};

// 修改科室
export const put_dept = (data) => {
  // console.log(params);
  return request.put("/api/business/Dept", data);
};

// 查询身体部位
export const get_Bodyparts_list = (params) => {
  // console.log(params);
  return request.get("/api/business/Bodyparts/list", { params });
};

// 添加身体部位
export const post_create_Bodyparts = (data) => {
  // console.log(params);
  return request.post("/api/business/Bodyparts", data);
};

// 删除身体部位
export const delete_create_Bodyparts = (params) => {
  // console.log(params);
  return request.delete(`/api/business/Bodyparts/${params}`);
};

// 修改身体部位
export const put_Bodyparts = (data) => {
  // console.log(data);
  return request.put("/api/business/Bodyparts", data);
};

// 查询楼层管理列表
export const get_foordata_list = (params) => {
  // console.log(data);
  return request.get("/api/business/Foordata/list", { params });
};

// 添加楼层
export const post_foordata = (data) => {
  // console.log(data);
  return request.post("/api/business/Foordata", data);
};

// 删除楼层指定id数据
export const delete_foordata = (params) => {
  // console.log(data);
  return request.delete(`/api/business/Foordata/${params}`);
};

// 查询意见反馈列表
export const get_feedback_list = (params) => {
  // console.log(data);
  return request.get(`/api/business/Feedback/list`, { params });
};
// 查询问卷调查列表列表
export const get_surveys_list = (params) => {
  // console.log(data);
  return request.get(`/api/business/Surveys/list`, { params });
};
// 添加问卷调查列表列表
export const post_surveys_list = (data) => {
  // console.log(data);
  return request.post(`/api/business/Surveys/`, data);
};

// 修改问卷调查列表
export const put_surveys_list = (data) => {
  // console.log(data);
  return request.put(`/api/business/Surveys/`, data);
};
// 删除问卷调查列表
export const delete_surveys_list = (params) => {
  // console.log(data);
  return request.delete(`/api/business/Surveys/${params}`);
};

// 查询调查问卷问题表
export const get_surveysquestion_list = (params) => {
  // console.log(data);
  return request.get(`/api/business/Surveysquestion/list`, { params });
};
// 查询指定id调查问题
export const get_surveysquestion = (params) => {
  // console.log(data);
  return request.get(`/api/business/Surveysquestion/${params}`);
};
// 添加调查问卷问题

export const post_surveysquestion = (data) => {
  // console.log(data);
  return request.post(`/api/business/Surveysquestion`, data);
};

// 修改调查问卷问题

export const put_surveysquestion = (data) => {
  // console.log(data);
  return request.put(`/api/business/Surveysquestion`, data);
};

// 删除指定问题
export const delete_surveysquestion = (params) => {
  // console.log(data);
  return request.delete(`/api/business/Surveysquestion/${params}`);
};
// 查询医生列表
export const get_doctor_list = (params) => {
  // console.log(data);
  return request.get(`/api/business/Doctor/list`, { params });
};

// 添加医生
export const post_doctor_list = (data) => {
  // console.log(data);
  return request.post(`/api/business/Doctor`, data);
};

// 修改医生信息
export const put_doctor_list = (data) => {
  // console.log(data);
  return request.put(`/api/business/Doctor`, data);
};

// 删除医生
export const delete_doctor_list = (params) => {
  // console.log(data);
  return request.delete(`/api/business/Doctor/${params}`);
};

// 获取症状
export const get_symptoms = (params) => {
  // console.log(data);
  return request.get(`/api/business/Symptoms/list`, { params });
};

// 新增症状
export const post_symptoms = (data) => {
  // console.log(data);
  return request.post(`/api/business/Symptoms`, data);
};

//修改症状
export const put_symptoms = (data) => {
  // console.log(data);
  return request.put(`/api/business/Symptoms`, data);
};

// 删除症状
export const delete_symptoms = (params) => {
  console.log(params);
  return request.delete(`/api/business/Symptoms/${params}`);
};

// 获取会员
export const get_Member_list = (params) => {
  // console.log(data);
  return request.get(`/api/business/Member/list`, { params });
};

// // 获取意见反馈列表
// export const get_Feedback_list = (params) => {
//   // console.log(data);
//   return request.get(`/api/business/Feedback/list`, { params });
// };
