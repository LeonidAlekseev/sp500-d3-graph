"use client";

import { useEffect, useState } from "react";
import Timeline from "@/components/ui/Timeline";
import GraphPlot from "@/components/plot/Graph";
import Spinner from "@/components/ui/Loader";

const Page = () => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nodesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/nodes`,
          {
            method: "GET",
          }
        );
        const linksResponse = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/links`,
          {
            method: "GET",
          }
        );

        if (!nodesResponse.ok || !linksResponse.ok) {
          throw new Error("Ошибка при загрузке данных");
        }

        const nodesData = await nodesResponse.json();
        const linksData = await linksResponse.json();

        setNodes(nodesData);
        setLinks(linksData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const years = Object.keys(nodes);
  const years = [2021, 2022, 2023, 2024];
  const timelineData = years.map((year) => ({
    title: year,
    element: <GraphPlot nodes={nodes[year]} links={links[year]} />,
  }));

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        Анализ динамической сети акций S&P 500 на основе корреляции: построение
        и визуализация графовой модели
      </h1>
      <div className="mb-4">
        <span>
          В данном проекте проводится анализ динамической сети акций компаний,
          входящих в индекс S&P 500, с использованием графовой модели. Основной
          целью является выявление и визуализация взаимосвязей между акциями на
          основе их корреляции в изменяющихся рыночных условиях.
        </span>
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <span>Ошибка</span>
      ) : (
        <Timeline data={timelineData} />
      )}
    </div>
  );
};

export default Page;
