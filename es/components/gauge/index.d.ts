import { GaugeOptions as G2plotConfig } from '@antv/g2plot';
import React from "react";
import { BaseConfig } from '../../interface';
export interface GaugeConfig extends Omit<G2plotConfig, 'tooltip'>, BaseConfig<G2plotConfig> {
}
declare const G2GaugeChart: React.ForwardRefExoticComponent<GaugeConfig & React.RefAttributes<unknown>>;
export default G2GaugeChart;
