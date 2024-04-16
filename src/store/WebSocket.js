const WebSocket={
    state: {
        websocket:null
    },
    mutations: {
        setWebsocket: (state, websocket) => {
            state.websocket = websocket;
        }
    }
}

export default WebSocket;
