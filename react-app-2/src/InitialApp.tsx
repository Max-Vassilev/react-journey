import { useEffect, useState } from "react";

const Card = ({ title }: { title: string }) => {
  const [count, setCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`);
  }, [title, hasLiked]);
  

  return (
    <div className="card"  >
      
      <h2>{title}</h2>
      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

const App = () => {
  

  return (
    <div className="card-container">
      <h2>Hello</h2>
      <Card title="Star Wars" />
      <Card title="Avatar" />
      <Card title="Lion King" />
    </div>
  );
};

export default App;
