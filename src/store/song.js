const song = {
  state: {
    listOfSongs: [],
    isPlay: false,
    url: "",
    id: "",
    playButtonUrl: "#icon-bofang",
    duration: 0,
    curTime: 0,
    changeTime: 0,
    title: 0,
    artist: "",
    picUrl: "",
    autoNext: true,
    lyric: [],
    tempList: {},
    listIndex: "",
    volume: 50,
    introduction: "",
  },
  getters: {
    introduction: (state) => {
      state.introduction = JSON.parse(
        window.localStorage.getItem("introduction")
      );
      return state.introduction;
    },
    listOfSongs: (state) => {
      state.listOfSongs = JSON.parse(
        window.localStorage.getItem("listOfSongs")
      );
      return state.listOfSongs;
    },
    isPlay: (state) => {
      state.isPlay = JSON.parse(window.localStorage.getItem("isPlay"));
      return state.isPlay;
    },
    url: (state) => {
      state.url = JSON.parse(window.localStorage.getItem("url"));
      return state.url;
    },
    id: (state) => {
      state.id = JSON.parse(window.localStorage.getItem("id"));
      return state.id;
    },
    playButtonUrl: (state) => {
      state.playButtonUrl = JSON.parse(
        window.localStorage.getItem("playButtonUrl")
      );
      return state.playButtonUrl;
    },
    duration: (state) => {
      state.duration = JSON.parse(window.localStorage.getItem("duration"));
      return state.duration;
    },
    curTime: (state) => {
      state.curTime = JSON.parse(window.localStorage.getItem("curTime"));
      return state.curTime;
    },
    changeTime: (state) => {
      state.changeTime = JSON.parse(
        window.localStorage.getItem("changeTime")
      );
      return state.changeTime;
    },
    title: (state) => {
      state.title = JSON.parse(window.localStorage.getItem("title"));
      return state.title;
    },
    artist: (state) => {
      state.artist = JSON.parse(window.localStorage.getItem("artist"));
      return state.artist;
    },
    picUrl: (state) => {
      state.picUrl = JSON.parse(window.localStorage.getItem("picUrl"));
      return state.picUrl;
    },
    autoNext: (state) => {
      state.autoNext = JSON.parse(window.localStorage.getItem("autoNext"));
      return state.autoNext;
    },
    lyric: (state) => {
      state.lyric = JSON.parse(window.localStorage.getItem("lyric"));
      return state.lyric;
    },
    tempList: (state) => {
      state.tempList = JSON.parse(window.localStorage.getItem("tempList"));
      return state.tempList;
    },
    listIndex: (state) => {
      state.listIndex = JSON.parse(window.localStorage.getItem("listIndex"));
      return state.listIndex;
    },
    volume: (state) => {
      state.volume = JSON.parse(window.localStorage.getItem("volume"));
      return state.volume;
    },
  },
  mutations: {
    setIntroduction: (state, introduction) => {
      state.introduction = introduction;
      window.localStorage.setItem(
        "introduction",
        JSON.stringify(introduction)
      );
    },
    setListOfSongs: (state, listOfSongs) => {
      state.listOfSongs = listOfSongs;
      window.localStorage.setItem("listOfSongs", JSON.stringify(listOfSongs));
    },
    setIsPlay: (state, isPlay) => {
      state.isPlay = isPlay;
      window.localStorage.setItem("isPlay", JSON.stringify(isPlay));
    },
    setUrl: (state, url) => {
      state.url = url;
      window.localStorage.setItem("url", JSON.stringify(url));
    },
    setId: (state, id) => {
      state.id = id;
      window.localStorage.setItem("id", JSON.stringify(id));
    },
    setPlayButtonUrl: (state, playButtonUrl) => {
      state.playButtonUrl = playButtonUrl;
      window.localStorage.setItem(
        "playButtonUrl",
        JSON.stringify(playButtonUrl)
      );
    },
    setDuration: (state, duration) => {
      state.duration = duration;
      window.localStorage.setItem("duration", JSON.stringify(duration));
    },
    setCurTime: (state, curTime) => {
      state.curTime = curTime;
      window.localStorage.setItem("curTime", JSON.stringify(curTime));
    },
    setChangeTime: (state, changeTime) => {
      state.changeTime = changeTime;
      window.localStorage.setItem("changeTime", JSON.stringify(changeTime));
    },
    setTitle: (state, title) => {
      state.title = title;
      window.localStorage.setItem("title", JSON.stringify(title));
    },
    setArtist: (state, artist) => {
      state.artist = artist;
      window.localStorage.setItem("artist", JSON.stringify(artist));
    },
    setPicUrl: (state, picUrl) => {
      state.picUrl = picUrl;
      window.localStorage.setItem("picUrl", JSON.stringify(picUrl));
    },
    setAutoNext: (state, autoNext) => {
      state.autoNext = autoNext;
      window.localStorage.setItem("autoNext", JSON.stringify(autoNext));
    },
    setLyric: (state, lyric) => {
      state.lyric = lyric;
      window.localStorage.setItem("lyric", JSON.stringify(lyric));
    },
    setTempList: (state, tempList) => {
      state.tempList = tempList;
      window.localStorage.setItem("tempList", JSON.stringify(tempList));
    },
    setListIndex: (state, listIndex) => {
      state.listIndex = listIndex;
      window.localStorage.setItem("listIndex", JSON.stringify(listIndex));
    },
    setVolume: (state, volume) => {
      state.volume = volume;
      window.localStorage.setItem("volume", JSON.stringify(volume));
    },
  },
};

export default song;
