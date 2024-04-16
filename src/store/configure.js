const configure = {
  state: {
    activeName: "",
    showAside: false,
    loginIn: false,
    userId: "",
    userName: "",
    avatar: "",
    searchSongListData: [],
    styleList:[],
  },
  getters: {
    styleList: (state)=>{
      let styleLsit = state.styleList;
      if (!styleLsit) {
        styleLsit = JSON.parse(window.localStorage.getItem("styleList"));
        console.log("storeGetters从缓存中拿到的styleList")
      }
      return styleLsit;
    },
    searchSongListData: (state) => {
      let searchSongListData = state.searchSongListData;
      if (!searchSongListData) {
        searchSongListData = JSON.parse(
          window.localStorage.getItem("searchSongListData")
        );
      }
      return searchSongListData;
    },
    avatar: (state) => {
      let avatar = state.avatar;
      if (!avatar) {
        avatar = JSON.parse(window.localStorage.getItem("avatar"));
      }
      return avatar;
    },
    userName: (state) => {
      let userName = state.userName;
      if (!userName) {
        userName = JSON.parse(window.localStorage.getItem("userName"));
      }
      return userName;
    },
    userId: (state) => {
      let userId = state.userId;
      if (!userId) {
        userId = JSON.parse(window.localStorage.getItem("userId"));
      }
      return userId;
    },
    loginIn: (state) => {
      let loginIn = state.loginIn;
      if (!loginIn) {
        loginIn = JSON.parse(window.localStorage.getItem("loginIn"));
      }
      return loginIn;
    },
    showAside: (state) => {
      let showAside = state.showAside;
      if (!showAside) {
        showAside = JSON.parse(window.localStorage.getItem("showAside"));
      }
      return showAside;
    },
    activeName: (state) => {
      let activeName = state.activeName;
      if (!activeName) {
        activeName = JSON.parse(window.localStorage.getItem("activeName"));
      }
      return activeName;
    },
  },
  mutations: {
    setStyleList(state, styleList) {
      state.styleList=styleList;
      window.localStorage.setItem(
          "styleList",
          JSON.stringify(styleList)
      );
    },
    setSearchSongListData: (state, searchSongListData) => {
      state.searchSongListData = searchSongListData;
      window.localStorage.setItem(
        "searchSongListData",
        JSON.stringify(searchSongListData)
      );
    },
    setAvatar: (state, avatar) => {
      state.avatar = avatar;
      window.localStorage.setItem("avatar", JSON.stringify(avatar));
    },
    setUserName: (state, userName) => {
      state.userName = userName;
      window.localStorage.setItem("userName", JSON.stringify(userName));
    },
    setUserId: (state, userId) => {
      state.userId = userId;
      window.localStorage.setItem("userId", JSON.stringify(userId));
    },
    setLoginIn: (state, loginIn) => {
      state.loginIn = loginIn;
      window.localStorage.setItem("loginIn", JSON.stringify(loginIn));
    },
    setShowAside: (state, showAside) => {
      state.showAside = showAside;
      window.localStorage.setItem("showAside", JSON.stringify(showAside));
    },
    setActiveName: (state, activeName) => {
      state.activeName = activeName;
      window.localStorage.setItem("activeName", JSON.stringify(activeName));
    },
  },
};

export default configure;
