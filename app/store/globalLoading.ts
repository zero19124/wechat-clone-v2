import { useEffect } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
type TLoadingStore = { loading: boolean; text?: string };
export const loadingStore = atom<TLoadingStore>({
  key: "loadingState",
  default: {
    loading: false,
    text: "Loading...",
  },
});

export const useLoadingStore = () => {
  const [loadingState, setLoadingStore] = useRecoilState(loadingStore);
  useEffect(() => {
    console.log(loadingState, "loadingState");
  }, [loadingState]);
  // useEffect(() => {
  //   // reset the default text
  //   console.log('reset-useLoadingStore');
  //   loadingState.text = "Loading";
  // }, [loadingState]);
  return {
    globalLoading: loadingState,
    setLoadingStore,
  };
};
