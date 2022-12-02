import { useState } from "react";

function App() {
  const [regalos, setRegalos] = useState<string[]>([
    "Fernet",
    "Notebook",
    "Aire acondicionado",
  ]);

  return (
    <main className="border-2 border-primary-purple rounded-md shadow border-neutral w-1/3 p-6 bg-primary-green-dark flex flex-col gap-4">
      <h1 className="text-white text-5xl font-nerko text-center underline">
        Regalos
      </h1>
      <ul className="font-comforta">
        {regalos.map((regalo, index) => (
          <li key={index} className="text-white font-normal text-lg">
            ☀ {regalo}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
