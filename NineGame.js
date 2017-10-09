class App extends React.Component{
	render(){
  	return(
    	<div class="">
    	  <Game />
    	</div>
    );
  };
};


class Game extends React.Component{
	state = {
  	selectedNumbers: [],
    numberStars: 1 + Math.floor(Math.random() * 9),
  };
  selectNumber = (clickedNumber) => {
		if(this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
		this.setState(prevState => ({
    		selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };
	
  unSelectNumber = (clickedNumber) => {
  	this.setState((prevState) => ({
    		selectedNumbers: _.without(prevState.selectedNumbers, clickedNumber)
    }));
  }
  
	render(){
		return(
    	<div className="container">
      	<h3>Play Nine</h3>
        <hr/>
    	  <div className="row">
          <Stars numberStars={this.state.numberStars} />
          <Button selectedNumbers={this.state.selectedNumbers} />
          <Answer selectedNumbers={this.state.selectedNumbers}
          				unSelectNumber={this.unSelectNumber} />
        </div>
        <br />
        <Numbers selectedNumbers={this.state.selectedNumbers} 
        					selectNumber={this.selectNumber} />
    	</div>
    );  
  }
}

const Stars = (props) => {
	//let numberStars = 
  
	return(
  	<div className="col-5">
  	  {_.range(props.numberStars).map(i =>
  		<i key={i} className="fa fa-star" />
  	)}
  	</div>
  );
}

const Button = (props) => {
	const validate = () =>{
  
  }
  
  const getButtonState = () => {
  	console.log(props.selectedNumbers.length);
  	if(props.selectedNumbers.length === 0){ return 'disabled' };
  }
	return(
  	<div className="col-2">
  	  <button className={getButtonState()}>=</button>
  	</div>
  );
}

const Answer = (props) => {
	return(
  		<div style={{display: 'inline-block'}}>
      	{props.selectedNumbers.map((number, i) =>
        	<span key={i} 
          onClick={() => props.unSelectNumber(number)}>{number}</span>
        )} 
  	</div>
  );
}

const Numbers = (props) => {
	const numberClassName = (number) => {
  if(props.selectedNumbers.indexOf(number) >= 0)
  	return 'selected';
  }
	return(
  	<div className="card text-center">
  		<div>
      	{Numbers.list.map((number, i) =>
        	<span key={i} className={numberClassName(number)}
          			onClick={() => props.selectNumber(number)}>
          	{number}
          </span>
        )} 
      </div>
  	</div>
  );
};

Numbers.list = _.range(1, 10);

ReactDOM.render(<App />, mountNode);