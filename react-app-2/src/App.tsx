const Card = ({ title }: { title: string }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
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
