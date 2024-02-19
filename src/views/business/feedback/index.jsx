import { get_feedback_list } from "@/service";

function User() {
  get_feedback_list().then((res) => {
    console.log(res);
  });
  return <div>意见反馈</div>;
}
export default User;
