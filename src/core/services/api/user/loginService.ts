import { User } from "@/context/user/user.types";
import axios from "axios";
import http from "../../httpService";
import type { AxiosRequestConfig } from "axios";

export async function fetchRandomUser(): Promise<User> {
  try {
    const res = await axios.get("https://randomuser.me/api/?results=1&nat=us");
    const data = res.data;
    return data.results[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMyProfile(options?: AxiosRequestConfig) {
  return http
    .get(`/api/profile/getMyProfile`, options)
    .then(({ data }) => data);
}
