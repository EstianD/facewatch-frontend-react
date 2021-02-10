import axios from "axios";
const { REACT_APP_NODE_URL } = process.env;

export default async function signin(signinUser) {
  const Url = `${REACT_APP_NODE_URL}/users/login`;

  const res = await axios.post(Url, signinUser);

  return res.data;
}
