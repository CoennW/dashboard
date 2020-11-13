import React from 'react';
import '../App.css';
import logo from '../images/logo-vk10.png';

class TopHeader extends React.Component {
    
    constructor(props) {        
        super(props);
        let date = new Date();
        this.state = {
            time: date.toLocaleTimeString('NL-nl'),
            date: date.toLocaleDateString('NL-nl', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        }    
    }
    
    componentDidMount() {

        setInterval(() => {
            this.setState({
                time: new Date().toLocaleTimeString('NL-nl')
            });
        }, 1000);

    }

    animateProgressBar = () => {

    }
    
    render() {
        let needAnimation = this.props.animateNow;
        
        return (
            <div className="topheader">
            <div className="content-center">
                <div className="topheader-wrapper">
                    <div className="logo"><img src={logo} alt="vormkracht10-logo" width="100px" /></div>
                    <div className="title-dia">
                        <h1>Dashboard</h1> 
                    </div>
                    <div className="date" id="date">{this.state.date}</div>
                    <div className="time" id="time">{this.state.time}</div>
                </div>
            </div>
           
            <div className={"progress-bar " + (needAnimation ? "animate" : "animateBack")} >

            </div>
          </div>

        );
    }  

}

export default TopHeader;