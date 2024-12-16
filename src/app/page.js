import Timeline from "@/components/ui/Timeline";
import LinePlot from "@/components/plot/Line";
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
    // {
    //   title: "test",
    //   element: (
    //     <LinePlot
    //       data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
    //       width={200}
    //       height={150}
    //     />
    //   ),
    // },
    {
      title: "2018",
      element: (
        <GraphPlot nodes={nodes} links={links} width={200} height={150} />
      ),
    },
    {
      title: "2019",
      element: (
        <GraphPlot nodes={nodes} links={links} width={200} height={150} />
      ),
    },
    {
      title: "2020",
      element: (
        <GraphPlot nodes={nodes} links={links} width={200} height={150} />
      ),
    },
    {
      title: "2021",
      element: (
        <GraphPlot nodes={nodes} links={links} width={200} height={150} />
      ),
    },
    {
      title: "2022",
      element: (
        <GraphPlot nodes={nodes} links={links} width={200} height={150} />
      ),
    },
    {
      title: "2023",
      element: (
        <GraphPlot nodes={nodes} links={links} width={200} height={150} />
      ),
    },
    {
      title: "2024",
      element: (
        <GraphPlot nodes={nodes} links={links} width={200} height={150} />
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Граф финансовых активов</h1>
      <Timeline data={timelineData} />
    </div>
  );
};

export default Page;
