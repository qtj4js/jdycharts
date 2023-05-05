import { Gauge as G2plotGauge, GaugeOptions as G2plotConfig } from '@antv/g2plot';
import React, {forwardRef, useEffect, useImperativeHandle} from "react";
import { BaseConfig } from '../../interface';
import useG2Charts from "../../hooks/useG2Charts";
import { getChart } from "../../utils/getCharts";


export interface GaugeConfig extends Omit<G2plotConfig, 'tooltip'>, BaseConfig<G2plotConfig> {};

const G2GaugeChart = forwardRef((props: GaugeConfig, ref) => {
    const {
        chartRef,
        style = {
            height: 'inherit',
        },
        className,
        ...rest
    } = props;

    const { chart, container } = useG2Charts<G2plotGauge, GaugeConfig>(G2plotGauge, rest);
    useEffect(() => {
        getChart(chartRef, chart.current);
    }, [chart.current]);
    useImperativeHandle(ref, () => ({
        getChart: () => chart.current,
    }));

    return (
        <div className={className} style={style} ref={container} />
    )
});

export default G2GaugeChart;
