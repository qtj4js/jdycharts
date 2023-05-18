import { FunnelOptions as G2plotConfig } from '@antv/g2plot';
import React from 'react';
import { BaseConfig } from '../../interface';
export interface FunnelConfig extends Omit<G2plotConfig, 'tooltip'>, BaseConfig<G2plotConfig> {
}
declare const G2FunnelChart: React.ForwardRefExoticComponent<FunnelConfig & React.RefAttributes<unknown>>;
export default G2FunnelChart;
