import { re_render } from "../index";
// 使用函数定义组件
let data = undefined;

function init(value) {
  data = value;
}
export function userDate(init_val) {
  //   console.log(data);
  // 避免数据重复初始化,给外界提供更新值的入口
  if (!data) init(init_val);
  let update = function (value) {
    data = value;
    console.log(data);
    re_render();
  };
  //   值更新,但是UI没有更新,原因是,你在更新数据的时候App函数并没有重新执行返回的新的JSX元素
  //   解决方案:在数据更新后,调用react.render()函数,强行更新UI界面
  //   遇到新问题:UI界面依旧不更新,函数重新执行,导致变量a重置为1
  //   解决方案,将a变为全局变量
  return [data, update];
}
