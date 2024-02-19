import { notification } from "antd";
const App = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (resvise, type) => {
    // console.log(11);
    let text;
    if (type === "warning") {
      text = "参数没有填写完整";
    } else if (type === "success") {
      text = "成功";
    } else {
      text = "请求发出,但发生未知错误";
    }
    api[type]({
      message: `操作提醒`,
      description: `您的${resvise}操作${text}`,
      placement: "top",
    });
  };
  window.openNotification = openNotification;
  return <>{contextHolder}</>;
};

export default App;
