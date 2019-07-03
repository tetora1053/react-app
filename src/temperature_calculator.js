import React from 'react';
import ReactDom from 'react-dom';

function BoilingVerdict(props) {
    if (props.celcius >= 100) {
        return <p>the water is boil.</p>
    }
    return <p>the water is not boil.</p>
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.HandleChange = this.HandleChange.bind(this);
        this.state = {temperature: ''}
    }

    HandleChange(e) {
        this.setState({temperature: e.target.value});
    }

    render() {
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>Enter temperature in celcius:</legend>
                <input 
                    value={temperature}
                    onChange={this.HandleChange}
                />
                <BoilingVerdict celcius={parseFloat(temperature)} />
            </fieldset>
        );
    }
}