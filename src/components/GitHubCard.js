import React from 'react';
import GitHubLogo from '../images/githublogo.png';
const axios = require('axios').default;
const moment = require('moment');

class GitHubCard extends React.Component {

    state = { 
    }

    /**
     * constructor if needed
     */
    constructor(props) {
        super(props);
        let savedData = localStorage.getItem('gitHubData');
        
        if (savedData != null) {
            
                this.state.gitHubData = JSON.parse(localStorage.getItem('gitHubData'));
            
        }
    }

    /**
     * Callback when component is loaded
     */
    componentDidMount(){
        
        
        if (localStorage.getItem('gitHubTimeStamp') === null || moment().diff(new Date(localStorage.getItem('gitHubTimeStamp')), 'minutes') >= 5) {
            localStorage.setItem('gitHubTimeStamp', new Date());
            this.getGitHubData();
        } else {
                console.log("GitHub data update over: " + (5 - moment().diff(new Date(localStorage.getItem('gitHubTimeStamp')), 'minutes')) + ' minuten.');
        } 
    }

    /**
     * Callback when component will be destroyed
     */
    componentWillUnmount() {       
        
    }
      
    getGitHubData = () => {
        axios.get('https://dashboard.vormkracht10.nl/api/v1/github/repositories/last-updated.json')
        .then( (response) => {
            
            //console.log(response);
            this.setState({
                gitHubData: response.data
            });

            
            localStorage.setItem('gitHubData', JSON.stringify(response.data));
            //github.storeData(response.data);
        })
        .catch( (error) => {
            console.log(error);
                // let dateString = data.timestamp;
                // let ddmmyy = new Date(dateString).toLocaleDateString("nl-NL");
                // let hhmmss = new Date(dateString).toLocaleTimeString("nl-NL").substring(0,5);
                // console.warn('Geen gitHub repositories kunnen ophalen. Data in gebruik van:  ' + ddmmyy + " " + hhmmss);
        })
        .finally( () => {
            //
        });
    }

    renderGithubList = (dataExists) => {
        if(dataExists) {
            return (
            dataExists.map((render,index) => {
                return (
                    <li key={index}>
                        <div className="github-pull-profile-photo"><img src={render.owner.avatar_url} alt=""/></div>
                        <div className="github-pull-request-name">
                            {render.name} <br/>
                            {moment(render.updated_at).fromNow()}
                        </div>
                    </li>
                );
            }));
        } else {
            return "Loading..."
        }
    }

    render() {
        let toRender;
        if(this.state.gitHubData != null){
            toRender = this.state.gitHubData.slice(0,5); 
        } 
        
        return (
            <div className="col">
                    <div className="status wrapper">
                        <div className="status-icon">
                                <img src={GitHubLogo} width="100%;" alt=""/>
                            <span>5</span> 
                        </div>
                        <div className="col-title"><h2>Github Activity</h2></div>
                        <ul className="github">
                            {this.renderGithubList(toRender)}         
                        </ul>
                    </div>
                </div>
        );
    }   
}

export default GitHubCard; 