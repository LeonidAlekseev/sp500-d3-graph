"use client";

import * as d3 from "d3";
import { useRef, useEffect, memo } from "react";
import Image from "next/image";

const formatter = new Intl.NumberFormat("de-DE");
const color = d3.scaleOrdinal(d3.schemeCategory10);

const PureCircularGraphPlot = ({ nodes, links, width = 500, height = 500 }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const zoomRef = useRef();

  const resetZoom = () => {
    d3.select(svgRef.current).call(zoomRef.current.transform, d3.zoomIdentity);
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Очистка предыдущих элементов
    const g = svg.append("g"); // Группа для узлов и связей

    // Создание всплывающего окна
    const tooltip = d3.select(tooltipRef.current);

    // Центр и радиус круга
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 50; // Радиус круга с учетом отступов

    // Вычисляем углы для каждого узла
    const angleStep = (2 * Math.PI) / nodes.length;

    // Распределяем узлы по окружности
    nodes.forEach((node, index) => {
      const angle = index * angleStep;
      node.x = centerX + radius * Math.cos(angle); // Координата X
      node.y = centerY + radius * Math.sin(angle); // Координата Y
    });

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

    // Создание линий для связей
    const link = g
      .selectAll(".link")
      .data(links)
      .join("line")
      .attr("class", "link")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.3)
      .attr(
        "stroke-width",
        (d) => Math.max(1, ((d.correlation - 0.95) / 0.05) * 5) || 1
      )
      .attr("x1", (d) => nodes.find((node) => node.id === d.source).x)
      .attr("y1", (d) => nodes.find((node) => node.id === d.source).y)
      .attr("x2", (d) => nodes.find((node) => node.id === d.target).x)
      .attr("y2", (d) => nodes.find((node) => node.id === d.target).y);

    // Создание узлов
    const node = g
      .selectAll(".node")
      .data(nodes)
      .join("circle")
      .attr("class", "node")
      .attr("r", (d) => Math.max(1, Math.log(d.totalVolume) - 20) || 1)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("fill", (d) => color(d.sectorId) || "steelblue")
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible").html(
          `
          <strong>${d.id}</strong><br>
          Name: ${d.name}<br>
          Sector: ${d.sector}<br>
          Last Price: $${formatter.format(d.lastPrice)}<br>
          Mean Price: $${formatter.format(d.meanPrice)}<br>
          Min Price: $${formatter.format(d.minPrice)}<br>
          Max Price: $${formatter.format(d.maxPrice)}<br>
          Total Volume: $${formatter.format(d.totalVolume)}
        `
        );
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", event.layerY + 20 + "px")
          .style("left", event.layerX - 150 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });
  }, [nodes, links, width, height]);

  return (
    <div>
      <div className="flex gap-2">
        <button className="mb-2" onClick={resetZoom}>
          <Image
            className="dark:invert"
            src="/eye.svg"
            alt="Reset Zoom"
            width={24}
            height={24}
            priority
          />
        </button>
      </div>
      <div className="relative">
        <svg ref={svgRef} width={width} height={height} />
        <div className="absolute top-0 left-0 pointer-events-none w-[500px] h-[500px] shadow-[inset_0_0_3px_3px_rgba(255,255,255,1)]"></div>
        <span
          ref={tooltipRef}
          className="absolute w-[300px] p-2 rounded border bg-gray-100 bg-opacity-80 backdrop-blur-sm"
          style={{ visibility: "hidden" }}
        ></span>
      </div>
    </div>
  );
};

export const CircularGraphPlot = memo(PureCircularGraphPlot);
