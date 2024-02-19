import user_store from "@/store";
import { Icon } from "@iconify/react";
import { Cascader } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Add_doctor(props) {
  const store = user_store();
  console.log(props);
  const [options, set_options] = useState();
  useEffect(() => {
    // console.log(store.dept_arr);
    set_options(
      store.dept_arr.map((item) => {
        // console.log(item);
        return {
          value: item.id,
          label: item.deptName,
        };
      })
    );
    store.set_img_token();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const is_images = () => {
    if (props.axios_data.images) {
      return (
        <img
          src={props.axios_data.images}
          className="w-[150px] h-[150px] absolute top-0 left-0"
          alt={props.axios_data.deptName + "的名字"}
        />
      );
    }
  };
  const default_value = () => {
    return store.dept_arr.filter(
      (item) => props.axios_data.deptid === item.id
    )[0]
      ? store.dept_arr.filter((item) => props.axios_data.deptid === item.id)[0]
          .deptName
      : "";
  };
  console.log([default_value()], props.axios_data.deptid);
  return (
    <div>
      <div className="flex items-center justify-end mb-[20px]">
        <span className="text-red-500">*</span>
        <span>专家名称</span>
        <div className="ml-[20px] w-[80%]">
          <input
            type="text"
            value={props.axios_data.doctorName}
            placeholder="请输入专家名称"
            onChange={(e) => {
              props.set_axios_data({
                ...props.axios_data,
                doctorName: e.target.value,
              });
            }}
            className="border border-gray-300 w-[90%] rounded-md py-[10px] pl-[20px] outline-none"
          />
        </div>
      </div>
      <div className="flex items-center justify-end mb-[20px]">
        <span>职称</span>
        <div className="ml-[20px] w-[80%]">
          <input
            type="text"
            placeholder="请输入职称"
            value={props.axios_data.title}
            onChange={(e) => {
              props.set_axios_data({
                ...props.axios_data,
                title: e.target.value,
              });
            }}
            className="border w-[90%]  border-gray-300 rounded-md py-[10px] pl-[20px] outline-none"
          />
        </div>
      </div>
      <div className="flex items-center justify-end mb-[20px]">
        <span>医生代码</span>
        <div className="ml-[20px] w-[80%]">
          <input
            type="text"
            value={props.axios_data.doctorCode}
            placeholder="请输入医生代码"
            onChange={(e) => {
              props.set_axios_data({
                ...props.axios_data,
                doctorCode: e.target.value,
              });
            }}
            className="border w-[90%]  border-gray-300 rounded-md py-[10px] pl-[20px] outline-none"
          />
        </div>
      </div>
      <div className="flex items-center justify-end mb-[20px]">
        <span>擅长</span>
        <div className="ml-[20px] w-[80%]">
          <input
            type="text"
            placeholder="请输入擅长"
            onChange={(e) => {
              props.set_axios_data({
                ...props.axios_data,
                skilled: e.target.value,
              });
            }}
            value={props.axios_data.skilled}
            className="border w-[90%]  border-gray-300 rounded-md py-[10px] pl-[20px] outline-none"
          />
        </div>
      </div>
      <div className="flex items-center justify-end mb-[20px]">
        <span>排序ID</span>
        <div className="ml-[20px] w-[80%]">
          <input
            type="Number"
            min="0"
            value={props.axios_data.orderNum}
            onChange={(e) => {
              props.set_axios_data({
                ...props.axios_data,
                orderNum: e.target.value,
              });
            }}
            max="10000"
            className="border w-[40%]  border-gray-300 rounded-md py-[10px] pl-[20px] outline-none"
          />
        </div>
      </div>
      <div className="flex items-center justify-end mb-[20px]">
        <span>头像</span>
        <div className="ml-[20px] w-[80%]">
          <div className="w-[150px] h-[150px]  relative flex justify-center items-center bg-gray-100 border-dashed border-gray-300 ">
            <Icon icon="teenyicons:add-outline" className="text-[26px]" />
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files[0]) {
                  var reader = new FileReader();
                  reader.readAsDataURL(e.target.files[0]);
                  reader.onload = function () {
                    var image;
                    // console.log(e.target.nextElementSibling);
                    if (e.target.nextElementSibling) {
                      console.log("有");
                      image = e.target.nextElementSibling;
                    } else {
                      console.log("没有");
                      image = document.createElement("img");
                    }
                    image.width = "150";
                    image.height = "150";
                    image.src = reader.result;
                    var showPicture = e.target.parentNode;
                    console.log(showPicture);
                    showPicture.append(image);
                    const form = new FormData();
                    form.append("key", uuidv4());
                    form.append("file", e.target.files[0]);
                    form.append("token", store.img_token.uploadToken);

                    // console.log(store.post_img_dick(form));
                    store.post_img_dick(form).then((res) => {
                      props.set_axios_data({
                        ...props.axios_data,
                        images: res,
                      });
                      // console.log(res);
                    });
                  };
                }
              }}
              className="w-[150px] h-[150px] z-10 opacity-0 top-0 left-0 absolute"
            />
            {is_images()}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end mb-[20px]">
        <span>请选择科室</span>
        <div className="ml-[20px] w-[80%]">
          <Cascader
            options={options}
            defaultValue={[default_value()]}
            onChange={(value) => {
              console.log(value);
              props.set_axios_data({
                ...props.axios_data,
                deptid: value[0],
              });
            }}
            placeholder="请选择科室"
          />
        </div>
      </div>
      <div className="flex items-center justify-end mb-[20px]">
        <span>简介</span>
        <div className="ml-[20px] w-[80%]">
          <input
            type="text"
            value={props.axios_data.introduction}
            onChange={(e) => {
              props.set_axios_data({
                ...props.axios_data,
                introduction: e.target.value,
              });
            }}
            className="border w-[90%]  border-gray-300 rounded-md py-[10px] pl-[20px] outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default Add_doctor;
