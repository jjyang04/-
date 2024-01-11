/* eslint-disable react-hooks/exhaustive-deps */
// use开头的函数  hook函数
import { useState, useRef } from "react";
// useEffect===componentDidMount+componentDidUpdate+componentWillUnMount
import { root } from "../index";
import React from "react";
import { useComponentDidMount, useUpdate, useBeforeDestory } from "@/hooks";

function Foo() {
  const [a, update_a] = useState(11);
  const div_ref = useRef(null);

  // 基于useEffect封装useComponentDidMount()
  //   // 使用useEffect实现compontentDidMount
  //   useEffect(() => {
  //     console.log("compontentDidMount");
  //     console.log(div_ref.current);
  //   }, []);
  useComponentDidMount(() => {
    console.log("挂载执行");
  });
  useUpdate(() => {
    console.log("数据更新");
  });
  useBeforeDestory(() => {
    console.log("卸载了");
  });
  //   // 使用useEffect实现compontentDidMount+compontentDidUpdate
  //   useEffect(() => {
  //     console.log("compontentDidMountcompontentDidUpdate");
  //   }, [a]);

  //   // 使用useEffect实现componentWillUnMount
  //   useEffect(() => {
  //     return () => {
  //       console.log("函数要没了");
  //     };
  //   }, []);
  // 第一种
  //   useEffect(() => {
  //     console.log(1);
  //     return () => {
  //       console.log(2);
  //     };
  //   });
  //   useEffect(() => {}, );

  // 第二种
  //   useEffect(() => {
  //     console.log(1);
  //     return () => {
  //       console.log(2);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     console.log("gengxin");
  //   });
  return (
    <div>
      <div ref={div_ref} onClick={() => update_a(a + 1)}>
        Foo组件a:{a}
      </div>
      <button onClick={() => root.unmount()}>卸载</button>
    </div>
  );
}
export default Foo;

// hooks模拟类组件功能的函数
// 为了让函数组件的功能和类相当,但是学习的复杂度,记忆成本直线降低
// 类组件==函数组件+hooks

// hook使用的条件
// hook可以在自定义hook函数的顶层使用
// hook在组件中使用时必须在组件的顶层,不得出现嵌套
// react允许基于官方hook函数封装自定义的hook函数
// 不能出现在条件判断和循环中
