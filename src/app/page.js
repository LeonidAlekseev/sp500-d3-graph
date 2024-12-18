"use client";

import { useEffect, useState, useMemo } from "react";
import Spinner from "@/components/ui/Loader";
import Accordion from "@/components/ui/Accordion";
import Timeline from "@/components/ui/Timeline";
import { GraphPlot } from "@/components/plot/Graph";
import { CircularGraphPlot } from "@/components/plot/CircularGraph";

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

  const years = Object.keys(nodes);

  // Мемоизация данных для CircularGraphPlot
  const timelineDataCircularGraph = useMemo(() => {
    return years.map((year) => ({
      title: year,
      element: (
        <CircularGraphPlot
          nodes={[...nodes[year]]} // Используйте мемоизированные данные
          links={[...links[year]]}
        />
      ),
    }));
  }, [nodes, links, years]);

  // Мемоизация данных для GraphPlot
  // const timelineDataGraph = useMemo(() => {
  //   return years.map((year) => ({
  //     title: year,
  //     element: (
  //       <GraphPlot
  //         nodes={[...nodes[year]]} // Используйте мемоизированные данные
  //         links={[...links[year]]}
  //       />
  //     ),
  //   }));
  // }, [nodes, links, years]);

  const infoAccordionItems = [
    {
      title: "1. Описание графовой модели структуры сети",
      content: (
        <>
          <p>Тут будет текст</p>
          <p>Тут будет текст</p>
        </>
      ),
    },
    {
      title: "2. Качественный анализ изменений решения оптимизационной задачи",
      content: (
        <>
          <p>Тут будет текст</p>
          <p>Тут будет текст</p>
        </>
      ),
    },
    {
      title:
        "3. Количественный анализ изменений решения оптимизационной задачи",
      content: (
        <>
          <p>Тут будет текст</p>
          <p>Тут будет текст</p>
        </>
      ),
    },
    {
      title: "4. Интерпретация изменений решения оптимизационной задачи",
      content: (
        <>
          <p>Тут будет текст</p>
          <p>Тут будет текст</p>
        </>
      ),
    },
    {
      title: "5. Отчет о технической реализации",
      content: (
        <>
          <p>Тут будет текст</p>
          <p>Тут будет текст</p>
        </>
      ),
    },
  ];

  return (
    <main>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">
          Анализ динамической сети акций индекса S&P 500
        </h1>
        <div className="mb-4">
          <span>
            Проект подготовлен Алексеевым Леонидом Владимировичем, студентом
            группы МО23-1М Финансового университета при правительстве РФ.
          </span>
        </div>
        <Accordion lassName="mb-4" items={infoAccordionItems} />
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <span className="p-4">Ошибка</span>
      ) : (
        <>
          <Timeline
            title={
              "Изменения сети в дискретном времени с круговой визуализацией графа"
            }
            data={timelineDataCircularGraph}
          />
          {/* <Timeline
            title={
              "Изменения сети в дискретном времени с физической симуляцией графа"
            }
            data={timelineDataGraph}
          /> */}
        </>
      )}
    </main>
  );
};

export default Page;
