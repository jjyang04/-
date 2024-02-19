import { get_cards_lsit } from "@/service";
import user_store from "@/store";
function User() {
  get_cards_lsit()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  const userStore = user_store();
  console.log(userStore);
  return (
    <div>
      就诊卡管理
      <div
        onClick={() => {
          userStore.set_user_name("小张");
        }}
      >
        名称:{userStore.user.name}
      </div>
      <div>年龄:{userStore.user.age}</div>
      <button
        onClick={() => {
          userStore.set_user_age();
        }}
      >
        年龄增加
      </button>
    </div>
  );
}
export default User;
