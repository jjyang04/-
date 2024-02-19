import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
function Header(props) {
  const navigate = useNavigate();
  const arr = JSON.parse(sessionStorage.getItem("path_arr")) ?? [];
  const routes_arr = JSON.parse(sessionStorage.getItem("routes"));
  // console.log(arr, routes_arr);
  // console.log(sessionStorage.getItem("routes"));
  return (
    <div className="flex h-[30px] my-[5px]">
      {arr.map((item, index) => {
        return routes_arr.map((item1) => {
          if (item === item1.path)
            return (
              <div
                key={item1.component}
                style={{
                  backgroundColor:
                    item1.path === sessionStorage.getItem("now_path")
                      ? "#6ebdff"
                      : "",
                  borderColor:
                    item1.path === sessionStorage.getItem("now_path")
                      ? "#6ebdff"
                      : "",
                  color:
                    item1.path === sessionStorage.getItem("now_path")
                      ? "#fff"
                      : "",
                }}
                className=" mx-[5px] flex items-center px-[5px] py-[3px] border-[1px] border-gray-400 rounded-md  "
              >
                <span
                  className=" cursor-pointer"
                  onClick={() => {
                    navigate(item);
                    // props.render();
                    sessionStorage.setItem("now_path", item);
                  }}
                >
                  {item1.meta.title}
                </span>
                <Icon
                  icon="iwwa:delete"
                  className=" rounded-full cursor-pointer text-[8px] ml-[5px]"
                  style={{
                    display: index === 0 ? "none" : "",
                  }}
                  onClick={() => {
                    // console.log(index, arr.length);
                    if (
                      index === arr.length - 1 &&
                      item === sessionStorage.getItem("now_path")
                    ) {
                      console.log(111);
                      arr.length -= 1;
                      sessionStorage.setItem("path_arr", JSON.stringify(arr));
                      sessionStorage.setItem("now_path", arr[arr.length - 1]);
                      console.log(arr[arr.length - 1]);
                      navigate(arr[arr.length - 1]);
                    } else if (item === sessionStorage.getItem("now_path")) {
                      arr.splice(index, 1);
                      sessionStorage.setItem("path_arr", JSON.stringify(arr));

                      sessionStorage.setItem("now_path", arr[index]);
                      console.log(1111);
                      navigate(arr[index]);
                    } else {
                      arr.splice(index, 1);
                      sessionStorage.setItem("path_arr", JSON.stringify(arr));
                      props.render();
                    }
                  }}
                />
              </div>
            );
          else return "";
        });
      })}
    </div>
  );
}
export default Header;
