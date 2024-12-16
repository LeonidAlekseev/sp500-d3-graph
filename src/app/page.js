import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>
        Добро пожаловать в проект Алексеева Леонид графа финансовых активов
      </h1>
      <Link href="/graph">Перейти к графу</Link>
    </div>
  );
}
