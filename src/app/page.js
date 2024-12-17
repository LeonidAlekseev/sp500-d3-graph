import Timeline from "@/components/ui/Timeline";
import GraphPlot from "@/components/plot/Graph";

const Page = () => {
  const nodes = [
    { id: "AAPL", name: "Apple Inc." },
    { id: "MSFT", name: "Microsoft Corp." },
    { id: "GOOGL", name: "Alphabet Inc." },
    { id: "AMZN", name: "Amazon.com Inc." },
    { id: "TSLA", name: "Tesla Inc." },
    { id: "FB", name: "Meta Platforms Inc." },
    { id: "NFLX", name: "Netflix Inc." },
    { id: "NVDA", name: "NVIDIA Corp." },
    { id: "ADBE", name: "Adobe Inc." },
    { id: "INTC", name: "Intel Corp." },
    { id: "CSCO", name: "Cisco Systems Inc." },
    { id: "ORCL", name: "Oracle Corp." },
    { id: "IBM", name: "IBM Corp." },
    { id: "PYPL", name: "PayPal Holdings Inc." },
    { id: "CRM", name: "Salesforce.com Inc." },
  ];

  const links = [
    { source: "AAPL", target: "MSFT" },
    { source: "AAPL", target: "GOOGL" },
    { source: "MSFT", target: "GOOGL" },
    { source: "AMZN", target: "TSLA" },
    { source: "TSLA", target: "AAPL" },
    { source: "FB", target: "GOOGL" },
    { source: "NFLX", target: "AMZN" },
    { source: "NVDA", target: "AAPL" },
    { source: "ADBE", target: "MSFT" },
    { source: "INTC", target: "NVDA" },
    { source: "CSCO", target: "FB" },
    { source: "ORCL", target: "MSFT" },
    { source: "IBM", target: "GOOGL" },
    { source: "PYPL", target: "AMZN" },
    { source: "CRM", target: "MSFT" },
    { source: "AAPL", target: "FB" },
    { source: "TSLA", target: "NVDA" },
  ];

  const timelineData = [
    {
      title: "2018",
      element: <GraphPlot nodes={nodes} links={links} />,
    },
    {
      title: "2019",
      element: <GraphPlot nodes={nodes} links={links} />,
    },
    {
      title: "2020",
      element: <GraphPlot nodes={nodes} links={links} />,
    },
    {
      title: "2021",
      element: <GraphPlot nodes={nodes} links={links} />,
    },
    {
      title: "2022",
      element: <GraphPlot nodes={nodes} links={links} />,
    },
    {
      title: "2023",
      element: <GraphPlot nodes={nodes} links={links} />,
    },
    {
      title: "2024",
      element: <GraphPlot nodes={nodes} links={links} />,
    },
  ];

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
      <Timeline data={timelineData} />
    </div>
  );
};

export default Page;
