import React from "react";
import {} from "antd-mobile";
import { Icon } from "@iconify/react";

class TypeB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible6: false,
    };
  }

  render() {
    return (
      <>
        <div className="h-[65vh] pt-[3vw]">
          {/* 头部 */}
          <div className="flex px-[3vw] justify-between">
            <span></span>
            <span className="text-[4vw]">基金类型</span>
            <Icon className="text-[8vw]" icon="material-symbols-light:close" />
          </div>
        </div>
      </>
    );
  }
}
export default TypeB;
