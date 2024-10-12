import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/navigation/navbar.jsx";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import QuestionPage from "./pages/QuestionPage.jsx";
import FallbackPage from "./pages/FallbackPage.jsx";
import CreateQuestionPage from "./pages/CreateQuestionPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import BadgesPage from "./pages/BadgesPage.jsx";
import {Toaster} from "./components/toast/toaster.tsx";
import {Provider, useSelector} from "react-redux";
import {store} from "./services/store/store.js";
import AccountDisplay from "./pages/Account-display.jsx";
import SearchPage from "./pages/SearchPage.jsx";
function App() {

  return (
      <BrowserRouter>
          <Provider store={store}>

          <div className="flex flex-col w-full h-full justify-start items-start">
              <Navbar/>
              <Toaster/>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="*" element={<FallbackPage/>}/>
                        <Route path="/questions/create" element={<CreateQuestionPage/>}/>
                        <Route path="/questions/:id" element={<QuestionPage/>}/>
                        <Route path="/about" element={<AboutPage/>}/>
                        <Route path="/courses" element={<CoursesPage/>}/>
                        <Route path="/badges" element={<BadgesPage/>}/>
                        <Route path="/account" element={<AccountDisplay/>}/>
                        <Route path="/search/:query" element={<SearchPage/>}/>
                    </Routes>
          </div>

          </Provider>

      </BrowserRouter>

  )
}

export default App
