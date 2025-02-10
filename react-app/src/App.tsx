import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";

function App() {

  // State Hook
  const [alertVisible, setAlertVisibility] = useState(false)

  const handleSelectItem = () => {
    setAlertVisibility(false)
  }

  return (
    <div>
      {alertVisible && <Alert onClose={handleSelectItem}>Hello world</Alert>}
      <Button color="primary" onClick={() => setAlertVisibility(true)}>See alert message</Button>
    </div>
  )
}

export default App