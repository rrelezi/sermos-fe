import Pusher from "pusher-js";
import ApiService from "./ApiService";

const env = process.env;
export const sendMessage = (payload: any) => {
        return new Promise((resolve, reject) => {
                ApiService.post(`message`, payload)
                    .then((response) => resolve(response))
                    .catch((error) => reject(error));
        });
};

export const markAllSeen = (friendId: string) =>
    new Promise((resolve, reject) => {
        ApiService.get(`message/seen?friendId=${friendId}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
});

export const pusher = new Pusher( env.REACT_APP_PUSHER_APP_KEY as any ,{
        id: env.REACT_APP_PUSHER_APP_ID,
        secret: env.REACT_APP_PUSHER_APP_SECRET,
        port: env.REACT_APP_PUSHER_PORT,
        host: env.REACT_APP_PUSHER_HOST,
        scheme: env.REACT_APP_PUSHER_SCHEME,
        cluster: env.REACT_APP_PUSHER_APP_CLUSTER
    } as any );

export default {
        sendMessage,
        markAllSeen
}
