import { Button, Form, Input, Checkbox } from "antd";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { UserOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import {
  post_login,
  get_userinfo,
  get_router,
  get_captcha_image,
} from "@/service";
function Login() {
  const navigate = useNavigate();
  const [check_flag, set_check_flag] = useState(
    localStorage.getItem("pwd_val") !== "undefined" &&
      localStorage.getItem("pwd_val") != null
  );
  const [psd_value, set_psd_value] = useState(
    check_flag ? localStorage.getItem("pwd_val") : ""
  );
  useEffect(() => {
    // if (localStorage.getItem("doc_tocken")) {
    //   navigate("/index");
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   console.log(localStorage.getItem("pwd_val"));
  // console.log(psd_value);
  // useEffect(() => {
  //   // console.log(psd_inp.current);
  //   // psd_inp.current.value = psd_value;
  //   if (check_flag) {
  //     // console.log(psd_value);
  //   }
  //   // set_psd_value(localStorage.getItem("pwd_val"));
  //   // psd_inp.current.input.value = psd_value;
  //   console.log(psd_value);
  //   psd_inp.current.value = psd_value;

  //   console.log(psd_inp.current);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const psd_inp = useRef();
  //   psd_value = localStorage.getItem("doc_tocken");
  const onFinish = (values) => {
    console.log("Success:", values);
    post_login({
      ...values,
      password: psd_value,
    })
      .then((res) => {
        // console.log(res);
        localStorage.setItem("doc_tocken", res.data.data);
        get_userinfo()
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        get_router()
          .then((res) => {
            console.log(res);
            localStorage.setItem("Router", JSON.stringify(res.data.data));
            navigate("/index");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };
  get_captcha_image()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const check__change = () => {
    if (check_flag) {
      localStorage.setItem("pwd_val", undefined);
    } else {
      localStorage.setItem("pwd_val", psd_value);
    }
    set_check_flag(!check_flag);
  };
  return (
    <div className=" bg-gray-200 h-[100vh] relative ">
      <div className=" absolute bg-white  rounded-md left-[50%] p-[20px] top-[50%] translate-x-[-50%] w-[350px] h-[350px] translate-y-[-50%]">
        <h2 className="text-center text-gray-400 mb-[20px]">
          {" "}
          西藏阜康肿瘤医院 管理系统
        </h2>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label=""
            name="username"
            rules={[
              {
                required: true,
                message: "请输入你的用户名",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="用户名"
              prefix={
                <Icon icon="icon-park-solid:people" className="text-gray-400" />
              }
            />
          </Form.Item>
          <Form.Item
            label=""
            // name="password"
            // initialvalues={psd_value}
            rules={[
              {
                required: true,
                message: "请输入你的密码",
              },
            ]}
          >
            <Input.Password
              ref={psd_inp}
              defaultValue={psd_value}
              value={psd_value}
              onChange={(e) => {
                console.log(e.target.value);
                set_psd_value(e.target.value);

                // console.log(e.target.value);
              }}
              prefix={
                <Icon icon="solar:lock-outline" className="text-gray-400" />
              }
            />
          </Form.Item>
          <div>
            <Checkbox checked={check_flag} onChange={() => check__change()}>
              记住密码
            </Checkbox>
          </div>
          <div className="flex justify-center">
            <Button type="primary" danger htmlType="submit">
              登录
            </Button>
          </div>
        </Form>
        <img src="" alt="" />
      </div>
    </div>
  );
}

export default Login;
