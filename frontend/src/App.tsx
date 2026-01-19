import './App.css'
import { Board } from './components/Board/Board'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Taskboard</h1>
      </header>
      <main className="app-main">
        <Board />
      </main>
    </div>
  )
}

export default App
