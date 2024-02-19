import { Breadcrumb } from "antd";
import { useCallback, useEffect, useState } from "react";
import user_store from "@/store";
function Crumbs() {
  const [item_breadcrumb, set_item_breadcrumb] = useState([]);
  const store = user_store();
  useEffect(() => {
    // const Router = JSON.parse(localStorage.getItem("Router"));
    // console.log(fn(Router));
    // const arr = fn(Router);
    // const obj = {};
    // arr.forEach((item) => {
    //   const key = Object.keys(item)[0];
    //   const value = Object.values(item)[0];
    //   obj[key] = value;
    //   //   return obj;
    // });
    // obj["home"] = "首页";
    // console.log(obj);
    // store.set_crumbs_arr(obj);]
    const user = sessionStorage.getItem("now_path")
      ? sessionStorage.getItem("now_path")
      : "user";
    set_item_breadcrumb(
      store.crumbs_arr[user].split("/").map((item, index) => {
        console.log(store.crumbs_arr[user].split("/").length - 1 === index);
        return index === store.crumbs_arr[user].split("/").length - 1
          ? {
              title: <span className="text-gray-700">{item}</span>,
            }
          : {
              title: <span className="text-gray-400">{item}</span>,
            };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStorage.getItem("now_path")]);
  const fn = useCallback((arr, name = "") => {
    let res = [];
    for (const i of arr) {
      if (i.children && i.children.length > 0) {
        // res.push(...fn(i.children, name + "/" + i.meta.title));
        if (name) {
          res.push(...fn(i.children, name + "/" + i.meta.title));
        } else {
          res.push(...fn(i.children, i.meta.title));
        }
        // fn(i.children, name + "/" + i.meta.title);
      } else {
        const path = i.path[0] === "/" ? i.path.slice(1) : i.path;
        let obj = {};
        obj[path] = name + "/" + i.meta.title;
        res.push(obj);
      }
    }
    return res;
  }, []);
  return (
    <div className="flex h-[64px] items-center pl-[10px] pb-[10px] box-border">
      <Breadcrumb items={item_breadcrumb} />
    </div>
  );
}
export default Crumbs;
