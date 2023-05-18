import React, {Component} from 'react';
import {G2GaugeChart} from "../../src";

export default class GaugeChartPage extends Component {

    render() {
        const config = {
            percent: 0.75,
            range: {
                color: 'l(0) 0:#B8E1FF 1:#3D76DD',
            },
            startAngle: Math.PI,
            endAngle: 2 * Math.PI,
            indicator: null,
            statistic: {
                title: {
                    offsetY: -36,
                    style: {
                        fontSize: '36px',
                        color: '#4B535E',
                    },
                    formatter: () => '70%',
                },
                content: {
                    style: {
                        fontSize: '24px',
                        lineHeight: '44px',
                        color: '#4B535E',
                    },
                    formatter: () => '加载进度',
                },
            },
        };

        return (
            <div className="gauge-chart">
                <G2GaugeChart {...config} />
            </div>
        )
    }
}
