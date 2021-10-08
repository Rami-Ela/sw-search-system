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
  const [selectedFilter, setSelectedFilter] = React.useState(null);

  var types = [
    {displayName : "People", internalName: "people"}, 
    {displayName : "Planet", internalName: "planets"}, 
    {displayName : "Film", internalName: "films"}, 
    {displayName : "Species", internalName: "species"}, 
    {displayName : "Vehicle", internalName: "vehicles"}, 
    {displayName : "Starship", internalName: "starships"},
  ]
  
  /**
   * get the data from the backend and display them in the list
   * @param {string} [searchValue] optionnal parameter to add search filter
   * @param {string} [typeFilter] optionnal parameter to add type filter
   */
  var fetchData = async (searchValue, typeFilter) => {
    setLoading(true);
    const response = await fetch("/api" + ( typeFilter ? "/" +typeFilter : "") + ( searchValue ? "?search="+searchValue : ""));
    const data = await response.json();
    setData(data);
    setLoading(false);
  }

  /**
   * update the data with the new filters when user press enter in text input
   * @param {*} event key down event
   */
  var handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchData(searchInput, selectedFilter);
    }
  }

  /**
   * set the selected element, when a list element is clicked
   * @param {object} element clicked list element
   */
  var handleListElementClick = (element) => {
    setSelectedElement(element);
  } 

  /**
   * update the selected filter, and data, when the user click on a filter
   * @param {*} internalName internal name of the filter selected
   */
  var handleFilterClick = async (internalName) => {
    const newFilter = selectedFilter === internalName ? null : internalName
    setSelectedFilter(newFilter);
    fetchData(searchInput, newFilter);
  }

  //get all data when the application is loaded 
  React.useEffect(() => {
    fetchData()
  }, []);


  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        { selectedElement ? 
          <DetailCard element={selectedElement} setSelectedElement={setSelectedElement} />
        :
          <>
            <input type="text" placeholder="search..." value={searchInput} onChange={(event) => setSearchInput(event.target.value)} onKeyDown={handleKeyDown} disabled={loading} className="App-input" />
            <div className="App-Filters">
              {types.map((type) => 
                <button disabled={loading} onClick={()=> handleFilterClick(type.internalName)} className={type.internalName === selectedFilter ? "selected" : ""}> {type.displayName} </button>
              )}
            </div> 
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
