import React, {Component} from 'react';
import {G2LiquidChart} from "../../src";

export default  class LiquidChartPage extends Component {
    render() {
        const config = {
            percent: 0.25,
            outline: {
                border: 4,
                distance: 8,
            },
            wave: {
                length: 128,
            },
        };
        return <G2LiquidChart {...config} />
    }
}
