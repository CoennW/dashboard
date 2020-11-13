import React from 'react';

class Day extends React.Component {

    constructor(props) {

        super(props);

        this.state = {date: new Date()};

        this.state.date.setDate(this.state.date.getDate() + parseInt(this.props.addDays));

    }
    
    render() {
        let week = ["ZO", "MA", "DI", "WO", "DO", "VR", "ZA"];
        let day = this.state.date.getDay();
        let dayToRender = week[day];
        return  <th className="day">{dayToRender}</th>
    }
    
}

export default Day; 