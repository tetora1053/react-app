import React from 'react';
import ReactDom from 'react-dom';

scaleNames = {
    'c' : 'Celcius',
    'f' : 'Fahrenheit'
};

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;

        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames.[scale]}:</legend>
                <input
                    value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        );
    }
}

function BoilingVerdict(props) {
    if (props.celcius >= 100) {
        return <p>the water is boil.</p>
    }
    return <p>the water is not boil.</p>
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {
            temperature: '',
            scale: 'c'
        }
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celcius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) :temperature;

        return (
            <div>
                <TemperatureInput
                    value={celsius};
                    scale='c'
                    onTemperatureChange={this.handleCelsiusChange}
                />
                <TemperatureInput
                    scale='f'
                    onTemperatureChange={this.handleFahrenheitChange}
                />
                <BoilingVerdict
                    celcius={parseFloat(celcius)}
                />
            </div>
        );
    }
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celcius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
