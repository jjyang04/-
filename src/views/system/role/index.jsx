import { get_userinfo_list } from "@/service";
import { Icon } from "@iconify/react";
import { Button } from "antd";
import { useState, useEffect } from "react";
function User() {
  const [user_arr, set_user_arr] = useState([]);
  const get_user_arr = () => {
    get_userinfo_list()
      .then((res) => {
        set_user_arr(res.data.data.result);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    get_user_arr();
  }, []);
  // put_userinfo_changeStatus({
  //   create_time: new Date(),
  //   roleId: 1,
  //   roleSort: 2,
  // })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  return (
    <div>
      <div className="flex">
        <div className="flex items-center">
          <span className="mr-[10px]">角色</span>
          <input
            type="text"
            className="border-[1px] border-gray-300 w-[200px] py-[5px] rounded-md"
          />
        </div>
        <div className="flex items-center ml-[20px]">
          <span className="mr-[10px]">状态</span>
          <input
            type="text"
            className="border-[1px] border-gray-300 w-[200px] py-[5px] rounded-md"
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
      <Button
        type="primary"
        className="bg-[#1677ff] mt-[20px] flex items-center mr-[20px] "
      >
        <Icon icon="iconoir:search" className="mr-[10px]" />
        新增
      </Button>
      <table className="border-collapse mt-[20px] border-spacing-0 ">
        <thead>
          <tr className="flex">
            <td className="border-[1px] border-gray-300 text-gray-400 py-[5px] text-center w-[80px]">
              编号
            </td>
            <td className="border-[1px] border-gray-300 text-gray-400 py-[5px] text-center w-[120px]">
              名称
            </td>
            <td className="border-[1px] border-gray-300 text-gray-400 py-[5px] text-center w-[120px]">
              权限字符
            </td>
            <td className="border-[1px] border-gray-300 text-gray-400 py-[5px] text-center w-[120px]">
              状态
            </td>
            <td className="border-[1px] border-gray-300 text-gray-400 py-[5px] text-center w-[180px]">
              创建时间
            </td>
            <td className="border-[1px] border-gray-300 text-gray-400 py-[5px] text-center w-[220px]">
              操作
            </td>
          </tr>
        </thead>
        <tbody>
          {user_arr.map((item) => (
            <tr className="flex" key={item.createTime}>
              <td className="border-[1px] border-gray-300 text-gray-400 py-[5px] text-center w-[80px]">
                {item.roleId}
              </td>
              <td className="border-[1px] border-gray-300 text-gray-400 py-[5px] text-center w-[120px]">
                {item.roleName}
              </td>
              <td className="border-[1px] border-gray-300 text-gray-400 py-[5px] text-center w-[120px]">
                {item.createBy}
              </td>
              <td className="border-[1px] border-gray-300 text-gray-400 py-[5px] text-center w-[120px]">
                {item.status}
              </td>
              <td className="border-[1px] border-gray-300 text-gray-400 py-[5px] text-center w-[180px]">
                {item.createTime}
              </td>
              <td className="border-[1px] border-gray-300 text-gray-400 py-[5px] text-center w-[220px]">
                {}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default User;
