import config from "../config";

const useGetSameApiOfGet = () => {
  const getFriendRequestListByUserId = (userId: string) => {
    return fetch(
      config.apiDomain +
        `/api/friends/getFriendRequestListByUserId?userId=${userId}`
    ).then((res) => {
      try {
        return res.json();
      } catch (e) {
        return {};
      }
    });
  };
  const getConvoIdByCurUserIdAndByFriendId = (
    curUserId: string,
    friendId: string
  ) => {
    return fetch(
      config.apiDomain +
        `/api/convo/getConvoByCurUserIdAndByFriendId?curUserId=${curUserId}&friendId=${friendId}`
    ).then((res) => {
      return res.json();
    });
  };
  return { getFriendRequestListByUserId, getConvoIdByCurUserIdAndByFriendId };
};
export { useGetSameApiOfGet };
