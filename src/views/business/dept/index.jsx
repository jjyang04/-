/* eslint-disable array-callback-return */
import {
  get_dept_lsit,
  post_dept,
  delete_dept_lsit,
  put_dept,
} from "@/service";
import user_store from "@/store";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button, Modal, Pagination } from "antd";
import Create from "./create_modal";
function User() {
  const store = user_store();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [axios_type, set_axios_type] = useState("");
  const [post_obj, set_post_obj] = useState({
    deptName: "",
    orderNum: "",
    deptType: "0",
    position: "",
    deptCode: "",
    introduction: "",
  });
  const [dept_list_bus, set_dept_list_bus] = useState([]);
  const [now_dept_list_bus, set_now_dept_list_bus] = useState([]);
  const [inp_code, set_inp_code] = useState("");
  const [inp_name, set_inp_name] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
    set_axios_type("put");
    set_post_obj({
      deptName: "",
      orderNum: "",
      deptType: "0",
      position: "",
      deptCode: "",
      introduction: "",
    });
  };
  const handleOk = () => {
    setIsModalOpen(false);
    if (axios_type === "post") post_dept(post_obj);
    else put_dept(post_obj);
    set_post_obj({
      deptName: "",
      orderNum: "",
      deptType: "0",
      position: "",
      deptCode: "",
      introduction: "",
    });
    console.log("确定");
    getlist();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    console.log("取消");
  };
  const getlist = () => {
    get_dept_lsit()
      .then((res) => {
        console.log(store.set_dept_arr);
        store.set_dept_arr(res.data.data.result);
        set_dept_list_bus(res.data.data.result);
        set_now_dept_list_bus(res.data.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getlist();
    set_page_now(1);
    set_page_size_now(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const [page_now, set_page_now] = useState();
  const [page_size_now, set_page_size_now] = useState();

  const create_li = () => {
    let render_arr = [];
    if (now_dept_list_bus.length > page_size_now) {
      // console.log((page - 1) * pageSize + 1, page * pageSize + 1);
      // console.log(
      //   now_dept_list_bus.slice(
      //     (page - 1) * pageSize + 1,
      //     page * pageSize + 1
      //   )
      // );
      render_arr = now_dept_list_bus.slice(
        (page_now - 1) * page_size_now + 1,
        page_now * page_size_now + 1
      );
    } else {
      render_arr = [...now_dept_list_bus];
    }
    return render_arr.map((item) => (
      <li className="flex " key={item.id + item.deptCode}>
        <div className="w-[10%] text-center py-[10px] border border-gray-300 mr-[-1px] mb-[-1px]">
          {item.id}
        </div>
        <div className="w-[15%] text-center py-[10px] border border-gray-300 mr-[-1px] mb-[-1px]">
          {item.deptCode}
        </div>
        <div className="w-[15%] text-center py-[10px] border border-gray-300 mr-[-1px] border-r-0 mb-[-1px]">
          {item.deptName}
        </div>
        <div className="w-[15%] text-center py-[10px] border border-gray-300 mr-[-1px] mb-[-1px]">
          {item.position}
        </div>
        <div className="w-[15%] text-center py-[10px] border border-gray-300 mr-[-1px] mb-[-1px]">
          {item.orderNum}
        </div>
        <div className="w-[15%] text-center py-[10px] border border-gray-300 mr-[-1px] mb-[-1px]">
          {item.deptType}
        </div>
        <div className="w-[15%] text-[#49cc90] flex  justify-center py-[10px] border border-gray-300 mr-[-1px] mb-[-1px]">
          <div
            className=" flex items-center mr-[10px]  cursor-pointer"
            onClick={() => {
              set_axios_type("put");
              set_post_obj(item);
              setIsModalOpen(true);
            }}
          >
            <Icon icon="carbon:edit" className=" mr-[5px]" />
            <span>修改</span>
          </div>
          <div
            className=" flex  items-center cursor-pointer "
            onClick={() => {
              console.log(111);
              delete_dept_lsit(item.id);
              getlist();
            }}
          >
            <Icon
              icon="material-symbols-light:delete-outline"
              className="text-[18px] mr-[5px]"
            />

            <span>删除</span>
          </div>
        </div>
      </li>
    ));
  };
  return (
    <div>
      <Modal
        title="添加科室"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Create post_obj={post_obj} set_post_obj={set_post_obj} />
      </Modal>
      <div className="flex">
        <div className="flex items-center">
          <span className="mr-[10px]">科室代码</span>
          <input
            type="text"
            value={inp_code}
            onChange={(e) => {
              set_inp_code(e.target.value.trim());
            }}
            className="border-[1px] outline-none pl-[20px] border-gray-300 w-[200px] py-[5px] rounded-md"
          />
        </div>
        <div className="flex items-center ml-[20px]">
          <span className="mr-[10px]">科室名称</span>
          <input
            value={inp_name}
            type="text"
            onChange={(e) => {
              set_inp_name(e.target.value.trim());
            }}
            className="border-[1px] outline-none pl-[20px] border-gray-300 w-[200px] py-[5px] rounded-md"
          />
        </div>
        <Button
          type="primary"
          onClick={() => {
            console.log(123);
            if (inp_name || inp_code) {
              console.log(111);
              set_now_dept_list_bus(
                dept_list_bus.filter((item) => {
                  if (item.deptCode.includes(inp_code)) {
                    if (inp_name) {
                      if (item.deptName.includes(inp_name)) {
                        return item;
                      }
                    } else {
                      return item;
                    }
                  }
                })
              );
            } else {
              console.log(222);
              set_now_dept_list_bus(dept_list_bus);
            }
          }}
          className="bg-[#1677ff] ml-[20px] flex items-center mr-[20px] "
        >
          <Icon icon="iconoir:search" className="mr-[10px]" />
          搜索
        </Button>
        <Button
          className="flex items-center"
          onClick={() => {
            set_inp_name("");
            set_inp_code("");
            set_now_dept_list_bus(dept_list_bus);
          }}
        >
          <Icon icon="system-uicons:reset" className="mr-[10px]" />
          重置
        </Button>
      </div>
      <Button
        type="primary"
        onClick={() => {
          showModal();
          set_axios_type("post");
        }}
        className="bg-[#1677ff] mt-[20px] flex items-center mr-[20px] "
      >
        <Icon icon="iconoir:search" className="mr-[10px]" />
        新增
      </Button>
      <ul className="text-gray-500 mt-[20px]">
        <li className="flex ">
          <div className="w-[10%] text-center py-[10px] border border-gray-300 mr-[-1px] mb-[-1px]">
            ID
          </div>
          <div className="w-[15%] text-center py-[10px] border border-gray-300 mr-[-1px] mb-[-1px]">
            科室代码
          </div>
          <div className="w-[15%] text-center py-[10px] border border-gray-300 mr-[-1px] border-r-0 mb-[-1px]">
            科室名称
          </div>
          <div className="w-[15%] text-center py-[10px] border border-gray-300 mr-[-1px] mb-[-1px]">
            科室位置
          </div>
          <div className="w-[15%] text-center py-[10px] border border-gray-300 mr-[-1px] mb-[-1px]">
            排序ID
          </div>
          <div className="w-[15%] text-center py-[10px] border border-gray-300 mr-[-1px] mb-[-1px]">
            科室类型
          </div>
          <div className="w-[15%] text-center py-[10px] border border-gray-300 mr-[-1px] mb-[-1px]">
            操作
          </div>
        </li>

        {create_li()}
      </ul>
      <div className="mt-[20px] flex justify-end items-center">
        <span>共{now_dept_list_bus.length}条</span>
        <Pagination
          showQuickJumper
          showSizeChanger
          pageSizeOptions={[5, 10, 20, 50]}
          onShowSizeChange={onShowSizeChange}
          onChange={(page, pageSize) => {
            console.log(page, pageSize);
            set_page_now(page);
            set_page_size_now(pageSize);
          }}
          defaultCurrent={1}
          total={now_dept_list_bus.length}
        ></Pagination>
      </div>
    </div>
  );
}
export default User;
