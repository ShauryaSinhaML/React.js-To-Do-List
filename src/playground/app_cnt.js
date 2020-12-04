class Counter extends React.Component {
    constructor(props){
        super(props);
        this.addOne = this.addOne.bind(this);
        this.subOne = this.subOne.bind(this);
        this.resetCount = this.resetCount.bind(this);

        this.state = {
            count: 0
        };
    }
    addOne(){
        this.setState(() => {
            return {
                count: this.state.count +1
            };
        });
    }
    subOne(){
        this.setState(() => {
            return {
                count: this.state.count -1
            };
        });
    }
    resetCount(){
        this.setState(() => {
            return {
                count: 0
            };
        });
    }
    render(){
        return (
            <div>
            <h1>Count: {this.state.count}</h1>
            <button onClick={this.addOne}>+1</button>
            <button onClick={this.subOne}>-1</button>
            <button onClick={this.resetCount}>reset</button>
            </div>
        );
    }
}

ReactDOM.render(<Counter />, document.getElementById('app'));