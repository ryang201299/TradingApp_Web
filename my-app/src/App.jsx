import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Accounts from './Pages/Accounts'
import Account from './Pages/Account'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accounts />} />
        <Route path="/accounts/:id" element={<Account />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App