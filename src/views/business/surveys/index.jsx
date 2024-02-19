import {
  get_surveys_list,
  post_surveys_list,
  put_surveys_list,
  delete_surveys_list,
} from "@/service";
import { useEffect, useState } from "react";
import { Button, Modal, Cascader } from "antd";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import user_store from "@/store";
function User() {
  const navigate = useNavigate();
  const store = user_store();
  const [question, set_question] = useState("");
  const [surveys_list, set_surveys_list] = useState([]);
  const [axios_data, set_axios_data] = useState({
    title: "",
    status: "",
    start_time: "",
    end_time: "",
  });
  const [axios_type, set_axios_type] = useState("增加");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    console.log(axios_data);
    for (let i in axios_data) {
      if (axios_data[i] === "") {
        console.log(axios_data[i] === "");
        window.openNotification(axios_type, "warning");
        // openNotification
        return;
      }
    }
    if (axios_type === "增加") {
      post_surveys_list(axios_data)
        .then(() => {
          // console.log("增加成功");
          window.openNotification(axios_type, "success");
          get_list(question);
        })
        .catch(() => {
          // console.log("增加失败");

          window.openNotification(axios_type, "error");
        });
    } else {
      put_surveys_list(axios_data)
        .then(() => {
          // console.log("修改成功");

          window.openNotification(axios_type, "success");
          get_list(question);
        })
        .catch(() => {
          // console.log("修改失败");

          window.openNotification(axios_type, "error");
        });
    }
    setIsModalOpen(false);
    set_axios_data({
      title: "",
      status: "",
      start_time: "",
      end_time: "",
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    set_axios_data({
      title: "",
      status: "",
      start_time: "",
      end_time: "",
    });
  };
  const is_status = (status) => {
    return status === 0 ? "启用" : "已禁用";
  };
  const get_list = (title) => {
    get_surveys_list({ title }).then((res) => {
      console.log(res);
      set_surveys_list(res.data.data.result);
    });
  };
  useEffect(() => {
    get_list();
  }, []);
  const create_li = () => {
    return surveys_list.map((item) => {
      // console.log(item);
      return (
        <li className="flex" key={item.id + item.title}>
          <div className=" py-[10px] flex justify-center items-center border-r-[1px] border-b-[1px] border-gray-300 w-[10%]">
            {item.id}
          </div>
          <div className=" py-[10px] flex justify-center items-center border-r-[1px] border-b-[1px] border-gray-300 w-[20%]">
            {item.title}
          </div>
          <div className=" py-[10px] flex justify-center items-center border-r-[1px] border-b-[1px] border-gray-300 w-[8%]">
            {is_status(item.status)}
          </div>
          <div className=" py-[10px] flex justify-center items-center border-r-[1px] border-b-[1px] border-gray-300 w-[14%]">
            {item.start_time}
          </div>
          <div className=" py-[10px] flex justify-center items-center border-r-[1px] border-b-[1px] border-gray-300 w-[14%]">
            {item.end_time}
          </div>
          <div className=" py-[10px] flex justify-center items-center border-r-[1px] border-b-[1px] border-gray-300 w-[14%]">
            {item.create_time}
          </div>
          <div className=" py-[10px] flex justify-center items-center border-r-[1px] border-b-[1px] border-gray-300 w-[20%]">
            <div className=" text-[#49cc90] flex items-center">
              <div
                className="flex items-center"
                onClick={() => {
                  store.set_surveys_id(item.id);
                  sessionStorage.setItem(
                    "now_path",
                    "business/Surveysquestion"
                  );
                  // console.log(store.path_key);
                  const arr = JSON.parse(sessionStorage.getItem("path_arr"));
                  console.log(arr);
                  if (arr.indexOf("business/Surveysquestion") === -1)
                    arr.push("business/Surveysquestion");
                  if (arr.length > 12) arr.splice(1, 1);
                  sessionStorage.setItem("path_arr", JSON.stringify(arr));
                  console.log(arr);

                  navigate("../business/Surveysquestion");
                }}
              >
                <Icon icon="carbon:edit" className=" mr-[5px]" />
                <span>编辑问题</span>
              </div>
              <div
                className="flex items-center"
                onClick={() => {
                  set_axios_data(item);
                  showModal();
                  set_axios_type("修改");
                }}
              >
                <Icon icon="carbon:edit" className=" mr-[5px]" />
                <span>修改</span>
              </div>
              <div
                className="flex ml-[20px] items-center"
                onClick={() => {
                  delete_surveys_list(item.id)
                    .then(() => {
                      window.openNotification("删除", "success");
                      get_list(question);
                    })
                    .catch(() => {
                      window.openNotification("删除", "error");
                    });
                }}
              >
                <Icon
                  icon="material-symbols-light:delete-outline"
                  className="text-[18px] mr-[5px]"
                />
                <span>删除</span>
              </div>
            </div>
          </div>
        </li>
      );
    });
  };
  // post_surveys_list({
  //   title: "急诊部问卷调查列表",
  //   status: 0,
  //   start_time: "2024-01-23T02:40:51.562Z",
  //   end_time: "2024-02-23T02:40:51.562Z",
  // });
  return (
    <div>
      <Modal
        title="添加/修改"
        open={isModalOpen}
        destroyOnClose
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex justify-end my-[20px]">
          <span>问卷调查标题</span>
          <input
            type="text"
            value={axios_data.title}
            onChange={(e) => {
              set_axios_data({
                ...axios_data,
                title: e.target.value,
              });
            }}
            className="w-[80%] h-[35px] border ml-[10px] border-gray-300 rounded-md pl-[20px] outline-none"
          />
        </div>
        <div className="flex justify-end my-[20px]">
          <span>状态</span>
          <div className="w-[80%] ml-[10px]">
            <Cascader
              defaultValue={[axios_data.status]}
              options={[
                {
                  value: 0,
                  label: "启用",
                },
                {
                  value: 1,
                  label: "已禁用",
                },
              ]}
              onChange={(value) => {
                console.log(value);
                if (value) {
                  set_axios_data({
                    ...axios_data,
                    status: value[0],
                  });
                }
              }}
              placeholder=""
            />
          </div>
        </div>
        <div className="flex items-center my-[20px] justify-end">
          <span>问卷开始时间</span>
          <div className="w-[80%]">
            <input
              type="date"
              value={axios_data.start_time.slice(0, 10)}
              className="border border-gray-300 pl-[20px] h-[35px] ml-[10px] w-[40%] rounded-md outline-none"
              onChange={(e) => {
                // set_axios_data({
                //   ...axios_data,
                //   start_time: e.target.value,
                // });
                set_axios_data({
                  ...axios_data,
                  start_time: e.target.value,
                  end_time:
                    e.target.value >= axios_data.end_time
                      ? ""
                      : axios_data.end_time,
                });
              }}
            />
          </div>
        </div>
        <div className="flex items-center my-[20px] justify-end">
          <span>问卷结束时间</span>
          <div className="w-[80%]">
            <input
              type="date"
              value={axios_data.end_time.slice(0, 10)}
              className="border border-gray-300 pl-[20px] h-[35px] ml-[10px] w-[40%]  rounded-md outline-none"
              onChange={(e) => {
                // console.log(
                //   e.target.value,
                //   e.target.value > axios_data.start_time
                // );
                // console.log(
                //   e.target.value,
                //   axios_data.end_time,
                //   axios_data.start_time
                // );

                set_axios_data({
                  ...axios_data,
                  end_time: e.target.value,
                  start_time:
                    e.target.value <= axios_data.start_time
                      ? ""
                      : axios_data.start_time,
                });
                // console.log(e.target.value <= axios_data.start_time);
                // if (e.target.value <= axios_data.start_time) {
                //   set_axios_data({
                //     ...axios_data,
                //     start_time: "",
                //   });
                // }
              }}
            />
          </div>
        </div>
      </Modal>
      <div className="flex items-center">
        <span>问卷调查标题</span>
        <input
          type="text"
          value={question}
          onChange={(e) => {
            set_question(e.target.value);
          }}
          className="h-[35px] border border-gray-300 w-[300px] rounded-md pl-[20px] ml-[20px] outline-none"
        />
        <Button
          type="primary"
          onClick={() => {
            get_list(question);
          }}
          className="bg-[#1677ff] ml-[20px] flex items-center mr-[20px] "
        >
          <Icon icon="iconoir:search" className="mr-[10px]" />
          搜索
        </Button>
        <Button
          className="flex items-center"
          onClick={() => {
            set_question("");
            get_list();
          }}
        >
          <Icon icon="system-uicons:reset" className="mr-[10px]" />
          重置
        </Button>
      </div>
      <div className="mt-[20px]">
        <Button
          type="primary"
          onClick={() => {
            showModal();
            set_axios_type("增加");
          }}
          className="bg-[#1677ff]  flex items-center  "
        >
          <Icon icon="teenyicons:add-solid" className="mr-[10px]" />
          新增
        </Button>
      </div>
      <div>
        <ul className="mt-[20px] border-t-[1px] border-gray-300 border-l-[1px]">
          <li className="flex">
            <div className=" py-[10px] flex justify-center items-center border-r-[1px] border-b-[1px] border-gray-300 w-[10%]">
              ID
            </div>
            <div className=" py-[10px] flex justify-center items-center border-r-[1px] border-b-[1px] border-gray-300 w-[20%]">
              问卷调查标题
            </div>
            <div className=" py-[10px] flex justify-center items-center border-r-[1px] border-b-[1px] border-gray-300 w-[8%]">
              状态
            </div>
            <div className=" py-[10px] flex justify-center items-center border-r-[1px] border-b-[1px] border-gray-300 w-[14%]">
              开始时间
            </div>
            <div className=" py-[10px] flex justify-center items-center border-r-[1px] border-b-[1px] border-gray-300 w-[14%]">
              结束时间
            </div>
            <div className=" py-[10px] flex justify-center items-center border-r-[1px] border-b-[1px] border-gray-300 w-[14%]">
              创建时间
            </div>
            <div className=" py-[10px] flex justify-center items-center border-r-[1px] border-b-[1px] border-gray-300 w-[20%]">
              操作
            </div>
          </li>
          {create_li()}
        </ul>
      </div>
    </div>
  );
}
export default User;
