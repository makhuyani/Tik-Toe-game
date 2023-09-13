import logo from './logo.svg';
import './App.css';
// import {BrowserRouter as Router , Route} from "react-router-dom";
 import Game from './components/Game.component';

function App() {

    return (
      <>
       <div className="App">
         <header className="App-header">
           <Game/>
         </header> 
       </div>
       </>
    );

  
}

export default App;