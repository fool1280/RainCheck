import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  margin: 0 auto;
  border-color: red;  
  color: white;
`;

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherResult: null,
    }
  }

  componentDidMount() {
    console.log("App ready!");
    this.getLocation();
  }

  getCurrentWeather = async(lon, lat) => {
    let apiKey = process.env.REACT_APP_APIKEY;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    let data = await fetch(url);
    let result = await data.json();
    console.log("Results:", result);
    this.setState({weatherResult: result})
  }

  getLocation  = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getCurrentWeather(post.coords.longitude, post.coords.latitude)
    })
  }

  getWeatherByCity = async(city) => {
    let apiKey = process.env.REACT_APP_APIKEY;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    let data = await fetch(url);
    let result = await data.json();
    console.log("Results:", result);
    this.setState({weatherResult: result})
  }

  render() {
    if (this.state.weatherResult == null) {
      return (
        <div>
          <ClipLoader>
            css={override}
            size={400}
            color={"#00FF41"}
            loading={true}
          </ClipLoader>
        </div>
      )
    }
    return (
      <div className="container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">
              No more reason for lying about rain check.
            </h1>
            <h2 className="col-12">Current location: {this.state.weatherResult.name}</h2>
            <table>
              <thead>
                <tr>
                  <th>Temperature</th>
                  <th>Feel</th>
                  <th>Max</th>
                  <th>Min</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.weatherResult.main.temp} &#8451;</td>
                  <td>{this.state.weatherResult.main.feels_like} &#8451;</td>
                  <td>{this.state.weatherResult.main.temp_max} &#8451;</td>
                  <td>{this.state.weatherResult.main.temp_min} &#8451;</td>
                </tr>
              </tbody>
            </table>
            <h3 className="col-12">{this.state.weatherResult.weather[0].description.charAt(0).toUpperCase() + this.state.weatherResult.weather[0].description.slice(1)}</h3>
            <div className="btn-group">
              <button type="button" className="btn btn-success" onClick={() => this.getWeatherByCity("new york")}>New York</button>
              <button type="button" className="btn btn-info" onClick={() => this.getWeatherByCity("ho chi minh")}>Ho Chi Minh City</button>
              <button type="button" className="btn btn-success" onClick={() => this.getWeatherByCity("beijing")}>Beijing</button>
              <button type="button" className="btn btn-info" onClick={() => this.getWeatherByCity("vancouver")}>Vancouver</button>
              <button type="button" className="btn btn-success" onClick={() => this.getWeatherByCity("moscow")}>Moscow</button>
              <button type="button" className="btn btn-info" onClick={() => this.getWeatherByCity("tokyo")}>Tokyo</button>      
            </div>
          </div>
        </div>
      </div>
    )
  }
}
