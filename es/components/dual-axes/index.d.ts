import { DualAxesOptions as G2plotConfig } from '@antv/g2plot';
import React from 'react';
import { BaseConfig } from '../../interface';
export interface DualAxesConfig extends Omit<G2plotConfig, 'tooltip'>, BaseConfig<G2plotConfig> {
}
declare const G2DualAxesChart: React.ForwardRefExoticComponent<DualAxesConfig & React.RefAttributes<unknown>>;
export default G2DualAxesChart;
