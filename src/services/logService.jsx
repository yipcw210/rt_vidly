import { toast } from "react-toastify";

function init() {}

function log(error) {
  toast.error(error);
}

export default {
  init,
  log
};
