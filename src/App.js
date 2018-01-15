import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { post, ResponseHandlerBuilder } from './api'

class App extends Component {
  handleClick() {
    const handler = new ResponseHandlerBuilder((response, data) => {
      console.log(response)
    }).build()

    return post('/foo', {}, handler)
  }

  render() {
    return (
      <div onClick={() => this.handleClick()}>
        click me
      </div>
    );
  }
}

export default App;
