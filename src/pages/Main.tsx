import React, { useState, useEffect } from "react";
import { TrackResult } from "../data/TrackResult"; // TrackResult 인터페이스 가져오기
import * as d3 from "d3"; // D3 라이브러리 가져오기
import "./main.css";

const Main: React.FC = () => {
    const [jsonData, setJsonData] = useState<TrackResult[]>([]);

    useEffect(() => {
        const fetchJsonData = async () => {
            try {
                const response = await fetch("../data/track_results.json");
                const data: TrackResult[] = await response.json();
                setJsonData(data);
            } catch (error) {
                console.error("Error fetching JSON data:", error);
            }
        };

        fetchJsonData();
    }, []);

    useEffect(() => {
        if (jsonData.length === 0) return;

        // 각 프레임별 추적된 객체의 수 계산
        const frameCounts = jsonData.map((frame) => {
            if ("frame_number" in frame && "data" in frame && Array.isArray(frame.data)) {
                return frame.data.length;
            } else {
                console.error("Invalid frame data:", frame);
                return 0; // 잘못된 데이터인 경우 객체 수를 0으로 설정
            }
        });

        // 30개씩 묶어 평균을 내어 새로운 프레임별 객체 수 배열 생성
        const newFrameCounts: number[] = [];
        for (let i = 0; i < frameCounts.length; i += 30) {
            const chunk = frameCounts.slice(i, i + 30);
            const average = chunk.reduce((sum, value) => sum + value, 0) / chunk.length;
            newFrameCounts.push(average);
        }

        // 막대 그래프 생성
        const svgWidth = 600;
        const svgHeight = 400;
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;

        const svg = d3.select("#chart1").append("svg").attr("width", svgWidth).attr("height", svgHeight).append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand().domain(d3.range(newFrameCounts.length).map(String)).range([0, width]).padding(0.1);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(newFrameCounts) || 0])
            .range([height, 0]);

        svg.selectAll("rect")
            .data(newFrameCounts)
            .enter()
            .append("rect")
            .attr("x", (d, i) => x(String(i)) || 0) // null인 경우 0으로 대체
            .attr("y", (d) => y(d) || 0) // 높이 값이 undefined인 경우 0으로 설정
            .attr("width", x.bandwidth())
            .attr("height", (d) => height - (y(d) || 0)) // 높이 값이 undefined인 경우 0으로 설정
            .attr("fill", "steelblue");

        // x 축 생성
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .append("text")
            .attr("x", width / 2)
            .attr("y", margin.bottom * 0.8)
            .attr("fill", "#000")
            .attr("text-anchor", "middle")
            .text("Frame");

        // y 축 생성
        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left * 0.7)
            .attr("x", -height / 2)
            .attr("fill", "#000")
            .attr("text-anchor", "middle")
            .text("Object Counts");
    }, [jsonData]);

    // 정확도 선 그래프
    useEffect(() => {
        if (jsonData.length === 0) return;

        // 각 프레임별 정확도 추출
        const accuracies: number[] = jsonData.map((frame) => {
            if ("data" in frame && Array.isArray(frame.data)) {
                // 현재 프레임의 객체들의 정확도 배열 생성
                const confidences = frame.data.map((d) => d.confidence);
                // 정확도 배열의 평균 계산
                return d3.mean(confidences) || 0;
            } else {
                console.error("Invalid frame data:", frame);
                return 0; // 잘못된 데이터인 경우 정확도를 0으로 설정
            }
        });

        // 30 단위로 평균 정확도 계산
        const averageAccuracies: number[] = [];
        for (let i = 0; i < accuracies.length; i += 30) {
            const chunk = accuracies.slice(i, i + 30);
            const average = chunk.reduce((sum, value) => sum + value, 0) / chunk.length;
            averageAccuracies.push(average);
        }

        // 선 그래프 생성
        const svgWidth = 600;
        const svgHeight = 400;
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;

        const svg = d3.select("#chart2").append("svg").attr("width", svgWidth).attr("height", svgHeight).append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand().domain(d3.range(averageAccuracies.length).map(String)).range([0, width]).padding(0.1);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(averageAccuracies) || 0])
            .range([height, 0]);

        const line = d3
            .line<number>()
            .x((d, i) => x(String(i))! + x.bandwidth() / 2)
            .y((d) => y(d) || 0);

        svg.append("path").datum(averageAccuracies).attr("fill", "none").attr("stroke", "steelblue").attr("stroke-width", 1.5).attr("d", line);

        // x 축 생성
        svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

        // y 축 생성
        svg.append("g").call(d3.axisLeft(y));
    }, [jsonData]);

    // 트랙 ID별 객체 수 원형 그래프
    useEffect(() => {
        if (jsonData.length === 0) return;

        // 트랙 ID별 객체 수 집계
        const trackIdCounts: { [key: number]: number } = {};
        jsonData.forEach((frame) => {
            frame.data.forEach((d) => {
                if (trackIdCounts[d.track_id]) {
                    trackIdCounts[d.track_id]++;
                } else {
                    trackIdCounts[d.track_id] = 1;
                }
            });
        });

        const trackIdData = Object.entries(trackIdCounts).map(([track_id, count]) => ({ track_id: +track_id, count }));

        // 원형 그래프 생성
        const svgWidth = 600;
        const svgHeight = 400;
        const radius = Math.min(svgWidth, svgHeight) / 2;
        const svg = d3
            .select("#chart3")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .append("g")
            .attr("transform", `translate(${svgWidth / 2},${svgHeight / 2})`);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie<{ track_id: number; count: number }>().value((d) => d.count);

        const path = d3
            .arc<d3.PieArcDatum<{ track_id: number; count: number }>>()
            .outerRadius(radius - 10)
            .innerRadius(0);

        const label = d3
            .arc<d3.PieArcDatum<{ track_id: number; count: number }>>()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        const arc = svg.selectAll(".arc").data(pie(trackIdData)).enter().append("g").attr("class", "arc");

        arc.append("path")
            .attr("d", path)
            .attr("fill", (d) => color(d.data.track_id.toString()));

        arc.append("text")
            .attr("transform", (d) => `translate(${label.centroid(d)})`)
            .attr("dy", "0.35em")
            .text((d) => d.data.track_id.toString());
    }, [jsonData]);

    return (
        <div id="chart-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", justifyContent: "center" }}>
            <div className="chart-container">
                <h2 className="chart-caption">Track Object Counts </h2>
                <div className="chart" id="chart1"></div>
            </div>
            <div className="chart-container">
                <h2 className="chart-caption">Frame Accuracy </h2>
                <div className="chart" id="chart2"></div>
            </div>
            <div className="chart-container">
                <h2 className="chart-caption">Track ID Counts </h2>
                <div className="chart" id="chart3"></div>
            </div>
        </div>
    );
};

export default Main;
