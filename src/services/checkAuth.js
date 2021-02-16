import jwtDecode from "jwt-decode";

export default function isAuthenticated() {
  const jwt = localStorage.getItem("jwt-auth");
  if (jwt) {
    //   SET isAuthenticated = true
    const decodedJWT = jwtDecode(jwt);
    const user = {
      id: decodedJWT.id,
      username: decodedJWT.username,
    };

    return user;
  }
  return null;
}
