import React, { Component } from 'react';
import './css/style.css';
import jsonData from './data/denver_mapping_data.geojson.json'

class App extends Component {
  state = {
    mapData:null,
    cities: [],
    displayData: null
  }
  componentDidMount(){
    let aMap = new Map()
    let tempCities = []
    for(let feature of jsonData.features){
      aMap.set(feature.properties.neighborhood_name, feature.properties)
      tempCities.push(feature.properties.neighborhood_name)
    } 
    this.setState({mapData:aMap, cities:tempCities})      
  }
  displayData(data){
    this.setState({displayData:this.state.mapData.get(data.target.innerHTML)})
  }
  render() {
    return (
      <div className="container">
        <div className="list">
          {
            this.state.cities.map(city => {
              return (
                <>
                  <div key={city} onClick={(event) => this.displayData(event)}>{city}</div>
                </>
              )
            })
          }
        </div>
        <div className="display">
            {
              this.state.displayData != null 
              ?
              Object.keys(this.state.displayData).map((key,index) => {
                return <div>{key + "\t" + this.state.displayData[key]}</div>
              })
            :""
          }
        </div>
    </div>
  );
}
}

export default App;
