// TrackResult.ts
export interface TrackResult {
    frame_number: number;
    frame_size: {
        x: number;
        y: number;
    };
    data: {
        track_id: number;
        bbox: [number, number, number, number];
        confidence: number;
    }[];
}

export default TrackResult; // TrackResult를 기본 내보내기로 추가
