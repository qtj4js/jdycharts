import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { Bullet as G2plotBullet, BulletOptions as G2plotConfig } from '@antv/g2plot';
import { BaseConfig } from '../../interface';
import useG2Charts from "../../hooks/useG2Charts";
import { getChart } from '../../utils/getCharts';

export interface BulletConfig extends Omit<G2plotConfig, 'tooltip'>, BaseConfig<G2plotConfig> {}

const G2BulletChart = forwardRef((props: BulletConfig, ref) => {
    const {
        chartRef,
        style = {
            height: 'inherit',
        },
        className,
        ...rest
    } = props;
    const { chart, container } = useG2Charts<G2plotBullet, BulletConfig>(G2plotBullet, rest);
    useEffect(() => {
        getChart(chartRef, chart.current);
    }, [chart.current]);
    useImperativeHandle(ref, () => ({
        getChart: () => chart.current,
    }));

    return (
        <div className={className} style={style} ref={container} />
    )
})

export default G2BulletChart;
