import Ably from "ably/promises";
import { useEffect } from 'react';

function setAndGetClient(clientId) {
    const ably = new Ably.Realtime.Promise({ authUrl: '/api/auth', clientId: clientId, closeOnUnload: true });
    return ably;
}

function useChannel(ably, channelName, callbackOnMessage) {
    const channel = ably.channels.get(channelName);

    const onMount = () => {
        channel.subscribe(msg => { callbackOnMessage(msg); });
    }

    const onUnmount = () => {
        channel.unsubscribe();
    }

    const useEffectHook = () => {
        onMount();
        return () => { onUnmount(); };
    };

    useEffect(useEffectHook);

    return channel;
}

export { useChannel, setAndGetClient }