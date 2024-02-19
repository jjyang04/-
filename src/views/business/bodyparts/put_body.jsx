function Put_parts(props) {
  console.log(props);
  return (
    <div>
      <div className="flex justify-end items-center my-[15px]">
        <div>
          <span className="text-red-500">*</span>
          <span>部位</span>
        </div>
        <input
          type="text"
          value={props.put_item.bodypart}
          onChange={(e) => {
            props.set_put_item({
              id: props.put_item.id,
              orderNum: props.put_item.orderNum,
              bodypart: e.target.value,
            });
          }}
          placeholder="请输入部位"
          className="w-[80%] border border-gray-300 py-[5px]  pl-[20px] ml-[20px]  rounded-md outline-none"
        />
      </div>
      <div className="flex justify-end items-center my-[15px]">
        <span>排序ID</span>
        <div className="w-[80%] ml-[20px]">
          <input
            type="Number"
            value={props.put_item.orderNum}
            onChange={(e) => {
              props.set_put_item({
                id: props.put_item.id,
                bodypart: props.put_item.bodypart,
                orderNum: e.target.value,
              });
            }}
            min="0"
            max="100000"
            className="w-[30%]  border border-gray-300 py-[5px] pl-[20px]  rounded-md outline-none"
          />
        </div>
      </div>
    </div>
  );
}
export default Put_parts;
