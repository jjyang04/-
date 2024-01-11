// 在特定条件下清除定时器（错误示范）
import { useRef, useEffect, useState } from "react";

export default function Layout() {
  const ele = useRef(null);

  let timer = useRef(null);

  let [count, setCount] = useState(0);

  useEffect(function () {
    console.log(ele.current);
    timer.current = window.setInterval(function () {
      console.log(count);
      setCount(++count);
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    function () {
      if (count === 3) {
        // console.log(11);
        clearInterval(timer.current);
      }
    },
    [count]
  );

  return <div ref={ele}></div>;
}
