import logo from "../images/logo_star_wars.png";
import '../styles/App.css';
import ListElement from "./ListElement";
import React from "react";
import DetailCard from './DetailCard';

function App() {
  const [data, setData] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [selectedElement, setSelectedElement] = React.useState(null);
  

  var fetchData = async (searchValue) => {
    setLoading(true);
    const response = await fetch("/api" + ( searchValue ? "?search="+searchValue : ""));
    const body = await response.json();
    console.log(body);
    setLoading(false);
    return body;
  }

  var handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      const data = await fetchData(searchInput);
      setData(data);
    }
  }

  var handleListElementClick = (element) => {
    setSelectedElement(element);
  } 


  React.useEffect(() => {
    fetchData().then(res => setData(res)).catch(err =>  console.error(err))
  }, []);


  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        { selectedElement ? 
          <DetailCard element={selectedElement} setSelectedElement={setSelectedElement} />
        :
          <>
            <input type="text" placeholder="search..." value={searchInput} onChange={(event) => setSearchInput(event.target.value)} onKeyDown={handleKeyDown} disabled={loading} className="App-input" />
            
            <div className="App-ListContainer">
            {loading ? <p> Loading... </p> : 
              data.length && data.map(element => (
                <ListElement element={element} key={element.url} onClick={() => handleListElementClick(element)} />
              ))
            }
            </div>
          </>
        }
        
    </div>
  );
}

export default App;
