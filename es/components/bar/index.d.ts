import React from 'react';
import { BarOptions as G2plotConfig } from '@antv/g2plot';
import { BaseConfig } from '../../interface';
export interface BarConfig extends Omit<G2plotConfig, 'tooltip'>, BaseConfig<G2plotConfig> {
}
declare const G2BarChart: React.ForwardRefExoticComponent<BarConfig & React.RefAttributes<unknown>>;
export default G2BarChart;
