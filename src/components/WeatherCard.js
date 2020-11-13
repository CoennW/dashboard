import React from 'react';
import Day from './Day';
import moment from '../../node_modules/moment';
const axios = require('axios').default;


class WeatherCard extends React.Component {

    state = {
        weatherdata: {
        }
    }
    
    /**
     * Callback when component is loaded
     */
    componentDidMount(){
        let savedData = localStorage.getItem('weatherData');
        
        if (savedData != null) {
            this.setState({
                weatherdata: JSON.parse(localStorage.getItem('weatherData'))
            });
        }
        
        if (localStorage.getItem('weatherTimeStamp') === null || moment().diff(new Date(localStorage.getItem('weatherTimeStamp')), 'minutes') >= 10) {
            localStorage.setItem('weatherTimeStamp', new Date());
            this.getWeather();
        } else {
                console.log("Weer data update over: " + (10 - moment().diff(new Date(localStorage.getItem('weatherTimeStamp')), 'minutes')) + ' minuten.');
        } 
    }

    /**
     * Callback when component will be destroyed
     */
    componentWillUnmount() {
        // this.setState({
        //     weatherdata: JSON.parse(localStorage.getItem('weatherData'))
        // });
    }
      
    getWeather = () => {
        axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/8c118280954e8c4230088adee70edc31/51.8425,5.85278?lang=nl&units=auto')
        .then( (response) => {

        // handle success
        // console.log(response.data);
        this.setState({
            weatherdata: response.data
        });
        
        localStorage.setItem('weatherData', JSON.stringify(response.data));  

        })
        .catch( (error) => {
        console.log(error);
        })
        .finally(function () {
        // always executed
        });
    }

    render() {

        let icons = {
            "clear-day": "sun",
            "clear-night": "moon", 
            "rain": "cloud-rain",
            "snow": "snowflake",
            "sleet": "cloud-meatball", 
            "wind": "wind", 
            "fog": "smog", 
            "cloudy": "cloud", 
            "partly-cloudy-day": "cloud-sun", 
            "partly-cloudy-night": "cloud-moon"
        };
        
        let render = [1, 2, 3, 4];
        
        return (
            <div className="col">
                    <div className="wrapper">
                        <div className="wheather-now">
                            <div className="col-title"><h2>Het weer</h2></div>
                                <div className="wheather-current-wrapper">
                                    <div className="wheather-icon">
                                    <i className={`fas fa-${this.state.weatherdata.currently ? icons[this.state.weatherdata.currently.icon] : "moon"}`}></i>
                                </div>
                                <div id="current-temp" className="wheater-celcius">
                                    {this.state.weatherdata.currently ? this.state.weatherdata.currently.temperature.toFixed(0) : '...'}&deg; 
                                </div>
                                <div className="wheater-place">
                                    in Nijmegen
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper">
                        <div className="col-title"><h2>Het weer voor aankomende dagen</h2></div>
                        <div className="wheater-overview">
                            <table>
                                <tbody>
                                <tr className="wheater-overview">
                                    {render.map(key => {
                                        return <Day key={key} addDays={key} />
                                    })}
                                </tr>
                                <tr>
                                    {render.map(key => {
                                        return <td key={key} className="wheater-overview-icon"><i key={key} className={`fas fa-${this.state.weatherdata.daily ? icons[this.state.weatherdata.daily.data[key + 1].icon] : "moon" }`}></i></td>
                                    })}
                                </tr>
                                <tr>
                                    {render.map(key => {
                                    return <td key={key}  className="degree">{this.state.weatherdata.daily ? this.state.weatherdata.daily.data[key + 1].temperatureHigh.toFixed(0) : '...'}&#xb0;</td>
                                    })}
                                </tr>
                                </tbody> 
                            </table>
                        </div>
                    </div>
                </div>
        );
    }
}

export default WeatherCard; 