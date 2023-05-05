import {Area as G2plotArea, AreaOptions as G2plotConfig} from '@antv/g2plot';
import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { getChart } from "../../utils/getCharts";
import useG2Charts from "../../hooks/useG2Charts";
import {BaseConfig} from "../../interface";

export interface AreaConfig extends Omit<G2plotConfig, 'tooltip'>, BaseConfig<G2plotConfig> {};

const G2AreaChart = forwardRef((props: AreaConfig, ref) => {
    const {
        chartRef,
        style = {
            height: 'inherit',
        },
        className,
        ...rest
    } = props;

    const { chart, container } = useG2Charts<G2plotArea, AreaConfig>(G2plotArea, rest);
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

export default G2AreaChart;
