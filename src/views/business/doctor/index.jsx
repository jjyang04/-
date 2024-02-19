/* eslint-disable array-callback-return */
import {
  get_doctor_list,
  put_doctor_list,
  post_doctor_list,
  delete_doctor_list,
} from "@/service";
import { useEffect, useState } from "react";
import { Table, Modal, Button, Cascader } from "antd";
import { Icon } from "@iconify/react";
import user_store from "@/store";
import Create from "./create_doctor";
function User() {
  const store = user_store();
  const [list, set_list] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [axios_type, set_axios_type] = useState("增加");
  const [axios_data, set_axios_data] = useState({
    doctorName: "",
    // introduction: "",
    title: "",
    skilled: "",
    images: "",
    deptid: "",
    orderNum: 0,
    doctorCode: "",
  });
  const [get_doctor_data, set_get_doctor_data] = useState({
    DoctorName: "",
    Deptid: "",
    DoctorCode: "",
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log(axios_data);
    for (let i in axios_data) {
      if (!axios_data[i]) {
        window.openNotification(axios_type, "warning");
        return false;
      }
    }
    if (axios_type === "增加") {
      // console.log(axios_type);
      post_doctor_list(axios_data)
        .then(() => {
          window.openNotification(axios_type, "success");
          get_list();
        })
        .catch(() => {
          window.openNotification(axios_type, "error");
        });
    } else {
      console.log(axios_data);
      put_doctor_list(axios_data)
        .then(() => {
          window.openNotification(axios_type, "success");
          get_list();
        })
        .catch(() => {
          window.openNotification(axios_type, "error");
        });
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const get_list = (data) => {
    get_doctor_list(data).then((res) => {
      console.log(res);
      set_list(res.data.data.result);
    });
  };
  useEffect(() => {
    get_list();
    // delete_doctor_list(8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "专家名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "职称",
      dataIndex: "work_name",
      key: "work_name",
    },
    {
      title: "医生代码",
      dataIndex: "doctor_code",
      key: "doctor_code",
    },
    {
      title: "排序ID",
      dataIndex: "old_num",
      key: "old_num",
    },
    {
      title: "头像",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "科室",
      dataIndex: "dept",
      key: "dept",
    },
    {
      title: "操作",
      dataIndex: "resvise",
      key: "resvise",
    },
  ];
  const create_li = () => {
    return list.map((item) => {
      return {
        key: item.id + item.doctorName,
        id: item.id,
        name: item.doctorName,
        work_name: item.title,
        doctor_code: item.doctorCode,
        old_num: item.orderNum,
        image: (
          <img
            src={item.images}
            alt={item.doctorName + "的头像"}
            className="w-[100px]"
          ></img>
        ),
        dept: store.dept_arr.map((item1) => {
          if (item1.id === item.deptid) return item1.deptName;
        }),
        resvise: (
          <div className="flex items-center  text-blue-500">
            <div
              className="flex items-center"
              onClick={() => {
                console.log(item);
                set_axios_type("修改");
                set_axios_data(item);
                showModal();
              }}
            >
              <Icon icon="iconoir:edit" className="mr-[5px]" />
              <span>编辑</span>
            </div>
            <div
              className="flex ml-[10px]  items-center"
              onClick={() => {
                delete_doctor_list(item.id);
                get_list();
              }}
            >
              <Icon
                icon="material-symbols-light:delete-outline"
                className="mr-[5px] text-[17px]"
              />
              <span>删除</span>
            </div>
          </div>
        ),
      };
    });
  };

  return (
    <div>
      <Modal
        title="添加"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Create axios_data={axios_data} set_axios_data={set_axios_data} />
      </Modal>
      <div className="flex items-center">
        <span>专家名称</span>
        <input
          type="text"
          value={get_doctor_data.DoctorName}
          onChange={(e) => {
            set_get_doctor_data({
              ...get_doctor_data,
              DoctorName: e.target.value,
            });
          }}
          className="h-[35px] pl-[20px] border border-gray-300 outline-none w-[200px] mx-[20px] rounded-md"
        />
        <span>医生代码</span>
        <input
          type="text"
          value={get_doctor_data.DoctorCode}
          onChange={(e) => {
            set_get_doctor_data({
              ...get_doctor_data,
              DoctorCode: e.target.value,
            });
          }}
          className="h-[35px] pl-[20px] border border-gray-300 outline-none w-[200px] mx-[20px] rounded-md"
        />
        <span>科室</span>
        <Cascader
          options={store.dept_arr.map((item) => {
            return {
              value: item.id,
              label: item.deptName,
            };
          })}
          onChange={(value) => {
            if (value) {
              set_get_doctor_data({ ...get_doctor_data, Deptid: value[0] });
            } else {
              set_get_doctor_data({ ...get_doctor_data, Deptid: undefined });
            }
          }}
          placeholder="操作状态"
        />
        <Button
          type="primary"
          onClick={() => {
            get_list(get_doctor_data);
          }}
          className="bg-[#1677ff]  flex items-center mx-[20px] "
        >
          <Icon icon="iconoir:search" className="mr-[10px]" />
          搜索
        </Button>
        <Button
          className="flex items-center"
          onClick={() => {
            set_get_doctor_data({
              DeptId: "",
              DoctorCode: "",
              DoctorName: "",
            });
            console.log();
            get_list();
          }}
        >
          <Icon icon="system-uicons:reset" className="mr-[10px]" />
          重置
        </Button>
      </div>
      <Button
        type="dashed "
        className="my-[20px]"
        onClick={() => {
          set_axios_type("增加");
          set_axios_data({
            doctorName: "",
            introduction: "",
            title: "",
            skilled: "",
            images: "",
            deptid: "",
            orderNum: 0,
            doctorCode: "",
          });
          showModal();
        }}
      >
        新增
      </Button>
      <Table columns={columns} dataSource={create_li()} />
    </div>
  );
}
export default User;
