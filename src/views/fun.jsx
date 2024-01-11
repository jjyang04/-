import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { get_fund_mnRank } from "../service";
// css文件以module.css结尾,用一个变量接收
// import styles from "./fund.module.css";
import { CapsuleTabs, Popup } from "antd-mobile";
import { Icon } from "@iconify/react";
import TypeB from "./bottom_prpup";
//通过styled定义样式组件
// const WrapperUl = styled.ul`
//   background-color: green;
//   li {
//     color: #fff;
//   }
// `;

const WrapperUl = styled.ul`
  /* background-color: green; */
  li {
    /* color: #fff; */
  }
`;
const arr = {
  近1周: "SYL_Z",
  近1月: "SYL_Y",
  近3月: "SYL_3Y",
  近6月: "SYL_6Y",
  今年来: "SYL_JN",
  近1年: "SYL_1N",
  近2年: "SYL_2N",
  近3年: "SYL_3N",
  近5年: "SYL_5N",
  成立以来: "SYL_LN",
};
const sort_arr = Object.keys(arr).reduce((acc, key) => {
  acc[arr[key]] = key;
  return acc;
}, {});
function Fun() {
  const [fun_list, set_fun_list] = useState([]);
  const [income_date, set_income_date] = useState("SYL_1N");
  const [visible6, set_visible6] = useState(false);
  const get_item = () => {
    get_fund_mnRank({ SortColumn: income_date })
      .then((res) => {
        set_fun_list(res.data.Datas);
        console.log("重新更新好了数据");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    get_item();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [income_date]);
  // componentDidUpdate(__, next) {
  //   if (this.state.income_date !== next.income_date) this.get_item();
  //   console.log(this.state.visible6);
  // }
  return (
    <div>
      {/* <p className=" bg-red-500">基金排行</p> */}
      <div className="bg-blue-500 pt-[10vw]">
        <div className="flex  items-center text-white justify-between text-[5vw] px-[5vw]">
          <Icon icon="teenyicons:left-outline" />
          <span>基金排行</span>
          <div>
            <Icon icon="iconamoon:search-thin" />
          </div>
        </div>
        <div className="text-white py-[6vw] flex justify-between px-[5vw]">
          <div className="flex items-center">
            <span className="text-[4.5vw]" onClick={() => set_visible6(true)}>
              基金类型
            </span>
            <Popup
              visible={visible6}
              bodyStyle={{
                borderTopLeftRadius: "2vw",
                borderTopRightRadius: "2vw",
              }}
              onMaskClick={() => set_visible6(false)}
            >
              <TypeB />
            </Popup>
            <Icon icon="ep:caret-bottom" />
          </div>
          <div className="flex items-center bg-blue-600 px-[1vw] rounded-md">
            <Icon icon="iconoir:page" />

            <span>使用指南</span>
          </div>
        </div>
      </div>
      <div className=" pt-[5vw] bg-white rounded-t-xl mt-[-3vw]">
        <div className="px-[3vw] text-[3.5vw]  flex  justify-between mb-[5vw]">
          <div className="px-[3.5vw] py-[2vw] rounded-md bg-gray-100">
            机构投资者偏爱
          </div>
          <div className="px-[3.5vw] py-[2vw] rounded-md bg-gray-100">
            年年正收益
          </div>
          <div className="px-[3.5vw] py-[2vw] rounded-md bg-gray-100">
            能涨抗跌
          </div>
          <div className="flex items-center">
            <Icon icon="iconoir:filter" />
            <span className="ml-[1vw]">筛选</span>
          </div>
        </div>
        <WrapperUl>
          <li className="flex px-[3vw]">
            <span className="flex w-[30%]">基金名称</span>
            <div className="flex w-[25%] flex-col items-center">
              <span>涨跌幅</span>
              <span>{sort_arr[income_date]}</span>
            </div>
            <div className="flex w-[20%] flex-col items-center">
              <span>夏普比率</span>
              <span>{sort_arr[income_date]}</span>
            </div>
            <span className="flex w-[25%] flex-col  items-center">
              <span>最大回撤</span>
              <span>{sort_arr[income_date]}</span>
            </span>
          </li>
          {fun_list.map((item) => (
            <li className="flex text-[4vw] py-[4vw] px-[3vw]" key={item.FCODE}>
              <div className="w-[30%] pr-[3vw]">
                <span>{item.SHORTNAME}</span>
                <div className="mt-[1vw] flex items-center">
                  <span>{item.FCODE}</span>
                  <Icon className="ml-[1vw]" icon="basil:add-outline" />
                </div>
              </div>
              <div className="w-[25%] flex justify-center items-center text-red-600">
                <span>+{item[income_date]}</span>
              </div>
              <div className="w-[20%] flex justify-center"></div>
              <div className="w-[25%] flex justify-center"></div>
            </li>
          ))}
        </WrapperUl>
      </div>
      {/* {arr[income_date]} */}
      <div className=" fixed bottom-0 left-0 w-[100%] bg-white">
        <CapsuleTabs
          defaultActiveKey={sort_arr[income_date]}
          className=" fixed bottom-0 left-0"
          onChange={(e) => set_income_date(arr[e])}
        >
          {Object.entries(arr).map(([title, value]) => (
            <CapsuleTabs.Tab title={title} key={title}>
              {/* {value} */}
            </CapsuleTabs.Tab>
          ))}
        </CapsuleTabs>
      </div>
    </div>
  );
}

// console.log(sort_arr);
// class Fun extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fun_list: [],
//       //   index: 1,
//       income_date: "SYL_1N",
//       visible6: false,
//     };
//   }

//   get_item() {
//     get_fund_mnRank({ SortColumn: this.state.income_date })
//       .then((res) => {
//         this.setState({
//           fun_list: res.data.Datas,
//         });
//         console.log("重新更新好了数据");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   componentDidMount() {
//     this.get_item();
//   }
//   componentDidUpdate(__, next) {
//     if (this.state.income_date !== next.income_date) this.get_item();
//     console.log(this.state.visible6);
//   }

//   render() {
//     const { fun_list, income_date } = this.state;
//     console.log("已经渲染");
//     return (
//       <div>
//         {/* <p className=" bg-red-500">基金排行</p> */}
//         <div className="bg-blue-500 pt-[10vw]">
//           <div className="flex  items-center text-white justify-between text-[5vw] px-[5vw]">
//             <Icon icon="teenyicons:left-outline" />
//             <span>基金排行</span>
//             <div>
//               <Icon icon="iconamoon:search-thin" />
//             </div>
//           </div>
//           <div className="text-white py-[6vw] flex justify-between px-[5vw]">
//             <div className="flex items-center">
//               <span
//                 className="text-[4.5vw]"
//                 onClick={() => this.setState({ visible6: true })}
//               >
//                 基金类型
//               </span>
//               <Popup
//                 visible={this.state.visible6}
//                 bodyStyle={{
//                   borderTopLeftRadius: "2vw",
//                   borderTopRightRadius: "2vw",
//                 }}
//                 onMaskClick={() =>
//                   this.setState({
//                     visible6: false,
//                   })
//                 }
//               >
//                 <TypeB />
//               </Popup>
//               <Icon icon="ep:caret-bottom" />
//             </div>
//             <div className="flex items-center bg-blue-600 px-[1vw] rounded-md">
//               <Icon icon="iconoir:page" />

//               <span>使用指南</span>
//             </div>
//           </div>
//         </div>
//         <div className=" pt-[5vw] bg-white rounded-t-xl mt-[-3vw]">
//           <div className="px-[3vw] text-[3.5vw]  flex  justify-between mb-[5vw]">
//             <div className="px-[3.5vw] py-[2vw] rounded-md bg-gray-100">
//               机构投资者偏爱
//             </div>
//             <div className="px-[3.5vw] py-[2vw] rounded-md bg-gray-100">
//               年年正收益
//             </div>
//             <div className="px-[3.5vw] py-[2vw] rounded-md bg-gray-100">
//               能涨抗跌
//             </div>
//             <div className="flex items-center">
//               <Icon icon="iconoir:filter" />
//               <span className="ml-[1vw]">筛选</span>
//             </div>
//           </div>
//           <WrapperUl>
//             <li className="flex px-[3vw]">
//               <span className="flex w-[30%]">基金名称</span>
//               <div className="flex w-[25%] flex-col items-center">
//                 <span>涨跌幅</span>
//                 <span>{sort_arr[this.state.income_date]}</span>
//               </div>
//               <div className="flex w-[20%] flex-col items-center">
//                 <span>夏普比率</span>
//                 <span>{sort_arr[this.state.income_date]}</span>
//               </div>
//               <span className="flex w-[25%] flex-col  items-center">
//                 <span>最大回撤</span>
//                 <span>{sort_arr[this.state.income_date]}</span>
//               </span>
//             </li>
//             {fun_list.map((item) => (
//               <li
//                 className="flex text-[4vw] py-[4vw] px-[3vw]"
//                 key={item.FCODE}
//               >
//                 <div className="w-[30%] pr-[3vw]">
//                   <span>{item.SHORTNAME}</span>
//                   <div className="mt-[1vw] flex items-center">
//                     <span>{item.FCODE}</span>
//                     <Icon className="ml-[1vw]" icon="basil:add-outline" />
//                   </div>
//                 </div>
//                 <div className="w-[25%] flex justify-center items-center text-red-600">
//                   <span>+{item[this.state.income_date]}</span>
//                 </div>
//                 <div className="w-[20%] flex justify-center"></div>
//                 <div className="w-[25%] flex justify-center"></div>
//               </li>
//             ))}
//           </WrapperUl>
//         </div>
//         {/* {arr[income_date]} */}
//         <CapsuleTabs
//           defaultActiveKey={sort_arr[income_date]}
//           className=" fixed bottom-0 left-0"
//           onChange={(e) => this.setState({ income_date: arr[e] })}
//         >
//           {Object.entries(arr).map(([title, value]) => (
//             <CapsuleTabs.Tab title={title} key={title}>
//               {/* {value} */}
//             </CapsuleTabs.Tab>
//           ))}
//         </CapsuleTabs>
//       </div>
//     );
//   }
// }
export default Fun;
