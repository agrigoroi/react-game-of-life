import * as React from 'react';
import './BlackSquare.css';

interface BlackSquareProps {
    top: number;
    left: number;
    size: number; // in pixels
}

export default class BlackSquare extends React.Component<BlackSquareProps, {}> {
    render() {
        return (
            <span
                className="black-square"
                style={{
                    top: this.props.top,
                    left: this.props.left,
                    height: this.props.size,
                    width: this.props.size
                }}
            />
        );
    }
}