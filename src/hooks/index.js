import { useEffect, useRef } from "react";

export function useComponentDidMount(callback) {
  useEffect(() => {
    if (typeof callback == "function") {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function useUpdate(callback) {
  //   const [flag, update_flag] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useRef也可以存储数据 hook或组件重新执行 但是值不会被重新初始化 保留最后的操作结果
  // ref变量里的变化不会触发组件的重新渲染,但是可以在多次渲染之间共享数据
  let flag = useRef(false);
  useEffect(() => {
    // console.log(flag);

    if (typeof callback == "function" && flag.current) {
      callback();
      // const [flag,useState_f]=useState()
    }

    flag.current = true;
    // update_flag(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //   在第一次渲染 flag.current=true
    //   第二次渲染时,flag.current
    //   flag的引用没有发生变化 ref是非常少见的可变数据,但是react并不会跟踪变化而重新渲染组件
  });
}

export function useBeforeDestory(callback) {
  useEffect(() => {
    if (typeof callback == "function") {
      //   return callback();
      return () => callback();
    }
    // typeof callback == "function" ??;

    // flag = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
