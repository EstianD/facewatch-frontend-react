import axios from "axios";

export default async function signin(signinUser) {
  const Url = "/api/users/login";

  const res = await axios.post(Url, signinUser);
  console.log(res);
  return res.data;
}
