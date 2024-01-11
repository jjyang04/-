import { useRef } from "react";
import { Icon } from "@iconify/react";
import { SearchBar } from "antd-mobile";
import styled from "styled-components";
// import { SearchBarRef } from "antd-mobile/es/components/search-bar";
// import { useRef } from "react";
// class Search extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div>
//         {/* 头部搜索框 */}
//         <Icon icon="teenyicons:left-outline" />
//       </div>
//     );
//   }
// }
// const  = styled(SearchBar)`
//   border: 1px solid #1677ff !important;
//   color: #999999 !important;
// `;
const SearchBar1 = styled(SearchBar)`
  background-color: white;
  overflow: hidden;
  border: 1px solid #3c8ef7;
  border-radius: 5px;
  width: 85vw;
  .adm-search-bar-input-box {
    border: unset;
    background-color: unset;
    input {
      caret-color: #3c8ef7;
      font-size: 3.5vw;
    }
  }
  .adm-search-bar-suffix {
    position: relative;
    button {
      span {
        font-size: 4vw;
        color: #3c8ef7;
      }
      &:hover {
        background-color: unset;
      }
    }
    .adm-button {
      &::before {
        background-color: unset;
      }
    }
    &::before {
      content: "";
      position: absolute;
      width: 1px;
      height: 20px;
      background-color: #3c8ef7;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0.2;
    }
  }
`;

function Search() {
  const is_search = useRef(false);

  // const searchRef = useRef(<SearchBarRef />);
  return (
    <div className="pt-[2vw] h-[100vh] w-[100vw] bg-gray-50 px-[3vw]">
      {/* 头部搜索框 */}
      <div className=" flex justify-between items-center text-[5vw] ">
        <Icon icon="teenyicons:left-outline" />
        <SearchBar1
          placeholder="请输入内容"
          cancelText="搜索"
          showCancelButton={() => true}
        />
      </div>
      <div className="flex justify-between text-[3.5vw] mt-[5vw]">
        <div className="bg-gray-100 px-[3vw]  justify-between items-center flex rounded-[3.5vw] h-[7vw]">
          长城收益宝货币A
        </div>
        <div className="bg-gray-100 px-[3vw]  justify-between items-center flex rounded-[3.5vw] h-[7vw]">
          重仓周大生的基金
        </div>
        <div className="bg-gray-100 px-[3vw]  justify-between items-center flex rounded-[3.5vw] h-[7vw]">
          凯石基金
        </div>
      </div>
      {/* 搜索历史 */}
      <div className="mt-[6vw]">
        <div className="flex justify-between mt-[5vw] ">
          <span className="text-[4vw]">搜索历史</span>
          <Icon icon="uiw:delete" className="text-[5vw] text-gray-500" />
        </div>
        <div className="flex flex-wrap mt-[4vw]">
          <div className="h-[7vw] mr-[5vw] bg-gray-100 px-[3vw] justify-between items-center flex">
            111111
          </div>
          <div className="h-[7vw] mr-[5vw] bg-gray-100 px-[3vw] justify-between items-center flex">
            22222
          </div>
        </div>
      </div>
      {/* 热搜基金 */}
      <div className="mt-[5vw]">
        <div className="flex items-center ">
          <span>热搜基金</span>
          <Icon icon="icon-park-solid:fire" className="text-red-500" />
        </div>
        <div className="mt-[3vw] bg-white ">
          {[111111111, 222222222, 333333333].map((item) => {
            return (
              <div
                className="h-[10vw] flex justify-between border-b-[0.2vw] items-center text-[4vw]  border-gray-300 pl-[3vw]"
                key={item}
              >
                <div className="w-[50%]">{item}</div>
                <div className="w-[50%]">{item}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Search;
