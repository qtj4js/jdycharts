import { Line as G2plotLine, LineOptions as G2plotConfig } from '@antv/g2plot';
import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { BaseConfig } from '../../interface';
import useG2Charts from "../../hooks/useG2Charts";
import { getChart } from "../../utils/getCharts";

export interface LineConfig extends Omit<G2plotConfig, 'tooltip'>, BaseConfig<G2plotConfig> {};

const G2LineChart = forwardRef((props: LineConfig, ref) => {
    const {
        chartRef,
        style = {
            height: 'inherit',
        },
        className,
        ...rest
    } = props;

    const { chart, container } = useG2Charts<G2plotLine, LineConfig>(G2plotLine, rest);
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

export default G2LineChart;
