import {
  get_system_dept_tree,
  // get_system_dept,
  get_system_dept_list,
  // post_create_dept,
  put_create_dept,
  delete_create_dept,
} from "@/service";
import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { Button, Modal } from "antd";
// import dayjs from "dayjs";

import Createlist from "./modal";
function User() {
  // 总院
  const [tree_list, set_tree_list] = useState([]);
  const [dept_list, set_dept_list] = useState([]);
  const [inp_dept_name, set_inp_dept_name] = useState("");
  const [inp_dept_status, set_inp_dept_status] = useState("");
  const [now_dept_list, set_now_dept_list] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // const dept_list = useRef([]);
  // const [is_render, set_is_render] = useState(true);
  useEffect(() => {
    // setTimeout(() => {
    //   set_is_render(!is_render);
    // }, 500);
    get_system_dept_tree()
      .then((res) => {
        // tree_list.current = res.data.data;
        set_tree_list(res.data.data);

        // console.log(res.data.data);
        // set_is_render(!is_render);
      })
      .catch((err) => {
        console.log(err);
      });
    get_system_dept_list()
      .then((res) => {
        // dept_list.current = res.data.data;
        console.log(res.data.data);
        set_dept_list(res.data.data);
        set_now_dept_list(res.data.data);
        // const arr = res.data.data.map((item) => item.deptId);
        // console.log(arr);
        // for (let i of arr) {
        delete_create_dept(102);
        // }
        // set_is_render(!is_render);
        // console.log(dept_list.current);
        // console.log("dept_list");
      })
      .catch((err) => {
        console.log(err);
      });
    // put_list();
    // create_list();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line no-unused-vars
  // const create_list = () => {
  //   post_create_dept({
  //     create_time: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  //     deptId: 100,
  //     parentId: 100,
  //     orderNum: 10,
  //     deptName: "内科",
  //     leader: "张傲宇",
  //     status: "0",
  //     createBy: null,
  //     phone: "",
  //   })
  //     .then((res) => {
  //       // console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // eslint-disable-next-line no-unused-vars
  const put_list = () => {
    // console.log(dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"));
    put_create_dept({
      // create_time: "2024-01-16 11:02:24",
      deptId: 105,
      parentId: 100,
      // orderNum: 101,
      deptName: "精神科",
      // update_time: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      leader: "王家轩",
      status: "1",
      // createBy: null,
    })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(create_list);
  const is_sta = (flag) => {
    return flag === "0" ? "正常" : "停用";
  };
  const dept_search = () => {
    let status;
    if (inp_dept_status.trim() === "正常") {
      status = "0";
    } else if (inp_dept_status.trim() === "停用") {
      status = "1";
    }

    // eslint-disable-next-line array-callback-return
    const arr = [...dept_list.slice(1)].filter((item) => {
      item.deptName = item.deptName ?? "";
      if (item.deptName.includes(inp_dept_name.trim())) {
        if (status) {
          if (item.status !== "0" && item.status !== "1") {
            item.status = "1";
          }
          return item.status === status;
        } else {
          return item;
        }
      }
    });
    arr.unshift(dept_list[0]);
    set_now_dept_list(arr);
  };
  const create_div_list = (arr) => {
    // console.log(arr);
    // console.log(dept_list);
    // console.log(arr);
    return arr.map((item) => {
      // console.log(item.children && item.children.length > 0);
      if (item.children && item.children.length > 0) {
        return now_dept_list.map((item1) => {
          // console.log(item1.deptId === item.id);
          if (item1.deptId === item.id) {
            // console.log(item1.deptId);
            return (
              <div
                key={item1.deptId}
                className=" overflow-hidden min-h-[41px] pb-1 transition ease-out duration-300 "
              >
                <div className="flex border-b-[1px] border-gray-200 py-[10px]">
                  <div className="w-[20%] flex items-center">
                    <Icon
                      icon="bytesize:chevron-bottom"
                      className="mr-[10px]"
                      onClick={(e) => {
                        if (
                          e.target.parentNode.parentNode.parentNode
                            .clientHeight === 41 ||
                          e.target.parentNode.parentNode.parentNode
                            .clientHeight === 42
                        )
                          e.target.parentNode.parentNode.parentNode.style.height =
                            "";
                        else
                          e.target.parentNode.parentNode.parentNode.style.height =
                            "42px";
                        console.log(
                          e.target.parentNode.parentNode.parentNode.clientHeight
                        );
                      }}
                    />
                    <span>{item1.deptName}</span>
                  </div>
                  <div className="w-[8%] text-center">{item1.leader}</div>
                  <div className="w-[8%] text-center">{item1.orderNum}</div>
                  <div className="w-[15%] text-center ml-[10%]">
                    {item1.status === "0" ? "正常" : "停用"}
                  </div>
                  <div className="w-[20%] text-center">{item1.createTime}</div>
                  <div className="w-[19%] flex text-center text-blue-400  justify-center">
                    <div className="flex cursor-pointer mx-[8px]">
                      <span>修改</span>
                    </div>
                    <div
                      className="flex cursor-pointer mx-[8px]"
                      onClick={showModal}
                    >
                      <span>新增</span>
                    </div>
                  </div>
                </div>
                {create_div_list([...item.children])}
              </div>
            );
          } else return "";
        });
      } else {
        return now_dept_list.map((item1) => {
          if (item1.deptId === item.id) {
            // console.log(item);

            return (
              <div
                className="flex border-b-[1px] border-gray-200 py-[10px] "
                key={item1.deptId}
              >
                <div className="w-[20%] pl-[45px]">{item1.deptName}</div>
                <div className="w-[8%] text-center">{item1.leader}</div>
                <div className="w-[8%] text-center">{item1.orderNum}</div>
                <div className="w-[15%] text-center ml-[10%]">
                  {is_sta(item1.status)}
                </div>
                <div className="w-[20%] text-center">{item1.createTime}</div>
                <div className="w-[19%] flex text-center text-blue-400  justify-center">
                  <div className="flex cursor-pointer mx-[8px]">
                    <span>修改</span>
                  </div>

                  <div
                    className="flex cursor-pointer mx-[8px]"
                    onClick={showModal}
                  >
                    <span>新增</span>
                  </div>
                  <div
                    className="flex cursor-pointer mx-[8px]"
                    onClick={() => {
                      delete_create_dept({ deptId: item1.id })
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    <span>删除</span>
                  </div>
                </div>
              </div>
            );
          } else {
            return "";
          }
        });
      }
    });
  };
  return (
    <div>
      <Modal
        title="添加部门"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Createlist />
      </Modal>
      {/* 头部input框 */}
      <div className="flex ">
        <span className="font-bold">部门名称</span>
        <input
          value={inp_dept_name}
          onChange={(e) => {
            set_inp_dept_name(e.target.value);
          }}
          className="ml-[30px] border-[2px]  pl-[20px] outline-none py-[3px] text-[14px] rounded-md  border-gray-200 "
          type="text"
          placeholder="请输入部门名称"
        />
        <input
          id="sex"
          value={inp_dept_status}
          onChange={(e) => {
            set_inp_dept_status(e.target.value);
          }}
          type="text"
          list="qudao"
          className="border-[2px] ml-[20px] border-gray-200  py-[3px] outline-none text-[14px] rounded-md pl-[20px]  "
          placeholder="请选择部门状态"
        ></input>
        <datalist id="qudao">
          <option>正常</option>
          <option>停用</option>
        </datalist>
        <Button
          type="primary"
          className="bg-[#4096ff] mx-[25px] text-#fff"
          icon={<SearchOutlined />}
          onClick={dept_search}
        >
          搜索
        </Button>
        <Button
          className=" text-#666"
          icon={<Icon icon="system-uicons:reset-alt" />}
          onClick={() => {
            set_inp_dept_name("");
            set_inp_dept_status("");
            set_now_dept_list(dept_list);
          }}
        >
          重置
        </Button>
      </div>
      <div className="mt-[30px]">
        <Button
          type="primary"
          className="  bg-[#4096ff] text-#fff"
          icon={<Icon icon="system-uicons:reset-alt" />}
        >
          新增
        </Button>
      </div>
      <div className="text-gray-500 mt-[20px]">
        <div className="flex border-b-[1px] border-gray-200 py-[10px]">
          <div className="w-[20%]">部门名称</div>
          <div className="w-[8%] text-center">负责人</div>
          <div className="w-[8%] text-center">排序</div>
          <div className="w-[15%] text-center ml-[10%]">状态</div>
          <div className="w-[20%] text-center">创建时间</div>
          <div className="w-[19%] text-center">操作</div>
        </div>

        {create_div_list(tree_list)}
      </div>
    </div>
  );
}
export default User;
