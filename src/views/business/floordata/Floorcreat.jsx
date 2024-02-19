// import axios from "axios";
import { useEffect } from "react";
import use_store from "@/store";
import { Cascader } from "antd";
import { v4 as uuidv4 } from "uuid";
import { Icon } from "@iconify/react";
function Floor_create(props) {
  const store = use_store();
  useEffect(() => {
    store.set_img_token();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const options = [
    {
      value: "门诊部",
      label: "门诊部",
    },
    {
      value: "住院部",
      label: "住院部",
    },
    {
      value: "急诊部",
      label: "急诊部",
    },
  ];
  return (
    <div>
      <div className="flex items-center  justify-end">
        <span>建筑物名</span>
        <div className="w-[85%] ml-[10px]">
          <Cascader
            options={options}
            onChange={(value, selectedOptions) => {
              console.log(value, selectedOptions);
              props.set_post_floor_data({
                ...props.post_floor_data,
                building: value[0],
              });
            }}
            placeholder="请选择"
          />
        </div>
      </div>
      <div className="flex items-center my-[30px] justify-end">
        <span>楼层</span>
        <div className="w-[85%] ml-[10px]">
          <input
            min="1"
            max="20"
            value={props.post_floor_data.floor}
            onChange={(e) => {
              props.set_post_floor_data({
                ...props.post_floor_data,
                floor: Number(e.target.value),
              });
            }}
            type="Number"
            className="border h-[30px] w-[30%] pl-[20px] rounded-md border-gray-300 outline-none"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <span>平面图</span>
        <div className="w-[85%] flex ml-[10px] ">
          <div className=" relative flex ">
            <div className="w-[150px] h-[150px] justify-center flex rounded-md border-dashed border bg-gray-100 border-gray-300 items-center">
              <Icon
                icon="teenyicons:add-solid"
                className="text-[28px] text-gray-400"
              />
            </div>
            <input
              type="file"
              className="w-[150px] opacity-0 h-[150px] absolute top-0 l-0 z-10"
              placeholder=""
              onChange={(e) => {
                if (e.target.files[0]) {
                  var reader = new FileReader();
                  reader.readAsDataURL(e.target.files[0]);
                  reader.onload = function () {
                    var image;
                    // console.log(e.target.nextElementSibling);
                    if (e.target.nextElementSibling) {
                      image = e.target.nextElementSibling;
                    } else {
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

                    store.post_img_dick(form).then((res) => {
                      props.set_post_floor_data({
                        ...props.post_floor_data,
                        planurl: res,
                      });
                      // console.log(res);
                    });
                    // console.log(store.post_img_dick(form));
                  };
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Floor_create;
