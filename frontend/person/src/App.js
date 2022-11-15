import './App.css';
import { Link, Route, Routes  } from "react-router-dom";
import PeopleList from './Components/PeopleList';
import Toolbar from './Components/Toolbar';
import PersonDetails from './Components/PersonDetails';

function App() {
  return (
    <div className="App">
      <Toolbar/>
      <Routes >
        <Route exact path="/" element={<PeopleList/>}/>
        <Route path="/:personId" element={<PersonDetails/>}/>
      </Routes >
    </div>
  );
}

export default App;
