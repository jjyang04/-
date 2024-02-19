/* eslint-disable array-callback-return */
import {
  get_logininfor_list,
  delete_monitor_logininfor,
  delete_monitor_logininfor_clean,
} from "@/service";
import { Icon } from "@iconify/react";
import { Button } from "antd";
import { Modal } from "antd";
import { useState, useEffect } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
function User() {
  const [logininfor, set_logininfor] = useState([]);
  useEffect(() => {
    get_login_infor();
  }, []);
  const get_login_infor = () => {
    get_logininfor_list()
      .then((res) => {
        console.log(res.data.data.result);
        if (res.data.data.result)
          set_logininfor(
            res.data.data.result.map((item) => {
              item.is_delete = false;
              return item;
            })
          );
        else {
          set_logininfor([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const status_flag = (sta) => {
    return sta === "0" ? "正常" : "不正常";
  };

  const delete_loginfor = () => {
    console.log(
      logininfor
        .filter((item) => item.is_delete)
        .map((item) => item.infoId)
        .join(",")
    );
    delete_monitor_logininfor(
      logininfor
        .filter((item) => item.is_delete)
        .map((item) => item.infoId)
        .join(",")
    );
    get_login_infor();
  };
  // eslint-disable-next-line no-unused-vars
  const [modal, contextHolder] = Modal.useModal();
  const confirm = () => {
    modal.confirm({
      title: "提示",
      icon: <ExclamationCircleOutlined />,
      content: "您确定要删除所有登录记录吗",
      okText: "确认",
      cancelText: "取消",
      onOk: clean_all,
    });
  };
  const clean_all = () => {
    console.log("确定");
    delete_monitor_logininfor_clean().then(() => {
      get_login_infor();
    });
  };
  // console.log(logininfor);
  const [all_checked, set_all_checked] = useState(false);
  return (
    <div>
      <div className="flex">
        {contextHolder}
        <div className="flex w-[25%] h-[25px]">
          <span>登录地址</span>
          <input
            type="text"
            placeholder="请输入登录地址"
            className="border-[1px] outline-none border-gray-300 w-[70%] h-[100%] ml-[10px] pl-[15px]"
          />
        </div>
        <div className="flex w-[25%] h-[25px]">
          <span>用户名称</span>
          <input
            type="text"
            placeholder="请输入用户名称"
            className="border-[1px] outline-none border-gray-300 w-[70%] h-[100%] ml-[10px] pl-[15px]"
          />
        </div>
        <div className="flex w-[25%] h-[25px]">
          <span>状态</span>
          <input
            type="text"
            placeholder="登录状态"
            className="border-[1px] outline-none border-gray-300 w-[70%] h-[100%] ml-[10px] pl-[15px]"
          />
        </div>
        <div className="flex w-[25%] h-[25px]">
          <span>登录时间</span>
          <input
            type="text"
            className="border-[1px] outline-none border-gray-300 w-[70%] h-[100%] ml-[10px] pl-[15px]"
          />
        </div>
      </div>
      <div className="my-[20px] flex">
        <Button
          type="primary"
          className="bg-[#1677ff] flex items-center mr-[20px] "
        >
          <Icon icon="iconoir:search" className="mr-[10px]" />
          搜索
        </Button>
        <Button className="flex items-center">
          <Icon icon="system-uicons:reset" className="mr-[10px]" />
          重置
        </Button>
      </div>
      <div className="my-[20px] flex">
        <Button
          type="primary"
          danger
          onClick={delete_loginfor}
          className="bg-[#1677ff] flex items-center mr-[20px] "
        >
          <Icon icon="uiw:delete" className="mr-[10px]" />
          删除
        </Button>
        <Button
          className="flex items-center"
          type="primary"
          onClick={confirm}
          danger
        >
          <Icon icon="uiw:delete" className="mr-[10px]" />
          清空
        </Button>
      </div>
      <div>
        <div className="flex items-center text-gray-500 border-b-[1px] border-gray-300 py-[10px]">
          <input
            type="checkbox"
            className=" flex-1"
            checked={all_checked}
            onChange={(e) => {
              set_all_checked(e.target.checked);
              // console.log(e.target.checked);
              // console.log(all_checked);
              set_logininfor(
                logininfor.map((item) => {
                  return {
                    ...item,
                    is_delete: e.target.checked,
                  };
                })
              );
            }}
          />
          <span className=" flex-1">访问编号</span>
          <span className=" flex-1">用户名称</span>
          <span className=" flex-1">登录地址</span>
          <span className=" flex-1">登录地点</span>
          <span className=" flex-1">浏览器</span>
          <span className=" flex-1">操作系统</span>
          <span className=" flex-1">登录状态</span>
          <span className=" flex-1">操作信息</span>
          <span className=" flex-1">登录日期</span>
        </div>
        {logininfor.map((item, index) => {
          return (
            <div
              className="flex items-center text-gray-500 border-b-[1px] border-gray-300 py-[10px]"
              key={item.infoId}
            >
              <input
                type="checkbox"
                className=" flex-1"
                checked={item.is_delete}
                onChange={(e) => {
                  set_logininfor(
                    [...logininfor].map((item1, index1) => {
                      if (index === index1) {
                        // console.log(e.target.checked);
                        item1.is_delete = e.target.checked;
                        return item1;
                      } else return item1;
                    })
                  );
                  if (
                    logininfor.filter((item) => item.is_delete).length ===
                    logininfor.length
                  ) {
                    set_all_checked(true);
                  } else {
                    set_all_checked(false);
                  }
                }}
              />
              <span className=" flex-1">{item.infoId}</span>
              <span className=" flex-1">{item.userName}</span>
              <span className=" flex-1">{item.ipaddr}</span>
              <span className=" flex-1">{item.loginLocation}</span>
              <span className=" flex-1">{item.browser}</span>
              <span className=" flex-1">{item.os}</span>
              <span className=" flex-1">{status_flag(item.status)}</span>
              <span className=" flex-1">{}</span>
              <span className=" flex-1">{item.loginTime}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default User;
