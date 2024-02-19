import user_store from "@/store";
import { Cascader } from "antd";
function Symptoms(props) {
  const store = user_store();
  console.log(props);
  const options = store.parts_arr.map((item) => {
    return {
      value: item.id,
      label: item.bodypart,
    };
  });
  const options1 = [
    {
      value: "0",
      label: "男",
    },
    {
      value: "1",
      label: "女",
    },
    {
      value: "2",
      label: "全部",
    },
  ];
  return (
    <div>
      <div className="flex justify-end items-center mb-[20px]">
        <span className="text-red-500">*</span>
        <span>适用性别</span>
        <div className="w-[80%] ml-[10px]">
          <Cascader
            // defaultValue={}
            options={options1}
            defaultValue={[
              options1.filter((item) => item.value === props.axios_data.sex)[0]
                ? options1.filter(
                    (item) => item.value === props.axios_data.sex
                  )[0].value
                : "",
            ]}
            onChange={(value) => {
              props.set_axios_data({
                ...props.axios_data,
                sex: value[0],
              });
            }}
            placeholder="请选择"
          />
        </div>
      </div>
      <div className="flex justify-end items-center mb-[20px]">
        <span className="text-red-500">*</span>
        <span>身体部位</span>
        <div className="w-[80%] ml-[10px]">
          <Cascader
            options={options}
            defaultValue={[
              options.filter(
                (item) => item.value === props.axios_data.partId
              )[0]
                ? options.filter(
                    (item) => item.value === props.axios_data.partId
                  )[0].value
                : "",
            ]}
            onChange={(value) => {
              props.set_axios_data({
                ...props.axios_data,
                partId: value[0],
              });
            }}
            placeholder="请选择"
          />
        </div>
      </div>
      <div className="flex justify-end items-center mb-[20px]">
        <span className="text-red-500">*</span>
        <span>症状</span>
        <div className="w-[80%] ml-[10px]">
          <input
            type="text"
            value={props.axios_data.symptom}
            onChange={(e) => {
              props.set_axios_data({
                ...props.axios_data,
                symptom: e.target.value,
              });
            }}
            placeholder="请输入症状"
            className="py-[5px] border border-gray-300 rounded-md pl-[20px] outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default Symptoms;
