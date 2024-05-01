// 카메라를 연결하는 페이지

import useStream from "../hooks/useStream";

export default function Stream() {
    const [videoRef, startStream, stopStream] = useStream();

    // 비디오 스트림을 원격 서버로 전송할 로직 추가 (이 부분은 실제 WebRTC 구현에 따라 다름)

    return (
        <div>
            <button onClick={startStream}>전송 시작</button>
            <button onClick={stopStream}>전송 중단</button>
            <video ref={videoRef} autoPlay playsInline className="w-full h-auto" />
        </div>
    );
}
