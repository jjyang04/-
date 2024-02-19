import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import axios from "axios";

// 返回值是hook函数
const user_store = create(
  persist(
    immer(function (set_state, get) {
      return {
        user: {
          name: "lele",
          age: 18,
          sex: "man",
        },
        img_token: "",
        dept_arr: [],
        first_name: "abv",
        parts_arr: [],
        crumbs_arr: [],
        surveys_id: 10007,
        set_surveys_id(new_id) {
          set_state((state) => {
            state.surveys_id = new_id;
          });
        },
        set_crumbs_arr(new_arr) {
          set_state((state) => {
            console.log(new_arr);
            state.crumbs_arr = new_arr;
          });
        },
        set_parts_arr(new_arr) {
          set_state((state) => {
            state.parts_arr = new_arr;
          });
        },
        set_user_age() {
          // console.log(set_state);
          set_state((state) => {
            //   console.log(state);
            state.user.age++;
          });
        },
        set_user_name(new_name) {
          // console.log(set_state);
          set_state((state) => {
            //   console.log(state);
            state.user.name = get().first_name + new_name;
          });
        },
        // set_img_token(token) {
        //   set_state((state) => {
        //     console.log(state);
        //     state.img_token = token;
        //   });
        // },
        set_dept_arr(new_arr) {
          set_state((state) => {
            console.log(state);
            state.dept_arr = new_arr;
          });
        },
        set_img_token() {
          axios.get("http://192.168.68.174:8081/upload/token").then((res) => {
            set_state((state) => {
              state.img_token = res.data.result;
            });
          });
        },
        async post_img_dick(form) {
          // return post_img_hook()
          const { err, data } = await get().post_img_hook(form);
          console.log(err, data);
          return get().img_token.baseURL + data.key;
        },
        post_img_hook(form) {
          return axios.post("https://upload-z2.qiniup.com", form);
        },
      };
    }),
    { name: "use_user_store" }
  )
);
export default user_store;
