import React, { Component } from "react";
import "./App.css";
import "./Input.css";
import { Button } from "./Components/Button";
import { ClearButton } from "./Components/ClearButton";
import config from './config'
import Autocomplete from 'react-autocomplete'
import { v4 as uuidv4 } from 'uuid';

import * as math from 'mathjs';

class App extends Component {
    state = {
      input: "",
      problems: []
    };

  getProblems = () => {
    fetch(`${config.API_ENDPOINT}/problems`)
      .then(res => {
          if (!res.ok) {
              return res.json().then(e => Promise.reject(e));
          }
          return res.json();
      })
      .then((problems) => {
        problems = problems.filter(prob => prob.id !== 0)
        this.setState({problems: problems.length ? [...new Set(problems)] : [{id:0,problem: 'No available problems'}]})
      })
      .catch(error => {
          console.error({error});
      });
  }

  componentDidMount() {
    this.getProblems()
  }

  addToInput = val => {
    this.setState({ input: this.state.input + val });
  };

  postProblem = (problem) => {
      if(this.state.problems.some(prob => prob.problem === problem)) return

        fetch(`${config.API_ENDPOINT}/problems`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({problem})
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e));
            }
            return res.json();
        })
        .then((problem) => {
          let newProblems = [...this.state.problems, problem]
          newProblems.shift()
          console.log(newProblems)
          this.setState({problems:[...newProblems]})
        })
        .catch(error => {
            console.error({error});
        });
  }

  handleEqual = () => {
    this.setState({ input: `${math.evaluate(this.state.input)}`})
    this.postProblem(this.state.input)
  }

  handleSelect = (val) => {
    if(val === 'No available problems') return
    this.setState({input: val})
  }

  handleChange = (e) => {
    this.setState({input: e.target.value})
  }

  deleteProblem = (e, id) => {
    fetch(`${config.API_ENDPOINT}/problems/${id}`, {
      method: 'DELETE',
      headers: {
          'content-type': 'application/json'
      },
  })
      .then(() => {
        this.setState({input: ''})
          this.getProblems()
      })
      .catch(error => {
          console.error({error})
      });
  }

  render() {
    let { input } = this.state
    return (
      <div className="app">
        <div className="calc-wrapper">
        <Autocomplete
          className="input"
          getItemValue={(item) => item.problem}
          items={this.state.problems}
          renderItem={(item, isHighlighted) =>
            <div key={uuidv4()} className="dropdown"  style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              {item.problem}
              {
                item.id > 0 &&<button onClick={(e) => this.deleteProblem(e, item.id)}>delete</button>
              }
            </div>
          }
          value={input}
          onChange={(e) => this.handleChange(e)}
          onSelect={(val) => this.handleSelect(val)}
        />

         <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={this.addToInput}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={this.addToInput}>*</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={this.addToInput}>+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>.</Button>
            <Button handleClick={this.addToInput}>0</Button>
            <Button handleClick={() => this.handleEqual()}>=</Button>
            <Button handleClick={this.addToInput}>-</Button>
          </div>
          <div className="row">
            <ClearButton handleClear={() => this.setState({ input: "" })}>
              Clear
            </ClearButton>
          </div>
        </div>
      </div>
    );
  }
}

export default App;