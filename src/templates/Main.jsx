import React from 'react';
import './Main.css';
import Viewer from './calc/Viewer';
import Btn from './calc/Btn';

const initial = {
    value: '0',
    clear: false,
    operation: null,
    calc: [0,0],
    current: 0,
    memory: '0'
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
        if (this.state.current === 0) {
            this.setState({
                operation, 
                current: 1, 
                clear: true
            });
        } else {
            const equals = (operation === '=') || (operation === 'sqrt');
            const curOperation = this.state.operation;

            const calc = [...this.state.calc];

            switch(curOperation){
                case '+':
                    calc[0] = calc[0] + calc[1];
                    break;
                case 'x':
                        calc[0] = calc[0] * calc[1];
                        break;
                case '-':
                        calc[0] = calc[0] - calc[1];
                        break;
                case '/':
                        calc[0] = calc[0] / calc[1];
                        break;
                case 'pow':
                        calc[0] = Math.pow(calc[0], calc[1]);
                        break;
                case 'sqrt':
                        let value = this.state.value;
                        calc[0] = Math.sqrt(value);
                        break;
                case '=':
                    try{
                        calc[0] = eval(`${calc[0]}${curOperation}${calc[1]}`);
                    } catch {
                        calc[0] = this.state.calc[0]; 
                    }
                    break;
                default:
                    calc[0] = calc[0] + calc[1];
                    break;
            }
            calc[1] = 0;
            this.setState({
                value: calc[0],
                calc,
                operation: equals? null : operation,
                current: equals? 0 : 1,
                clear: !equals
            });
        }
    }
    addDigit(n)
    {
        if (n === '.' && this.state.value.includes('.'))
            return;
        if (n === '+/-') {
            let value = this.state.value;
            value *= -1;
            let current = this.state.current;
            let calc = [ ...this.state.calc ];
            calc[current] = value;
            this.setState({ 
                value, 
                calc
            });
            return;
        }
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
            const calc = [ ...this.state.calc ];
            calc[i] = newValue;
            this.setState({ calc: calc });
        }
    }
    ce()
    {
        const calc = [ ...this.state.calc];
        const current = this.state.current;
        calc[current] = 0;
        this.setState({
            calc,
            value: '0'
        });
    }
    memory()
    {
        var memory = this.state.memory;
        switch(memory){
            case '0':
                memory = this.state.value;
                this.setState({ memory });
            break;
            default:
                this.ce();
                const calc = [ ...this.state.calc];
                const current = this.state.current;   
                calc[current] = memory;
                this.setState({
                    value: memory,
                    calc, 
                    memory: '0'
                });
                break;
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
                        <div className="numbers">
                            <Btn v="7" click={this.addDigit}/>
                            <Btn v="8" click={this.addDigit}/>
                            <Btn v="9" click={this.addDigit}/>
                            <Btn v="4" click={this.addDigit}/>
                            <Btn v="5" click={this.addDigit}/>
                            <Btn v="6" click={this.addDigit}/>
                            <Btn v="3" click={this.addDigit}/>
                            <Btn v="2" click={this.addDigit}/>
                            <Btn v="1" click={this.addDigit}/>
                            <Btn v="." click={this.addDigit}/>
                            <Btn v="0" click={this.addDigit}/>
                            <Btn v={"+/-"} click={this.addDigit}/>
                        </div>
                        <div className="operations">
                            <Btn v={"AC"} click={() => this.clear()}/>
                            <Btn v={"CE"} click={() => this.ce()}/>
                            <Btn v={"M"} click={() => this.memory()}/>
                            <Btn v={"pow"} click={this.setOperation}/>
                            <Btn v={"sqrt"} click={this.setOperation}/>
                            <Btn v={"-"} click={this.setOperation}/>
                            <Btn v={"x"} click={this.setOperation}/>
                            <Btn v={"/"} click={this.setOperation}/>
                            <Btn v={"+"} click={this.setOperation}/>
                            <Btn v={"="} click={this.setOperation}/>

                        </div>
                    </section>
                </article>
            </div>
        );
    }
}