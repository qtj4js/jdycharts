import { ScatterOptions as G2plotConfig } from '@antv/g2plot';
import React from 'react';
import { BaseConfig } from '../../interface';
export interface ScatterConfig extends Omit<G2plotConfig, 'tooltip'>, BaseConfig<G2plotConfig> {
}
declare const G2ScatterChart: React.ForwardRefExoticComponent<ScatterConfig & React.RefAttributes<unknown>>;
export default G2ScatterChart;
