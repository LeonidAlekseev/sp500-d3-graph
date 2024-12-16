"use client";

import * as d3 from "d3";
import { useRef, useEffect } from "react";

const color = d3.scaleOrdinal(d3.schemeCategory10);

export default function GraphPlot({ nodes, links, width = 640, height = 400 }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Очистка предыдущих элементов

    // Создание симуляции для графа
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Создание линий для связей
    const link = svg
      .selectAll()
      .data(links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    // Создание узлов
    const node = svg
      .selectAll()
      .data(nodes)
      .join("circle")
      .attr("r", 5)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .attr("fill", (d) => color(d.group) || "#2077B4")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // Обновление позиций узлов и связей на каждом шаге симуляции
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });

    // Функции для перетаскивания узлов
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, [nodes, links, width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
}
