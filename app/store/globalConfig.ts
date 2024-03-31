import { useEffect } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
type TConfigState = { apiDomain?: string };
export const ConfigState = atom<TConfigState>({
  key: "configState",
  default: {
    apiDomain: "https://wechat-server-jhc0.onrender.com",
  },
});

export const useConfigState = () => {
  const [config, setConfig] = useRecoilState(ConfigState);
  useEffect(() => {
    console.log(config, "config");
  }, [config]);

  return {
    config,
    setConfig,
  };
};
