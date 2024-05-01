import { RefObject, useEffect, useRef, useState } from "react";

export default function useStream(): [RefObject<HTMLVideoElement>, () => Promise<void>, () => Promise<void>] {
    const ref = useRef<HTMLVideoElement>(null);
    const [streamConnection, setStreamConnection] = useState<RTCPeerConnection | null>(null);
    useEffect(() => {
        const webRTC = new RTCPeerConnection();
        setStreamConnection(webRTC);
        async function getMedia() {
            try {
                const media = await navigator.mediaDevices.getUserMedia({ video: true });
                media.getTracks().forEach((track) => webRTC.addTrack(track, media));
                if (ref.current) {
                    ref.current.srcObject = media;
                }
            } catch (error) {
                console.error(error);
            }
        }
        getMedia();
        return () => {
            if (webRTC) {
                webRTC.close();
            }
        };
    }, []);
    async function start() {
        if (streamConnection) {
            const offer = await streamConnection.createOffer();
            await streamConnection.setLocalDescription(offer);

            const response = await fetch(`http://${import.meta.env.VITE_SERVER_URL}/offer/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ offer_sdp: offer.sdp }),
            });
            const result = await response.json();

            await streamConnection.setRemoteDescription(new RTCSessionDescription(result));
        }
    }
    async function stop() {
        if (!streamConnection) return;
        streamConnection.close();
        console.log("Connection closed");
    }

    return [ref, start, stop];
}
