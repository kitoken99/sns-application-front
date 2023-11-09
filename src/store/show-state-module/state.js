export default function () {
  return {
    isAuthorized: false,
    isFetched: false,

    //真ん中のコンテンツ
    isShowMiddleContent: true,
    isShowSetting: false,
    isShowAddProfile: false,

    //ツールバー下コンテンツ
    isShowRoom: true,
    isShowAddFriend: false,
    isShowAddGroup: false,
    isShowProfileSetting: false,

    //ユーザーファインディング
    findUserPanelState: "form",
  };
}
