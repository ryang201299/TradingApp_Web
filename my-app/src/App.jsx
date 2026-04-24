import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Accounts from './Pages/Accounts'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accounts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App