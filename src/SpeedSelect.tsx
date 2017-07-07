import * as React from 'react';
import RangeInput from './RangeInput';

interface SpeedSelectProps {
    isRunning: boolean;
    onPause: () => void;
    onResume: () => void;
    speed: number;
    onSpeedChange: (speed: number) => void;
}

export default class SpeedSelect extends React.Component<SpeedSelectProps, {}> {
    render() {
        const button = () => {
            if (this.props.isRunning) {
                return <button onClick={this.props.onPause}>Pause</button>;
            } else {
                return <button onClick={this.props.onResume}>Resume</button>;
            }
        };

        return (
            <div>
                <RangeInput
                    label="Game Speed"
                    value={this.props.speed}
                    min={50}
                    max={2000}
                    onChange={(speed) => this.props.onSpeedChange(speed)}
                    step={50}
                />
                {button()}
            </div>
        );
    }
}