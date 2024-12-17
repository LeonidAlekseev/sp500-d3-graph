"use client";

import * as d3 from "d3";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const formatter = new Intl.NumberFormat("de-DE");
const color = d3.scaleOrdinal(d3.schemeCategory10);

export default function GraphPlot({ nodes, links, width = 600, height = 600 }) {
  const svgRef = useRef();
  const simulationRef = useRef();
  const tooltipRef = useRef();
  const zoomRef = useRef();
  const [isRunning, setIsRunning] = useState(false);

  const startSimulation = () => {
    setIsRunning(true);
    simulationRef.current.alpha(1.0).restart(); // Запускаем симуляцию
    svgRef.current.style.visibility = "visible";
  };

  const resetZoom = () => {
    d3.select(svgRef.current).call(zoomRef.current.transform, d3.zoomIdentity);
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Очистка предыдущих элементов
    const g = svg.append("g"); // Группа для узлов и связей

    // Создание всплывающего окна
    const tooltip = d3.select(tooltipRef.current);

    // Создание масштабирования
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 5])
      .on("zoom", (event) => {
        const { transform } = event;
        g.attr("transform", transform);
      });
    svg.call(zoom);
    zoomRef.current = zoom;

    // Создание симуляции для графа
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(30)
      )
      // .force("charge", d3.forceManyBody().strength(-1))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collide",
        d3.forceCollide((d) => Math.log(d.totalVolume) - 10 || 10)
      );

    // Создание линий для связей
    const link = g
      .selectAll()
      .data(links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr(
        "stroke-width",
        (d) => Math.max(1, ((d.correlation - 0.95) / 0.05) * 5) || 1
      );

    // Создание узлов
    const node = g
      .selectAll()
      .data(nodes)
      .join("circle")
      .attr("r", (d) => Math.log(d.totalVolume) - 15 || 5)
      .attr("fill", (d) => color(d.sectorId) || "#2077B4")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .on("mouseover", (event, d) => {
        tooltip
          .style("visibility", "visible")
          .html(
            `Тикер: ${d.id}<br>Компания: ${
              d.name
            }<br>Объем: $${formatter.format(d.totalVolume)}`
          );
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", event.pageY + 5 + "px")
          .style("left", event.pageX + 5 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    // Обновление позиций узлов и связей на каждом шаге симуляции
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node
        .attr("cx", (d) => {
          // Ограничение по оси X
          d.x = Math.max(20, Math.min(width - 20, d.x));
          return d.x;
        })
        .attr("cy", (d) => {
          // Ограничение по оси Y
          d.y = Math.max(20, Math.min(height - 20, d.y));
          return d.y;
        });
    });

    simulation.stop();
    simulationRef.current = simulation;

    // Функции для перетаскивания узлов
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.1).restart();
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

  return (
    <div>
      <div className="flex gap-2">
        <button className="mb-2" onClick={startSimulation}>
          <Image
            className="dark:invert"
            src="/play.svg"
            alt="Сбросить отображение"
            width={24}
            height={24}
            priority
          />
        </button>
        <button className="mb-2" onClick={resetZoom}>
          <Image
            className="dark:invert"
            src="/eye.svg"
            alt="Сбросить отображение"
            width={24}
            height={24}
            priority
          />
        </button>
      </div>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ visibility: "hidden" }}
      />
      <span
        ref={tooltipRef}
        className="absolute p-2 rounded border bg-gray-100 bg-opacity-80 backdrop-blur-sm"
        style={{ visibility: "hidden" }}
      ></span>
    </div>
  );
}
