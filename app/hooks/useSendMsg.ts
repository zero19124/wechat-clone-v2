import { useUser } from "app/store/user";
import config from "../config";
import Toast from "@/component/base/Toast";

const useSendMsg = () => {
  const sendMsgHandler = ({
    val,
    type,
    userId,
    convoId,
    doneHandler,
  }: {
    val: string;
    userId: string;
    doneHandler?: (data: any) => void;
    convoId: string;
    type: string;
  }) => {
    if (!val) {
      console.log("input is empty");
      return;
    }
    console.log("change", val, userId, convoId);
    fetch(config.apiDomain + "/api/msg/add-msg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // msg: "https://placekitten.com/302/302",
        msg: val,
        type: type,
        userId,
        convoId,
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (res.code === 200) {
          console.log("add-suc");
        } else {
          Toast.fail("sendMsg failed");
        }
        doneHandler?.(res);
      });
  };
  return { sendMsgHandler };
};
export default useSendMsg;
