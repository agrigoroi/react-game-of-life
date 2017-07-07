import * as React from 'react';
import './RangeInput.css';

interface RangeInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

export default class RangeInput extends React.Component<RangeInputProps, {}> {
  render() {
    const self = this;
    return (
      <div className="range-input">
        <label>{this.props.label}</label>
        <input
          type="range"
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          onChange={function (event) {
            self.props.onChange(+event.target.value);
          }}
          step={50}
        />
        <span>{this.props.value}</span>
      </div>
    );
  }
}