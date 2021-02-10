import axios from "axios";
const { REACT_APP_NODE_URL } = process.env;

export default async function signup(SignupUser) {
  const Url = `${REACT_APP_NODE_URL}/users/register`;

  const res = await axios.post(`${Url}`, SignupUser);

  return res.data;
}
