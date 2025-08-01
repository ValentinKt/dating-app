import './App.css'
import HomePage from './components/HomePage'
import ResultPage from './components/ResultPage'
import FormPage from './components/FormPage'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
