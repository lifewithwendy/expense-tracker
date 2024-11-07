import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className='card flex flex-col items-center'>
        <div className='flex flex-row gap-6 card '>
          <button className="bg-blue-100 rounded-lg w-20" onClick={() => setCount((count) => count + 1)}>up</button>
          <button className="bg-red-100 rounded-lg w-20"  onClick={() => setCount((count) => count - 1)}>down</button>
        </div>
        <p>{count}</p>
      </div>
    </>
  );
}

export default App;
