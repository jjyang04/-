import {
  get_surveysquestion_list,
  put_surveysquestion,
  get_surveysquestion,
  post_surveysquestion,
  delete_surveysquestion,
} from "@/service";
import { Table, Button, Modal, Cascader } from "antd";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import user_store from "@/store";
function User() {
  const store = user_store();
  const [search_title, set_search_title] = useState("");
  const get_list = (title) => {
    get_surveysquestion_list({
      sid: store.surveys_id,
      title,
    }).then((res) => {
      console.log(res.data.data.result);
      set_dataSource(
        res.data.data.result.map((item) => {
          return {
            key: item.id,
            ID: item.id,
            question: item.title,
            type: return_type(item),
            resvise: (
              <div className=" text-[#49cc90] flex items-center">
                <div
                  className="flex items-center"
                  onClick={() => {
                    showModal();
                    set_axios_data(item);
                    get_options(item.id);
                    set_axios_type("修改");
                  }}
                >
                  <Icon icon="carbon:edit" className=" mr-[5px]" />
                  <span>修改</span>
                </div>
                <div
                  className="flex ml-[20px] items-center"
                  onClick={() => {
                    delete_surveysquestion(item.id)
                      .then(() => {
                        get_list(search_title);
                        window.openNotification("删除", "success");
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
            ),
          };
        })
      );
    });
  };
  const [delete_show, set_delete_show] = useState(false);
  useEffect(() => {
    get_list();
    // get_options();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const return_type = (item) => {
    if (item.qtype === "0") {
      return "单选";
    } else if (item.qtype === "1") {
      return "多选";
    } else {
      return "文本内容";
    }
  };
  const [options_arr, set_options_arr] = useState([]);
  const get_options = (id) => {
    get_surveysquestion(id).then((res) => {
      // console.log(res);
      if (res.data.data.options) {
        set_options_arr(res.data.data.options);
      } else {
        set_options_arr([]);
      }
    });
  };
  const [axios_type, set_axios_type] = useState("增加");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [axios_data, set_axios_data] = useState({
    sid: store.surveys_id,
    title: "",
    qtype: "",
  });
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    console.log(axios_data);
    for (let i in axios_data) {
      if (axios_data[i] === "") {
        // openNotification
        window.openNotification(axios_type, "warning");
        return;
      }
    }

    let obj = { ...axios_data };
    if (axios_data.qtype !== "2") {
      for (let i of options_arr) {
        if (i.trim() === "") {
          // openNotification
          window.openNotification(axios_type, "warning");
          return;
        }
      }
      obj = { ...axios_data, options: options_arr };
    }
    if (axios_type === "修改") {
      put_surveysquestion(obj)
        .then(() => {
          get_list(search_title);
          window.openNotification(axios_type, "success");
        })
        .catch(() => {
          window.openNotification(axios_type, "error");
        });
    } else {
      post_surveysquestion(obj)
        .then(() => {
          get_list(search_title);

          window.openNotification(axios_type, "success");
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

  // post_surveysquestion({
  //   id: 10000,
  //   sid: 10007,
  //   title: "食堂就餐环境如何",
  //   qtype: "0",
  //   options: ["非常好", "好", "一般", "差"],
  // });
  const [dataSource, set_dataSource] = useState();

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "问题",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "题目类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "操作",
      dataIndex: "resvise",
      key: "resvise",
    },
  ];
  const delete_res = () => {
    return delete_show ? "完成" : "删除选项";
  };
  const resvise_render = () => {
    if (axios_data.qtype === "0" || axios_data.qtype === "1") {
      return (
        <div>
          <div className="flex justify-center">
            <Button
              type="primary"
              onClick={() => {
                const arr = [...options_arr];
                arr.unshift("");
                set_options_arr(arr);
              }}
              className=" bg-[#1677ff] flex mr-[10px] items-center"
            >
              <Icon icon="teenyicons:add-solid" className="mr-[5px]" />
              增加选项
            </Button>
            <Button
              type="primary"
              className=" bg-[#1677ff] flex items-center"
              onClick={() => {
                set_delete_show(!delete_show);
              }}
            >
              <Icon icon="fluent:delete-24-regular" className="mr-[5px]" />
              {delete_res()}
            </Button>
          </div>
          {options_render()}
        </div>
      );
    }
  };
  const options_render = () => {
    return (
      <div className="mt-[20px]">
        {options_arr.map((item, index) => {
          return (
            <div className="flex justify-end items-center mb-[20px]">
              <span>选项</span>
              <div className="w-[80%] items-center flex ml-[10px]">
                <input
                  type="text"
                  placeholder="请输入选项"
                  value={item}
                  onChange={(e) => {
                    set_options_arr(
                      options_arr.map((item1, index1) => {
                        if (index1 === index) {
                          // console.log(item1);
                          item1 = e.target.value;
                        }
                        return item1;
                      })
                    );
                  }}
                  className=" w-[90%] py-[5px] rounded-md pl-[20px]  border border-gray-300 outline-none"
                />
                <div
                  style={{ display: delete_show ? "flex" : "none" }}
                  onClick={() => {
                    const arr = [...options_arr];
                    arr.splice(index, 1);
                    set_options_arr(arr);
                  }}
                  className="w-[22px] h-[22px] rounded-full ml-[10px]  bg-gray-300 cursor-pointer flex justify-center items-center"
                >
                  <Icon icon="streamline:delete-1" className="  text-[12px]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div>
      <Modal
        title="添加/修改"
        open={isModalOpen}
        destroyOnClose
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex justify-end mb-[20px]">
          <span>问题名称</span>
          <input
            type="text"
            value={axios_data.title}
            onChange={(e) => {
              set_axios_data({
                ...axios_data,
                title: e.target.value,
              });
            }}
            className="w-[80%] py-[5px] rounded-md pl-[20px] ml-[10px] border border-gray-300 outline-none"
          />
        </div>
        <div className="flex justify-end mb-[20px]">
          <span>题目类型</span>
          <div className="w-[80%] ml-[10px]">
            <Cascader
              defaultValue={[axios_data.qtype]}
              options={[
                {
                  value: "0",
                  label: "单选",
                },
                {
                  value: "1",
                  label: "多选",
                },
                {
                  value: "2",
                  label: "文本内容",
                },
              ]}
              onChange={(value) => {
                console.log(value);
                if (value) {
                  set_axios_data({
                    ...axios_data,
                    qtype: value[0],
                  });
                  set_options_arr([""]);
                }
              }}
              placeholder="请选择你的问题类型"
            />
          </div>
        </div>
        {resvise_render()}

        {/* <div className="flex justify-end">
          <span>问题答案</span>
          <input
            type="text"
            className="w-[80%] py-[5px] rounded-md pl-[20px] ml-[10px] border border-gray-300 outline-none"
          />
        </div> */}
      </Modal>
      <div className="flex">
        <span>问题:</span>
        <input
          type="text"
          value={search_title}
          onChange={(e) => {
            set_search_title(e.target.value);
          }}
          className="border ml-[10px] border-gray-300 rounded-md pl-[20px] outline-none py-[5px]"
        />
        <Button
          type="primary"
          onClick={() => {
            get_list(search_title);
          }}
          className="bg-[#1677ff] ml-[20px] flex items-center mr-[20px] "
        >
          <Icon icon="iconoir:search" className="mr-[10px]" />
          搜索
        </Button>
        <Button
          className="flex items-center"
          onClick={() => {
            set_search_title("");
            get_list();
          }}
        >
          <Icon icon="system-uicons:reset" className="mr-[10px]" />
          重置
        </Button>
      </div>
      <Button
        type="dashed"
        className="my-[20px]"
        onClick={() => {
          set_axios_type("增加");
          showModal();
          set_axios_data({
            sid: store.surveys_id,
            title: "",
            qtype: "",
          });
        }}
      >
        新增
      </Button>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
}
export default User;
