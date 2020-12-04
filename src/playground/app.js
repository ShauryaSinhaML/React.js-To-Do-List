
class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOpt = this.handleDeleteOpt.bind(this);
        this.state = {
            options: props.options
        };
    }
    componentDidMount (){
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if(options){
                this.setState(() => ({ options: options }));
            }
        } catch (e) {
            // Do nothing at all;
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
            console.log("saving Data");
        }
    }
    componentWillUnmount (){
        console.log("componentWillUnmount");
    }
    handleDeleteOption(){
        this.setState(()=> ({ options: [] }));
    }
    handleDeleteOpt(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }
    handlePick(){
        alert( this.state.options[Math.floor(Math.random() * this.state.options.length)]);
    }
    handleAddOption(option){
        if(!option){
            return 'Enter valid value to add item';
        }
        else if(this.state.options.indexOf(option) > -1){
            return 'this option alresy exits';
        }
        this.setState((prevState)=>({ options: prevState.options.concat(option) }));
    }
    render(){
        const title = 'Indecision';
        const subtitle = 'Put your life in th hands of a computer';

        return (
            <div>
                <Header  subtitle={subtitle}/>
                <Action 
                    hasOptions={this.state.options.length >0}
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOption={this.handleDeleteOption}
                    handleDeleteOpt={this.handleDeleteOpt}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
};

const Header = (props) =>{
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
};

Header.defaultProps = {
    title: 'Indecision'
};

const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >
            What should I do?
            </button>
        </div>
    );
};

const Option = (props) => {
    return (
        <div>
            <li>{props.optionText}</li>
            <button 
                onClick={(e) => {
                    props.handleDeleteOpt(props.optionText);
                }}
            >
                remove
            </button>
        </div>
    );
};


const Options = (props) => {
    return (
        <div>
            <ol>
                {
                    props.options.map((option) => (
                        <Option 
                            key={option} 
                            optionText={option}
                            handleDeleteOpt={props.handleDeleteOpt}
                        />
                    ))
                }
            </ol>
            {props.options.length === 0 && <p>Please enter an option</p>}
            <button onClick={props.handleDeleteOption}>Remove All</button>
        </div>
    );
};


class AddOption extends React.Component {
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    handleAddOption(e){
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        this.setState(()=>({ error }));
        if(!error){
            e.target.elements.option.value='';
        }
    }
    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type='text' name="option"></input>
                    <button>Add new Option</button>
                </form>
            </div>
        );
    }
}


ReactDOM.render(<IndecisionApp options={['Devils den', 'first']}/>, document.getElementById('app'))