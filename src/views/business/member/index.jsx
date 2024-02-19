import { Cascader, DatePicker, Button, Table } from "antd";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
const { RangePicker } = DatePicker;
function User() {
  const columns = [
    {
      title: "用户ID",
      dataIndex: "用户ID",
      key: "用户ID",
    },
    {
      title: "手机",
      dataIndex: "手机",
      key: "手机",
    },
    {
      title: "昵称",
      dataIndex: "昵称",
      key: "昵称",
    },
    {
      title: "姓名",
      dataIndex: "姓名",
      key: "姓名",
    },
    {
      title: "性别",
      dataIndex: "性别",
      key: "性别",
    },
    {
      title: "地区",
      dataIndex: "地区",
      key: "地区",
    },
    {
      title: "openid",
      dataIndex: "openid",
      key: "openid",
    },
    {
      title: "unionid",
      dataIndex: "unionid",
      key: "unionid",
    },
    {
      title: "图片",
      dataIndex: "图片",
      key: "图片",
    },
    {
      title: "注册类型",
      dataIndex: "注册类型",
      key: "注册类型",
    },
    {
      title: "创建时间",
      dataIndex: "创建时间",
      key: "创建时间",
    },
    {
      title: "操作",
      dataIndex: "操作",
      key: "操作",
    },
  ];

  return (
    <div>
      <div className="flex items-center">
        <div className="ml-[10px]">
          <span>手机</span>
          <input
            type="text"
            className="py-[5px] pl-[20px] ml-[10px] border border-gray-300 outline-none"
          />
        </div>
        <div className="ml-[10px]">
          <span>昵称</span>
          <input
            type="text"
            className="py-[5px] pl-[20px] ml-[10px] border border-gray-300 outline-none"
          />
        </div>
        <div className="ml-[10px]">
          <span className="mr-[10px]">地区</span>
          <Cascader onChange={(value) => {}} placeholder="请选择" />
        </div>
        <div className="ml-[10px]">
          <span className="mr-[10px]">注册时间</span>
          <RangePicker
            showTime
            onChange={(value) => {
              console.log(dayjs(value[0]).format("YYYY-MM-DD HH:mm:ss"));
              console.log(dayjs(value[1]).format("YYYY-MM-DD HH:mm:ss"));
            }}
          />
        </div>
      </div>
      <div className="flex items-center my-[20px]">
        <Button
          type="primary"
          onClick={() => {}}
          className="bg-[#1677ff]  flex items-center mr-[20px] "
        >
          <Icon icon="iconoir:search" className="mr-[10px]" />
          搜索
        </Button>
        <Button className="flex items-center" onClick={() => {}}>
          <Icon icon="system-uicons:reset" className="mr-[10px]" />
          重置
        </Button>
      </div>
      <div className="flex items-center my-[20px] text-[14px]">
        <Button
          type="primary"
          onClick={() => {}}
          className="bg-[#1677ff]  flex items-center mr-[20px] "
        >
          <Icon icon="iconoir:search" className="mr-[10px]" />
          新增
        </Button>
        <Button className="flex items-center" onClick={() => {}}>
          <Icon icon="system-uicons:reset" className="mr-[10px]" />
          修改
        </Button>
        <Button
          type="primary"
          onClick={() => {}}
          className="bg-[#1677ff] ml-[20px] flex items-center mr-[20px] "
        >
          <Icon icon="iconoir:search" className="mr-[10px]" />
          删除
        </Button>
        <Button danger className="flex items-center" onClick={() => {}}>
          <Icon icon="system-uicons:reset" className="mr-[10px]" />
          导出
        </Button>
      </div>
      <Table dataSource={[]} columns={columns} />;
    </div>
  );
}
export default User;
