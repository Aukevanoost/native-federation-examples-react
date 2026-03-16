import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>Hello World</h1>
      <p>A minimal React 18 app built with ESbuild.</p>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
    </main>
  );
}
