// import Sec from "@/components/sec_page";

function Create_modal(props) {
  const { post_obj, set_post_obj } = props;
  // console.log(post_obj, set_post_obj);
  return (
    <div>
      <div className="flex justify-end items-center my-[5px]">
        <span>科室代码</span>
        <div className="w-[80%] h-[40px]">
          <input
            type="text"
            value={post_obj.deptCode}
            onChange={(e) => {
              set_post_obj({
                ...post_obj,
                deptCode: e.target.value,
              });
            }}
            placeholder="请输入科室代码"
            className="w-[100%] border border-gray-300 pl-[20px]  outline-none ml-[10px] h-[35px] rounded-md"
          />
        </div>
      </div>
      <div className="flex justify-end items-center my-[10px]">
        <span>科室名称</span>
        <div className="w-[80%] h-[40px]">
          <input
            type="text"
            value={post_obj.deptName}
            onChange={(e) => {
              set_post_obj({
                ...post_obj,
                deptName: e.target.value,
              });
            }}
            placeholder="请输入科室名称"
            className="w-[100%] border border-gray-300 pl-[20px]  outline-none ml-[10px] h-[35px] rounded-md"
          />
        </div>
      </div>
      <div className="flex justify-end items-center my-[10px]">
        <span>排序ID</span>
        <div className="w-[80%] h-[40px]">
          <input
            type="Number"
            min="0"
            value={post_obj.orderNum}
            onChange={(e) => {
              console.log(e);
              set_post_obj({
                ...post_obj,
                orderNum: Number(e.target.value),
              });
            }}
            max="10000"
            className=" ml-[10px] h-[35px] w-[50%]  pl-[20px] rounded-md border border-gray-300 outline-none"
          />
        </div>
      </div>
      <div className="flex justify-end items-center my-[10px]">
        <span>科室类型</span>
        <div className="w-[80%] h-[40px]">
          <input
            type="text"
            value={post_obj.deptType}
            onChange={(e) => {
              console.log(e);
            }}
            className=" ml-[10px] h-[35px] pl-[20px]  rounded-md border border-gray-300 outline-none"
          />
        </div>
      </div>
      <div className="flex justify-end items-center my-[10px]">
        <span>科室位置</span>
        <div className="w-[80%] h-[40px]">
          <input
            type="text"
            value={post_obj.position}
            onChange={(e) => {
              set_post_obj({
                ...post_obj,
                position: e.target.value,
              });
            }}
            placeholder="请输入科室位置(楼层编号)"
            className="w-[100%] border border-gray-300 pl-[20px]  outline-none ml-[10px] h-[35px] rounded-md"
          />
        </div>
      </div>
      <div className="flex justify-end items-center my-[10px] mb-[50px]">
        <span>科室介绍</span>
        <div className="w-[80%]  flex ">
          <textarea
            type="text"
            value={post_obj.introduction}
            onChange={(e) => {
              set_post_obj({
                ...post_obj,
                introduction: e.target.value,
              });
            }}
            className=" min-h-[20px] max-h-[70px] ml-[10px] h-[25px] pl-[20px]  w-[100%] rounded-md border border-gray-300 outline-none"
          />
          {/* <Sec className="w-[300px] h-[200px]" /> */}
        </div>
      </div>
    </div>
  );
}
export default Create_modal;
