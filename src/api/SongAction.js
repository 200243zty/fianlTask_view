import axios from "../plugins/axios";
export function doPlay(ConsumerSongVo) {
    return axios({
        url: "songAction/doplay",
        method: "POST",
        data:{
            ...ConsumerSongVo
        }
    });
}

export function doCollect(ConsumerSongVo) {
    return axios({
        url: "songAction/doCollect",
        method: "POST",
        data:{
            ...ConsumerSongVo
        }
    });
}

export function doComment(ConsumerSongVo) {
    return axios({
        url: "songAction/doComment",
        method: "POST",
        data:{
            ...ConsumerSongVo
        }
    });
}
