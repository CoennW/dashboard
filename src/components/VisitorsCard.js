import React from 'react';
// const axios = require('axios').default;

class VisitorsCard extends React.Component {

    state = {
        helloWorld: "Hello World!"
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
                        <h3>Bezoekers vandaag: 2 miljardjoen</h3>
                            {this.state.helloWorld}
                    </div>
                </div>
        );
    }
}

export default VisitorsCard; 