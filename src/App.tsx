
import Route from './routes/route'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Route />
      </div>
    </ErrorBoundary>
  )
}

export default App
