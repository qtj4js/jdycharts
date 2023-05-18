import { LineOptions as G2plotConfig } from '@antv/g2plot';
import React from 'react';
import { BaseConfig } from '../../interface';
export interface LineConfig extends Omit<G2plotConfig, 'tooltip'>, BaseConfig<G2plotConfig> {
}
declare const G2LineChart: React.ForwardRefExoticComponent<LineConfig & React.RefAttributes<unknown>>;
export default G2LineChart;
