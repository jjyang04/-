import React from "react";
// import Fun from "./views/fun";
import Search from "./views/search";
// import Add from "./views/fn";
// import asd  from '@'
// import Foo from "./views/foo";
// import Layout from "./views/layout";
class App extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  render() {
    return (
      <>
        {/* <div>12321</div> */}
        {/* <Add /> */}
        {/* {Foo()} */}
        {/* <Foo /> */}
        {/* {Add()} */}
        {/* <div>layout</div> */}
        {/* <Layout /> */}
        {/* <Fun /> */}
        <Search />
      </>
    );
  }
}
// 调用函数,理解形参实参
export default App;
