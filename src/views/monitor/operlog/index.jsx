import { get_operlog_list } from "@/service";
import { Cascader, DatePicker, Button, Table } from "antd";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;
const selectionType = "checkbox";

const columns = [
  {
    title: "日志编号",
    dataIndex: "operId",
    key: "日志编号",
  },
  {
    title: "系统模块",
    dataIndex: "title",
    key: "系统模块",
  },
  {
    title: "请求方式",
    dataIndex: "requestMethod",
    key: "请求方式",
  },
  {
    title: "操作人员",
    dataIndex: "operName",
    key: "操作人员",
  },
  {
    title: "主机",
    dataIndex: "operIp",
    key: "主机",
  },
  {
    title: "操作地点",
    dataIndex: "operLocation",
    key: "操作地点",
  },
  {
    title: "操作状态",
    dataIndex: "status",
    key: "操作状态",
  },
  {
    title: "用时",
    dataIndex: "elapsed",
    key: "用时",
  },
  {
    title: "日志内容",
    dataIndex: "text",
    key: "日志内容",
  },
  {
    title: "操作日期",
    dataIndex: "operTime",
    key: "操作日期",
  },

  {
    title: "操作",
    dataIndex: "resvise",
    key: "操作",
  },
];
function User() {
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      // set_delete_id(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const [title, set_title] = useState("");
  const [operName, set_operName] = useState("");
  const [status, set_status] = useState();
  const [requestMethod, set_requestMethod] = useState();
  const [start_time, set_start_time] = useState();
  const [end_time, set_end_time] = useState();

  const [operlog_data, set_operlog_data] = useState();
  const get_list = (obj) => {
    get_operlog_list({
      PageNum: 1,
      TotalNum: 100,
      TotalPageNum: 1,
      PageSize: 20,
      ...obj,
    })
      .then((res) => {
        console.log(res);
        set_operlog_data(
          res.data.data.result.map((item) => {
            return {
              key: item.operId,
              operId: item.operId,
              title: item.title,
              requestMethod: item.requestMethod,
              operName: item.operName,
              operIp: item.operIp,
              operLocation: item.operLocation,
              status: item.status === 0 ? "正常" : "异常",
              elapsed: item.elapsed,
              text: "",
              operTime: item.operTime,
              resvise: "详细内容",
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    get_list();
  }, []);
  return (
    <div>
      <div className="flex items-center">
        <div className="ml-[10px]">
          <span>系统模块</span>
          <input
            placeholder="请输入系统模块"
            type="text"
            value={title}
            onChange={(e) => {
              set_title(e.target.value);
            }}
            className="py-[5px] pl-[20px] ml-[10px] border border-gray-300 outline-none"
          />
        </div>
        <div className="ml-[10px]">
          <span>操作人员</span>
          <input
            type="text"
            value={operName}
            onChange={(e) => {
              set_operName(e.target.value);
            }}
            placeholder="请输入操作人员"
            className="py-[5px] pl-[20px] ml-[10px] border border-gray-300 outline-none"
          />
        </div>
        <div className="ml-[10px]">
          <span className="mr-[10px]">类型</span>
          <Cascader
            options={[
              {
                value: 0,
                label: "其他",
              },
              {
                value: 1,
                label: "新增",
              },
              {
                value: 2,
                label: "修改",
              },
              {
                value: 3,
                label: "删除",
              },
            ]}
            onChange={(value) => {
              set_requestMethod(value[0]);
            }}
            placeholder="请操作类型"
          />
        </div>
        <div className="ml-[10px]">
          <span className="mr-[10px]">状态</span>
          <Cascader
            options={[
              {
                value: 0,
                label: "正常",
              },
              {
                value: 1,
                label: "异常",
              },
            ]}
            onChange={(value) => {
              set_status(value[0]);
            }}
            placeholder="操作状态"
          />
        </div>
      </div>
      <div className="flex my-[20px]">
        <div className="ml-[10px]">
          <span className="mr-[10px]">注册时间</span>
          <RangePicker
            showTime
            onChange={(value) => {
              console.log(dayjs(value[0]).format("YYYY-MM-DD HH:mm:ss"));
              console.log(dayjs(value[1]).format("YYYY-MM-DD HH:mm:ss"));
              set_start_time(dayjs(value[0]).format("YYYY-MM-DD HH:mm:ss"));
              set_end_time(dayjs(value[1]).format("YYYY-MM-DD HH:mm:ss"));
            }}
          />
        </div>

        <Button
          type="primary"
          onClick={() => {
            get_list({
              title,
              operName,
              businessType: requestMethod,
              BeginTime: start_time,
              EndTime: end_time,
              status,
            });
          }}
          className="bg-[#1677ff]  flex items-center mx-[20px] "
        >
          <Icon icon="iconoir:search" className="mr-[10px]" />
          搜索
        </Button>
        <Button
          className="flex items-center"
          onClick={() => {
            set_end_time(null);
            set_title("");
            set_operName("");
            set_status(null);
            set_requestMethod(null);
            set_start_time(null);
          }}
        >
          <Icon icon="system-uicons:reset" className="mr-[10px]" />
          重置
        </Button>
      </div>
      <Table
        dataSource={operlog_data}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
      />
      ;
    </div>
  );
}
export default User;
