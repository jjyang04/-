import { get_business_list } from "@/service";

function User() {
  get_business_list()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  return <div>订单列表</div>;
}
export default User;
