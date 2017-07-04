import * as React from 'react';

interface BlackSquareProps {
    top: number;
    left: number;
    height: number; // in pixels
    width: number;
}

export default class BlackSquare extends React.Component<BlackSquareProps, {}> {
    render() {
        const style = {
            background: 'black',
            position: 'absolute' as 'absolute',
            top: this.props.top,
            left: this.props.left,
            height: this.props.height,
            width: this.props.width
        };

        return <div style={style} />;
    }
}