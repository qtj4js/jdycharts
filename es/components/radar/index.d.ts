import { RadarOptions as G2plotConfig } from '@antv/g2plot';
import React from 'react';
import { BaseConfig } from '../../interface';
export interface RadarConfig extends Omit<G2plotConfig, 'tooltip'>, BaseConfig<G2plotConfig> {
}
declare const G2RadarChart: React.ForwardRefExoticComponent<RadarConfig & React.RefAttributes<unknown>>;
export default G2RadarChart;
