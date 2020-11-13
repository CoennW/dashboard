import React from 'react';

// const axios = require('axios').default;
// const device = new Sonos('192.168.178.1');
class MusicCard extends React.Component {
    
    state = {
        helloWorld: "Hello World!"
    }

    // /**
    //  * constructor if needed
    //  */
    // constructor(props) {
    //     super(props);
    // }

    /**
     * Callback when component is loaded
     */
    componentDidMount(){
        
    }

    /**
     * Callback when component will be destroyed
     */
    componentWillUnmount() {
        
    }
      
    myFunction = () => {

    }

    render() {
        return (
           <div className="col">
                    <div className="wrapper">
                        <h3>Nu aan het afspelen: De jeugd van tegenwoordig</h3>
                        {/* <p>{device.currentTrack()}</p> */}
                        {this.state.helloWorld}
                    </div>
                </div>
        );
    }   
}

export default MusicCard; 