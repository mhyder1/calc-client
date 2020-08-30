import React from 'react'
import ReactDOM from 'react-dom';
import { Button } from "./Components/Button";
import { ClearButton } from "./Components/ClearButton";
import App from './App';

it('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('Button renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('ClearButton renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ClearButton />, div);
    ReactDOM.unmountComponentAtNode(div);
});