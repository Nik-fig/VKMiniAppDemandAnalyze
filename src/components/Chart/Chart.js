import {Component} from 'react';

import 'zingchart/es6';
import ZingChart from 'zingchart-react';

import {config} from './config';

export class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: config,
            series: [{
                values: []
            }]
        }
    }

    render() {

        return (
            <ZingChart
                data={this.state.config}
                series={this.state.series}
            />
        )
    }
}