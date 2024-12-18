// DEPRECATED

"use client";

import * as d3 from "d3";
import { useRef, useEffect } from "react";

const formatter = new Intl.NumberFormat("de-DE");

export default function HierarchyPlot({
  nodes,
  links,
  width = 500,
  height = 500,
}) {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const diameter = Math.min(width, height);
    const radius = diameter / 2;
    const innerRadius = radius - 120;

    const cluster = d3.cluster().size([360, innerRadius]);

    const line = d3
      .radialLine()
      .curve(d3.curveBundle.beta(0.85))
      .radius((d) => d.y)
      .angle((d) => (d.x / 180) * Math.PI);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content
    const g = svg
      .append("g")
      .attr("transform", `translate(${radius}, ${radius})`); // Group for nodes and links

    // Tooltip
    const tooltip = d3.select(tooltipRef.current);

    // Create a hierarchy from the nodes and links
    const root = createHierarchy(nodes, links);
    cluster(root);

    // Add links
    const link = g
      .selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-opacity", 0.5);

    // Add nodes
    const node = g
      .selectAll(".node")
      .data(root.leaves())
      .enter()
      .append("text")
      .attr("class", "node")
      .attr("dy", "0.31em")
      .attr(
        "transform",
        (d) =>
          `rotate(${d.x - 90}) translate(${d.y + 8}, 0) ${
            d.x < 180 ? "" : "rotate(180)"
          }`
      )
      .attr("text-anchor", (d) => (d.x < 180 ? "start" : "end"))
      .text((d) => d.data.name)
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible").html(
          `
          <strong>${d.data.id}</strong><br>
          Name: ${d.data.name}<br>
          Sector: ${d.data.sector}<br>
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

    function createHierarchy(nodes, links) {
      const nodeMap = new Map();

      // Add each node to the map
      nodes.forEach((node) => {
        nodeMap.set(node.id, { ...node, children: [] });
      });

      links.forEach((link) => {
        const sourceNode = nodeMap.get(link.source);
        const targetNode = nodeMap.get(link.target);
        if (sourceNode && targetNode) {
          sourceNode.children.push(targetNode);
        }
      });

      const rootNode = nodes.find((node) => {
        return !links.some((link) => link.target === node.id);
      });

      return d3.hierarchy(nodeMap.get("KMI"));
    }
  }, [nodes, links, width, height]);

  return (
    <div>
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
}
