// 카메라를 연결하는 페이지

import { useStream } from "../hooks";

export default function Stream() {
    const [videoRef, startStream, stopStream] = useStream();

    return (
        <div>
            <button onClick={startStream}>전송 시작</button>
            <button onClick={stopStream}>전송 중단</button>
            <video ref={videoRef} autoPlay playsInline className="w-full h-auto" />
        </div>
    );
}
