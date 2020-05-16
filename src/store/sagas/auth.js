import { set, get, remove } from "../../Utils";

function* logout(action) {
  remove("token");
  remove("expirationTime");
  remove("userId");
}
