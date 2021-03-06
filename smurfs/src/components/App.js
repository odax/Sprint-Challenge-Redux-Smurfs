import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import { addSmurf, loadData } from '../actions';
import SmurfCard from './SmurfCard';
/*
 to wire this component up you're going to need a few things.
 I'll let you do this part on your own. 
 Just remember, `how do I `connect` my components to redux?`
 `How do I ensure that my component links the state to props?`
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_name: '',
      input_age: '',
      input_height: ''
    }
  }

  componentWillMount = () => {
    this.props.loadData();
  }

  handleChangeName = (e) => {
    this.setState({
      input_name: e.target.value
    });
  }
  handleChangeAge = (e) => {
    this.setState({
      input_age: e.target.value
    });
  }
  handleChangeHeight = (e) => {
    this.setState({
      input_height: e.target.value
    });
  }

  submitSmurf = () => {
    const currentSmurf = this.state;
    this.props.addSmurf(currentSmurf.input_name, currentSmurf.input_age, currentSmurf.input_height);
    this.setState({
      input_name: '',
      input_age: '',
      input_height: ''
    });
  }

  render() {
    return (
      <div className="App">
        <h2>Type in a new smurf:</h2>
        <p>Name:</p><input
          value={this.state.input_name}
          onChange={this.handleChangeName}/>
        <p>Age:</p>          
                  <input
          value={this.state.input_age}
          onChange={this.handleChangeAge}/>
        <p>Height:</p>          
                  <input
          value={this.state.input_height}
          onChange={this.handleChangeHeight}/><br/>
        <button onClick={this.submitSmurf}>Submit</button>
        <ul>
          {this.props.smurfList.map( (smurf) => {
            const {id, name, age, height} = smurf;
              return (
                 <SmurfCard key={id} id={id} index={id} name={name} age={age} height={height} />
              )
            })
          }
          {/* {console.log('yoooooo', this.props.smurfList)}; */}
        </ul>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    smurfList: state.smurfs
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     submitNewSmurf:(smurf) => {
//       dispatch(addSmurf(smurf))
//     }
//   }
// }

const Container = connect(mapStateToProps, {addSmurf, loadData})(App);
export default Container;