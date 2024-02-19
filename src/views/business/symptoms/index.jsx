import {
  get_symptoms,
  post_symptoms,
  put_symptoms,
  delete_symptoms,
} from "@/service";
import { Button, Table, Modal } from "antd";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import user_store from "@/store";
import Create from "./put_create_symptoms";
function User() {
  const store = user_store();
  const get_list = () => {
    get_symptoms().then((res) => {
      // console.log(res);
      set_data(
        res.data.data.result.map((item) => {
          return {
            key: item.id,
            ID: item.id,
            sex: item.sex,
            parts: store.parts_arr.filter(
              (item1) => item.partId === item1.id
            )[0]
              ? store.parts_arr.filter((item1) => item.partId === item1.id)[0]
                  .bodypart
              : "",
            partent: item.symptom,
            resvise: (
              <div className=" text-[#49cc90] flex items-center">
                <div
                  className="flex items-center"
                  onClick={() => {
                    set_axios_data(item);
                    showModal();
                    set_axios_type("put");
                  }}
                >
                  <Icon icon="carbon:edit" className=" mr-[5px]" />
                  <span>修改</span>
                </div>
                <div
                  className="flex ml-[20px] items-center"
                  onClick={() => {
                    delete_symptoms(item.id).then(() => {
                      get_list();
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
  const [axios_data, set_axios_data] = useState({
    partId: "",
    sex: "",
    symptom: "",
  });
  const [axios_type, set_axios_type] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (axios_type === "post")
      post_symptoms(axios_data)
        .then(() => {
          get_list();
          window.openNotification("增加", "success");
        })
        .catch(() => {
          window.openNotification("增加", "error");
        });
    else
      put_symptoms(axios_data)
        .then(() => {
          get_list();
          window.openNotification("修改", "success");
        })
        .catch(() => {
          window.openNotification("修改", "error");
        });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    get_list();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [data, set_data] = useState();
  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "适用性别",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "身体部位",
      dataIndex: "parts",
      key: "parts",
    },
    {
      title: "症状",
      dataIndex: "partent",
      key: "partent",
    },
    {
      title: "操作",
      dataIndex: "resvise",
      key: "resvise",
    },
  ];
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
      <div className="flex items-center mb-[20px]">
        <span>症状:</span>

        <input
          placeholder="请输入症状"
          type="text"
          className="py-[10px] ml-[10px] w-[250px] rounded-md border border-gray-300 outline-none pl-[20px]"
        />
        <Button
          type="primary"
          className="bg-[#1677ff] ml-[20px] flex items-center mr-[20px] "
        >
          <Icon icon="iconoir:search" className="mr-[10px]" />
          搜索
        </Button>
        <Button className="flex items-center">
          <Icon icon="system-uicons:reset" className="mr-[10px]" />
          重置
        </Button>
      </div>
      <Button
        type="primary"
        onClick={() => {
          set_axios_data({
            partId: "",
            sex: "",
            symptom: "",
          });
          set_axios_type("post");
          showModal();
        }}
        className="bg-[#1677ff]  flex items-center my-[20px] "
      >
        <Icon icon="teenyicons:add-outline" />
        新增
      </Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
export default User;
