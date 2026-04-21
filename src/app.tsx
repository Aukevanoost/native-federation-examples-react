import { StrictMode, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>Hello World</h1>
      <p>A minimal React 18 app built with ESbuild.</p>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
    </main>
  );
}

class MyButtonElement extends HTMLElement {
  private root: Root | null = null;

  connectedCallback() {
    this.root = createRoot(this);
    this.root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }

  disconnectedCallback() {
    this.root?.unmount();
    this.root = null;
  }
}

if (!customElements.get('my-react-app')) {
  customElements.define('my-react-app', MyButtonElement);
}
