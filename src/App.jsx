import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/navigation/navbar.jsx";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import QuestionPage from "./pages/QuestionPage.jsx";
import FallbackPage from "./pages/FallbackPage.jsx";
import CreateQuestionPage from "./pages/CreateQuestionPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import BadgesPage from "./pages/BadgesPage.jsx";

function App() {

  return (
      <BrowserRouter>
          <div className="flex flex-col w-full h-full justify-start items-start">
              <Navbar/>

              <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="*" element={<FallbackPage/>}/>
                  <Route path="/questions/create" element={<CreateQuestionPage/>}/>
                  <Route path="/questions/:id" element={<QuestionPage/>}/>
                  <Route path="/about" element={<AboutPage/>}/>
                  <Route path="/courses" element={<CoursesPage/>}/>
                  <Route path="/badges" element={<BadgesPage/>}/>
              </Routes>
          </div>
      </BrowserRouter>

  )
}

export default App
