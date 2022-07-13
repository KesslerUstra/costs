import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import NewProject from './components/pages/NewProject'
import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Projects from './components/pages/Projects'
import Project from './components/pages/Project'

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass = "width">
        <Routes>
          <Route exact path= "/" element={<Home/>}/>
          <Route path= "/contact" element={<Contact/>}/>
          <Route path= "/newproject" element={<NewProject/>}/>
          <Route path= "/projects" element={<Projects/>}/>
          <Route path= "/project/:id" element={<Project/>}/>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;