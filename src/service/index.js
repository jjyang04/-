import request from "../ulits/https";
import "@/index.css";

export const get_fund_mnRank = (params) => {
  console.log(params);
  return request.get("/api/fundMNRank", { params });
};
