import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/navigation/navbar.jsx";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import QuestionPage from "./pages/QuestionPage.jsx";
import FallbackPage from "./pages/FallbackPage.jsx";

function App() {

  return (
      <BrowserRouter>
          <div className="flex flex-col w-full h-full justify-start items-start">
              <Navbar/>

              <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="*" element={<FallbackPage/>}/>
                  <Route path="/questions/:id" element={<QuestionPage/>}/>

              </Routes>
          </div>
      </BrowserRouter>

  )
}

export default App
