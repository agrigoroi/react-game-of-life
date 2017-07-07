import * as React from 'react';
import { Map } from 'immutable';
import GameState from './conways-game-of-life/GameState';
import * as Select from 'react-select';

const examples = Map({
    'Blinker': GameState.parse('0,1;1,1;2,1', ';'),
    'Beacon': GameState.parse('1,1;2,1;1,2;4,3;3,4;4,4', ';'),
    'Glider': GameState.parse('1,0;2,1;0,2;1,2;2,2', ';'),
    'Combination': GameState.parse('0,12;1,12;2,12;1,6;2,7;0,8;1,8;2,8', ';'),
    'Gosper Glider Gun': GameState.parse('5,1;5,2;6,1;6,2;5,11;6,11;7,11;' +
        '4,12;3,13;3,14;8,12;9,13;9,14;6,15;4,16;5,17;6,17;7,17;' +
        '6,18;8,16;3,21;4,21;5,21;3,22;4,22;5,22;2,23;6,23;1,25;' +
        // tslint:disable-next-line:align
        '2,25;6,25;7,25;3,35;4,35;3,36;4,36', ';')
});

const options = examples.map(function (_, label) {
    return { value: label, label };
}).toArray();

interface ExampleSelectProps {
    onChange: (newState: GameState) => void;
}

export default class ExampleSelect extends React.Component<ExampleSelectProps, {}> {
    render() {
        return (
            <Select
                name="Example Select"
                searchable={false}
                options={options}
                onChange={(ex) => {
                    if (ex instanceof Array) {
                        ex = ex[0];
                    }
                    if (ex && ex.label) {
                        this.props.onChange(examples.get(ex.label));
                    }
                }}
            />
        );
    }
}