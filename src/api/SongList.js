import axios from "../plugins/axios";

export function addSongList(SongList) {
  return axios({
    url: "songList/add",
    method: "POST",
    data: {
      ...SongList,
    },
  });
}

/**
 * 获取所有歌单
 * @returns {AxiosPromise}
 */
export function getAllSongList() {
  return axios({
    url: "songList/all",
    method: "GET",
  });
}

//TODO ->songList.vue
export function getAllSongListByPage(currentPage) {
  return axios({
    url: `songList/all/${currentPage}`,
    method: "GET",
  });
}

export function getSongListByName(name) {
  return axios({
    url: `songList/songListOfName/${name}`,
    method: "GET",
  });
}

export function updateSongList(SongList) {
  return axios({
    url: "songList/update",
    method: "PUT",
    data: {
      ...SongList,
    },
  });
}

export function deleteSongList(id) {
  return axios({
    url: `songList/delete/${id}`,
    method: "DELETE",
  });
}

export function deleteAllSongList(ids) {
  return axios({
    url: `songList/deleteAll/${ids}`,
    method: "DELETE",
  });
}

//TODO songList.vue
export function getSongListCount() {
  return axios({
    url: "songList/getCount",
    method: "GET",
  });
}

export function getSongListByStyle(style) {
  return axios({
    url: `songList/getSongListByStyle/${style}`,
    method: "GET",
  });
}

// TODO songList.vue
export function getSongListByStyleAndPage(style, currentPage) {
  return axios({
    url: `songList/getSongListByStyle/${style}/${currentPage}`,
    method: "GET",
  });
}

// TODO songList.vue
export function getAllStyle() {
  return axios({
    url: "songListStyle/all",
    method: "GET",
  });
}

//TODO sognList.vue
export function getAllSongListCountByStyle(style) {
  return axios({
    url: `songList/songListCountByStyle/${style}`,
    method: "GET",
  });
}

/**
 * 查询我创建的歌单
 * @param createrId
 * @returns {*}
 */
export function getSongListByCreaterId(createrId) {
  return axios({
    url: `songList/getSongListByCreater/${createrId}`,
    method: "GET"
  })
}
