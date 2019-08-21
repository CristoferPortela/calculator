import React from 'react';
import './Main.css';
import Viewer from './calc/Viewer';
import Btn from './calc/Btn';

const initial = {
    value: '0',
    clear: false,
    operation: null,
    calc: [0,0],
    current: 0
}

export class Main extends React.Component
{
    state = { ...initial }

    constructor(props)
    {
        super(props);

        this.clear = this.clear.bind(this);
        this.addDigit = this.addDigit.bind(this);
        this.setOperation = this.setOperation.bind(this);
    }
    clear()
    {
        this.setState({
            ...initial
        });
    }
    setOperation(operation)
    {
        console.log(operation);
    }
    addDigit(n)
    {
        if (n === '.' && this.state.value.includes('.'))
            return;
        const clear = this.state.value === '0' || this.state.clear;
        const current = clear ? '' : this.state.value;
        const value = current + n;

        this.setState({ 
            value, 
            clear: false 
        });

        if (n !== '.') {
            const i = this.state.current;
            const newValue = parseFloat(value);
            const values = [ ...this.state.calc ];
            values[i] = newValue;
            this.setState({ calc: values });
            console.log(values);
        }
    }
    render()
    {
        return(
            <div className="all">
                <article className="content">
                    <section>
                        <Viewer v={this.state.value}/>
                    </section>
                    <section className="buttons">
                        <div>
                            <Btn v="9" click={this.addDigit}/>
                            <Btn v="8" click={this.addDigit}/>
                            <Btn v="7" click={this.addDigit}/>
                            <Btn v="6" click={this.addDigit}/>
                            <Btn v="5" click={this.addDigit}/>
                            <Btn v="4" click={this.addDigit}/>
                            <Btn v="3" click={this.addDigit}/>
                            <Btn v="2" click={this.addDigit}/>
                            <Btn v="1" click={this.addDigit}/>
                            <Btn v="0" click={this.addDigit}/>
                            <Btn v="." click={this.addDigit}/>
                        </div>
                        <div>
                            <Btn v={"AC"} click={() => this.clear()}/>
                            <Btn v={"+"} click={this.setOperation}/>
                            <Btn v={"-"} click={this.setOperation}/>
                            <Btn v={"*"} click={this.setOperation}/>
                            <Btn v={"/"} click={this.setOperation}/>
                            <Btn v={"%"} click={this.setOperation}/>
                            <Btn v={"x"} click={this.setOperation}/>
                            <Btn v={"x²"} click={this.setOperation}/>
                            <Btn v={"x³"} click={this.setOperation}/>
                            <Btn v={"√"} click={this.setOperation}/>
                            <Btn v={"±"} click={this.setOperation}/>
                        </div>
                    </section>
                </article>
            </div>
        );
    }
}