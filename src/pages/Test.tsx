import { useEffect, useRef, useState } from "react";
import { useStream } from "../hooks/useStream";

export default function Test() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
    useStream();
    useEffect(() => {
        const pc = new RTCPeerConnection();
        setPeerConnection(pc);
        async function getMedia() {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                mediaStream.getTracks().forEach((track) => pc.addTrack(track, mediaStream));
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (error) {
                console.error(error);
            }
        }
        // console.log("Connected");
        getMedia();
        return () => {
            pc.close();
        };
    }, []);

    async function handleCreateOffer() {
        if (peerConnection) {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            const response = await fetch("http://localhost:8000/offer/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ offer_sdp: offer.sdp }),
            });
            const data = await response.json();
            console.log(data);
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data));
            setTimeout(() => {
                if (peerConnection) {
                    peerConnection.close();
                    console.log("Connection closed");
                }
            }, 5000);
        }
    }

    return (
        <div>
            <h1>WebRTC Test</h1>
            <button onClick={handleCreateOffer}>Connect</button>
            <video ref={videoRef} autoPlay playsInline className="w-full h-auto" />
        </div>
    );
}
