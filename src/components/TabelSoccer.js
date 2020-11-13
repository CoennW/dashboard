import React from 'react';
import moment from '../../node_modules/moment';
import logo from '../images/tafelvoetbal-logo.png'
import _ from 'lodash';
const axios = require('axios').default;

class TableSoccer extends React.Component {

    state = {
        TableSoccerData: {},
        topScorer: 'mathieu',
        topScores: [
            {
                name: 'mark',
                score: 0
            }
        ] // name => score
    }
    
    // /**
    //  * Constructor if needed
    //  */
    // constructor(props) {
    //     super(props);
    // }
    
    /**
     * Callback when component is loaded
     */
    componentDidMount(){
        let savedData = localStorage.getItem('tableSoccerData');
        if (savedData == null) {
            this.getTableSoccerScore();
            return;
        }
        if (savedData == null || localStorage.getItem('tableSoccerTimeStamp') === null || moment().diff(new Date(localStorage.getItem('tableSoccerTimeStamp')), 'minutes') >= 100) {
            localStorage.setItem('tableSoccerTimeStamp', new Date());
            this.getTableSoccerScore();
            return;
        }
        let AllData = JSON.parse(savedData);
        let players = [];
        for (var i = 0; i < AllData.length; i++) {
            let data = AllData[i];
            if (players[data.blue_player_1] == null) {
                players[data.blue_player_1] = {
                    name: data.blue_player_1,
                    score: 0
                }
            }
            if (data.blue_player_2 != null && players[data.blue_player_2] == null) {
                players[data.blue_player_2] = {
                    name: data.blue_player_2,
                    score: 0
                }
            }
            if (players[data.red_player_1] == null) {
                players[data.red_player_1] = {
                    name: data.red_player_1,
                    score: 0
                }
            }
            if (data.red_player_2 != null && players[data.red_player_2] == null) {
                players[data.red_player_2] = {
                    name: data.red_player_2,
                    score: 0
                }
            }
            players[data.blue_player_1].score += data.blue_goals;
            if (data.blue_player_2 != null) {
                players[data.blue_player_2].score += data.blue_goals;
            }
            players[data.red_player_1].score += data.red_goals;
            if (data.red_player_2 != null) {
                players[data.red_player_2].score += data.red_goals;
            }
        }
        let topScores = [];
        for (var name in players) {
            if (players.hasOwnProperty(name)) {
              // Do things here
              topScores.push({
                  name: players[name].name,
                  score: players[name].score,
              })
            }
          }
        var data = _.orderBy(topScores, ['score','name'], ['desc', 'asc']);
        if (data[0] != null) {
            this.setState({
                topScorer: data[0].name.toLowerCase()
            });
        }
        this.setState({
            topScores: data
        });
    }

    /**
     * Callback when component will be destroyed
     */
    componentWillUnmount() {
        
    }
      
    getTableSoccerScore = () => {
        axios.get('https://dashboard.vormkracht10.nl/api/v1/soccer-topscores.json')
        .then( (response) => {
        
        // handle success
        this.setState({
            TableSoccerData: response.data
        });
        
        localStorage.setItem('tableSoccerData', JSON.stringify(response.data)); 
        
        })
        .catch( (error) => {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    render() {
        
        let className;
        return (
            <div className="col">
                <div className="wrapper">
                    <div className="col-title">
                        <h2>Vormkracht 10 Tafelvoetbal<br />Topscorers</h2>
                    </div>
                    <div className="topscore-profile">
                        <img src={ require('../images/' + this.state.topScorer +'.png') } />
                        <div className="topscore-icon">
                            <img src={logo} alt="" />
                        </div>
                    </div>
                    <div className="score">
                        <table>
                            <tbody>
                                {this.state.topScores ? this.state.topScores.map((player, index) => {        
                                    index === 0 ? className = "number-one" : className = "";  
                                    return (       
                                        <tr key={index} className={className}>
                                            <td>{index + 1}.</td>
                                            <td className="name">{player.name}</td>
                                            <td>{player.score}</td>
                                        </tr>         
                                    );
                                }) : <tr><td>Laden...</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default TableSoccer; 