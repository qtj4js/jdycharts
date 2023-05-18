import { AreaOptions as G2plotConfig } from '@antv/g2plot';
import React from 'react';
import { BaseConfig } from "../../interface";
export interface AreaConfig extends Omit<G2plotConfig, 'tooltip'>, BaseConfig<G2plotConfig> {
}
declare const G2AreaChart: React.ForwardRefExoticComponent<AreaConfig & React.RefAttributes<unknown>>;
export default G2AreaChart;
