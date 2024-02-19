function Create_list() {
  return (
    <div>
      <div className="pl-[16px]">
        <span className="text-red-600">*</span>
        <span>上级部门</span>
        <input
          className="border-[1px] w-[80%] border-gray-400 outline-none"
          type="text"
          placeholder="请选择上级部门"
        />
      </div>
      <div className="flex justify-center my-[15px]">
        <div className="w-[50%] flex justify-end">
          <span className="text-red-600">*</span>
          <span>部门名称</span>
          <input
            className="border-[1px] border-gray-400 outline-none"
            type="text"
            placeholder="请输入部门名称"
          />
        </div>
        <div className="w-[50%]">
          <span className="text-red-600">*</span>
          <span>显示排序</span>
          <input
            className="border-[1px] border-gray-400 outline-none"
            type="number"
          />
        </div>
      </div>
      <div className="flex justify-center my-[15px]">
        <div className="w-[50%] flex justify-end">
          <span>负责人</span>
          <input
            className="border-[1px] border-gray-400 outline-none"
            type="text"
            placeholder="请输入负责人"
          />
        </div>
        <div className="w-[50%]">
          <span>联系电话</span>
          <input
            className="border-[1px] border-gray-400 outline-none"
            type="text"
            placeholder="请输入联系电话"
          />
        </div>
      </div>

      <div className="flex justify-center my-[15px]">
        <div className="w-[50%] flex justify-end">
          <span>邮箱</span>
          <input
            className="border-[1px] border-gray-400 outline-none"
            type="text"
            placeholder="请输入邮箱"
          />
        </div>
        <div className="w-[50%]">
          <span>部门状态</span>
          <input type="radio" name="status" />
          正常
          <input type="radio" name="status" />
          停用
        </div>
      </div>
    </div>
  );
}
export default Create_list;
