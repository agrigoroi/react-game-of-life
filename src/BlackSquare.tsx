import * as React from 'react';

interface BlackSquareProps {
    top: number;
    left: number;
    size: number; // in pixels
}

export default class BlackSquare extends React.Component<BlackSquareProps, {}> {
    render() {
        return (
            <span
                style={{
                    background: 'black',
                    position: 'absolute' as 'absolute',
                    top: this.props.top,
                    left: this.props.left,
                    height: this.props.size,
                    width: this.props.size
                }}
            />
        );
    }
}