import { Icon } from "@iconify/react";
import { Button, Table, Modal } from "antd";
import {
  get_Bodyparts_list,
  post_create_Bodyparts,
  delete_create_Bodyparts,
  put_Bodyparts,
} from "@/service";
import { useState, useEffect } from "react";
import Create from "./create_body_parts";
import Put from "./put_body";
import user_store from "@/store";
function User() {
  // const [is_delete_arr, set_is_delete_arr] = useState([]);
  const store = user_store();
  const get_all_body_parts = () => {
    get_Bodyparts_list()
      .then((res) => {
        store.set_parts_arr(res.data.data.result);
        const __arr = JSON.parse(JSON.stringify(res.data.data.result));
        __arr.fill(false);
        // set_is_delete_arr(__arr);
        const arr = res.data.data.result.map((item, index) => {
          // item.is_delete_arr = false;
          return {
            key: item.id,
            inp: inp_render(item, index),
            ID: item.id,
            parts: item.bodypart,
            sort: item.orderNum,
            create_time: item.create_time,
            res: revise_and_delete(item),
          };
        });
        console.log(arr);
        // setTimeout(() => {
        //   console.log(__arr, is_delete_arr);
        // }, 300);
        set_dataSource(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // put_create_Bodyparts({
  //   id: 10055,
  //   bodypart: "11111111111",
  //   orderNum: 999999,
  // });
  const revise_and_delete = (item) => {
    return (
      <div className=" text-[#49cc90] flex items-center">
        <div className="flex items-center" onClick={() => showModal_put(item)}>
          <Icon icon="carbon:edit" className=" mr-[5px]" />
          <span>修改</span>
        </div>
        <div
          className="flex ml-[20px] items-center"
          onClick={() => {
            delete_create_Bodyparts(item.id).then((res) => {
              get_all_body_parts();
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
  useEffect(() => {
    get_all_body_parts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [dataSource, set_dataSource] = useState([]);
  const inp_render = (item) => (
    <input
      type="checkbox"
      // checked={item.is_delete}
      onChange={change_inp_chekbox}
      name=""
      id=""
    />
  );

  // js实现一下浅对比

  const change_inp_chekbox = (e) => {
    // console.log(e, item.is_delete);
    console.log(dataSource);
    // set_dataSource(
    //   dataSource.map((item1, index1) => {
    //     if (index === index1) {
    //       item1.is_delete = e.target.checked;
    //     }
    //     console.log(item1);
    //     return item1;
    //   })
    // );
  };
  const columns = [
    {
      title: () => <input type="checkbox" name="" id="" />,
      dataIndex: "inp",
      key: "inp",
    },
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "部位",
      dataIndex: "parts",
      key: "parts",
    },
    {
      title: "排序ID",
      dataIndex: "sort",
      key: "sort",
    },
    {
      title: "添加时间",
      dataIndex: "create_time",
      key: "create_time",
    },
    {
      title: "操作",
      dataIndex: "res",
      key: "res",
    },
  ];

  // const [count, set_count] = useState(0);
  // const [num, set_num] = useState(10);

  // const fac = useCallback((num) => {
  //   console.log("num计算");
  //   if (num === 1) return 1;
  //   return fac(num - 1) * num;
  // }, []);
  // const res = useMemo(() => fac(num), [num, fac]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen_put, setIsModalOpen_put] = useState(false);
  const [put_item, set_put_item] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    // post_dept(post_obj);
    post_create_Bodyparts(parts).then((res) => {
      get_all_body_parts();
    });
    set_parts({
      bodypart: "",
      orderNum: 0,
    });
    console.log("确定");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    set_parts({
      bodypart: "",
      orderNum: 0,
    });
    console.log("取消");
  };

  const showModal_put = (item) => {
    set_put_item(item);
    setIsModalOpen_put(true);
  };
  const handleOk_put = () => {
    setIsModalOpen_put(false);
    // post_dept(post_obj);
    console.log(put_item);
    put_Bodyparts(put_item).then(() => {
      get_all_body_parts();
    });
    console.log("确定");
  };
  const handleCancel_put = () => {
    setIsModalOpen_put(false);

    console.log("取消");
  };
  const [parts, set_parts] = useState({
    bodypart: "",
    orderNum: 0,
  });
  return (
    <div>
      {/* <div>
        {num}的阶乘{res}
      </div>
      <div>count:{count}</div>
      <div onClick={() => set_count(count + 1)}>增加count</div>
      <div onClick={() => set_num(num + 1)}>增加num</div> */}
      <Modal
        title="添加"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Create parts={parts} set_parts={set_parts} />
      </Modal>
      <Modal
        title="修改"
        open={isModalOpen_put}
        onOk={handleOk_put}
        onCancel={handleCancel_put}
      >
        <Put put_item={put_item} set_put_item={set_put_item} />
      </Modal>
      <div className="flex">
        <div className="flex items-center mr-[20px]">
          <span className="mr-[10px]">部位名称:</span>
          <input
            type="text"
            className="border-[1px] outline-none border-gray-300 w-[200px] py-[5px] rounded-md"
          />
        </div>
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
      <div className="flex my-[20px]">
        <Button
          type="primary"
          onClick={showModal}
          className="bg-[#1677ff]  flex items-center mr-[20px] "
        >
          <Icon icon="iconoir:search" className="mr-[10px]" />
          新增
        </Button>
        <Button className="flex items-center">
          <Icon icon="system-uicons:reset" className="mr-[10px]" />
          修改
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
}
export default User;
