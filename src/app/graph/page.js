import LinePlot from "@/components/plot/Line";
import GraphPlot from "@/components/plot/Graph";

const Page = () => {
  const nodes = [
    { id: "AAPL", name: "Apple Inc." },
    { id: "MSFT", name: "Microsoft Corp." },
    { id: "GOOGL", name: "Alphabet Inc." },
    { id: "AMZN", name: "Amazon.com Inc." },
    { id: "TSLA", name: "Tesla Inc." },
  ];

  const links = [
    { source: "AAPL", target: "MSFT" },
    { source: "AAPL", target: "GOOGL" },
    { source: "MSFT", target: "GOOGL" },
    { source: "AMZN", target: "TSLA" },
    { source: "TSLA", target: "AAPL" },
  ];

  return (
    <div>
      <h1>Граф финансовых активов</h1>
      <GraphPlot nodes={nodes} links={links} />
      <LinePlot data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
    </div>
  );
};

export default Page;
