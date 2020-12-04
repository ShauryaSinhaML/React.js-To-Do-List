class VisibleToggle extends React.Component {
    constructor(props){
        super(props);
        this.visibility = this.visibility.bind(this);

        this.state = {
            visible: false
        }
    }
    visibility(){
        this.setState(() => {
            return {
                visible: !(this.state.visible)
            };
        });
    }
    render() {
        return (
            <div>
                <h1>VisibleToggle</h1>
                <button onClick={this.visibility}>{this.state.visible ? 'Hide' : 'Show'}</button>
                {this.state.visible && (
                    <div>
                        <p>Hey </p>
                    </div>
                )}
            </div>
        );
    }
}

ReactDOM.render(<VisibleToggle />, document.getElementById('app'));