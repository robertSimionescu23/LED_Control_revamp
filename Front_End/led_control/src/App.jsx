import Home from './Home/Home'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
    return (
        <Router>
            <Routes>
                <Route path = "/" element = {<Home/>}/>
                <Route path = "/fill" element = {<Home/>}/>
                <Route path = "/functiions" element = {<Home/>}/>
                <Route path = "/favorites" element = {<Home/>}/>
                <Route path = "/help" element = {<Home/>}/>
            </Routes>
        </Router>
    )
}

export default App
