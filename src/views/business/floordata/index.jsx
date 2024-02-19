import { get_foordata_list, delete_foordata, post_foordata } from "@/service";
import { Divider, Table, Button, Modal } from "antd";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Floorcreate from "./Floorcreat";

function User() {
  const [foor_data, set_foor_data] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [post_floor_data, set_post_floor_data] = useState({
    building: "",
    floor: "",
    planurl: "",
  });
  const [delete_id, set_delete_id] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      set_delete_id(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const handleOk = () => {
    for (const key in post_floor_data) {
      if (!post_floor_data[key]) {
        return alert("您的信息没有填写完整");
      }
    }
    post_foordata({ ...post_floor_data, building: 5 });
    setIsModalOpen(false);
    get_list();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    set_post_floor_data({
      building: "",
      floor: "",
      planurl: "",
    });
  };
  const get_list = () => {
    get_foordata_list().then((res) => {
      // console.log(res);
      set_foor_data(
        res.data.data.result.map((item) => {
          return {
            key: item.id,
            id: item.id,
            buildname: item.building,
            floor_num: item.floor,
            create_time: item.create_time,
            resvise: create_resvise(item),
          };
        })
      );
    });
  };
  const create_resvise = (item) => {
    return (
      <div className="flex text-[#49cc90] items-center">
        <div>
          <div
            className=" flex items-center mr-[10px]  cursor-pointer"
            onClick={() => {}}
          >
            <Icon icon="carbon:edit" className=" mr-[5px]" />
            <span>坐标数据</span>
          </div>
        </div>
        <div
          className=" flex items-center mr-[10px]  cursor-pointer"
          onClick={() => {}}
        >
          <Icon icon="carbon:edit" className=" mr-[5px]" />
          <span>修改</span>
        </div>
        <div
          className=" flex  items-center cursor-pointer "
          onClick={() => {
            delete_foordata(item.id).then(() => {
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
    );
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "建筑物名",
      dataIndex: "buildname",
    },
    {
      title: "楼层",
      dataIndex: "floor_num",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
    },
    {
      title: "操作",
      dataIndex: "resvise",
    },
  ];
  useEffect(() => {
    get_list();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const selectionType = "checkbox";
  return (
    <div>
      <Modal
        title="添加"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Floorcreate
          post_floor_data={post_floor_data}
          set_post_floor_data={set_post_floor_data}
        />
      </Modal>
      <Divider />
      <div className="my-[20px]">
        <Button type="primary" className="bg-[#1677ff]" onClick={showModal}>
          新增
        </Button>
        <Button
          type="primary"
          onClick={() => {
            // console.log(delete_id);
            if (delete_id && delete_id.length > 0) {
              delete_foordata(delete_id.join(",")).then(() => {
                get_list();
              });
            }
          }}
          className="bg-[#1677ff] ml-[20px]"
        >
          删除
        </Button>
      </div>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={foor_data}
      />
    </div>
  );
}
export default User;
