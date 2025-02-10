import { useState } from "react"
import Search from "./components/Search"

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main>
      <div className="pattern"></div>

      <div className="wrapper">

        <header>
          <img src="./hero.png" alt="Hero banner" />
          <h1>Find Movies you'll enjoy without the hassle</h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

      </div>
    </main>
  )
}

export default App
