const user = {
  state: {
    collectList: [],
    control: "#icon-xunhuanbofang",
    flag: 0,
    recentSongList: [],
  },
  getters: {
    recentSongList: (state) => {
      state.recentSongList = JSON.parse(
        window.localStorage.getItem("recentSongList")
      );
      return state.recentSongList;
    },
    collectList: (state) => {
      state.collectList = JSON.parse(
        window.localStorage.getItem("collectList")
      );
      return state.collectList;
    },
    control: (state) => {
      state.control = JSON.parse(window.localStorage.getItem("control"));
      return state.control;
    },
    flag: (state) => {
      state.flag = JSON.parse(window.localStorage.getItem("flag"));
      return state.flag;
    },
  },
  mutations: {
    setRecentSongList: (state, recentSongList) => {
      state.recentSongList = recentSongList;
      window.localStorage.setItem(
        "recentSongList",
        JSON.stringify(recentSongList)
      );
    },
    setCollectList: (state, collectList) => {
      state.collectList = collectList;
      window.localStorage.setItem("collectList", JSON.stringify(collectList));
    },
    setControl: (state, control) => {
      state.control = control;
      window.localStorage.setItem("control", JSON.stringify(control));
    },
    setFlag: (state, flag) => {
      state.flag = flag;
      window.localStorage.setItem("flag", JSON.stringify(flag));
    },
  },
};

export default user;
