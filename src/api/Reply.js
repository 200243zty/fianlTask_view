import axios from "../plugins/axios";

export function addReply(Reply) {
    return axios({
        url: "reply/addReply",
        method: "POST",
        data:{
            ...Reply
        }
    });
}

export function getMyReply(userId) {
    return axios({
        url: `reply/getMyReply/${userId}`,
        method: "GET"
    })
}
