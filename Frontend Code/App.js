import './App.css';
import FileUploader from './Components/FileUploader2';
import Table from './Components/Table';

function App() {
  return (
    <div className="App">
      
      <div id="barContainer">
        <div id="bar"></div>
      </div>

      <FileUploader/>

      {/* <div id="output">
        <div id="before"></div>
        <div id="after"></div>
      </div> */}
      <br/>
      <Table/>

    </div>
  );
}

export default App;
