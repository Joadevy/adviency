import { GiftContainer } from "./Components/GiftContainer";

function App() {
  return (
    <main className="border-2 max-h-[90vh] my-5 overflow-y-auto border-primary-purple rounded-md shadow border-neutral w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 p-4 lg:p-6 bg-primary-green-dark flex flex-col gap-10">
      <header>
        <h1 className="text-white text-5xl font-nerko text-center underline">
          Regalos
        </h1>
      </header>
      <GiftContainer />
    </main>
  );
}

export default App;
