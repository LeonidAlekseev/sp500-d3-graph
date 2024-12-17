import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public/data/node_result.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const nodes = JSON.parse(jsonData);

  return new Response(JSON.stringify(nodes), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
