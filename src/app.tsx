import { createRoot } from 'react-dom/client';

export default function App() {
  return (
    <div>
      <h1>💖 Hello World!</h1>
      <p>Welcome to your Electron application.</p>
    </div>
  );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
