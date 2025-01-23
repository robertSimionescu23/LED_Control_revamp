import Home from './Home/Home'
import Fill from './FillPage/Fill'
import Favorites from './Favorites/Favorites'
import Functions from './FunctionsPage/Functions'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
    return (
        <Router>
            <Routes>
                <Route path = "/" element = {<Home/>}/>
                <Route path = "/fill" element = {<Fill/>}/>
                <Route path = "/function" element = {<Functions/>}/>
                <Route path = "/favorite" element = {<Favorites/>}/>
                <Route path = "/help" element = {<Home/>}/>
            </Routes>
        </Router>
    )
}

export default App
