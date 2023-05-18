import { PieOptions as G2plotConfig } from '@antv/g2plot';
import React from 'react';
import { BaseConfig } from '../../interface';
export interface PieConfig extends Omit<G2plotConfig, 'tooltip'>, BaseConfig<G2plotConfig> {
}
declare const G2PieChart: React.ForwardRefExoticComponent<PieConfig & React.RefAttributes<unknown>>;
export default G2PieChart;
