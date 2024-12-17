import fs from "fs";
import path from "path";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const correlation = searchParams.get("correlation") || 0.95;

  const filePath = path.join(process.cwd(), "public/data/edge_results.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const links = JSON.parse(jsonData);

  const targetLinks = {};
  Object.keys(links).forEach((year) => {
    targetLinks[year] = links[year].filter(
      (d) => Math.abs(d.correlation) > Number(correlation)
    );
  });

  return new Response(JSON.stringify(targetLinks), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
