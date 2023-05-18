import React from 'react';
import { ColumnOptions as G2plotConfig } from '@antv/g2plot';
import { BaseConfig } from '../../interface';
export interface ColumnConfig extends Omit<G2plotConfig, 'tooltip'>, BaseConfig<G2plotConfig> {
}
declare const G2ColumnChart: React.ForwardRefExoticComponent<ColumnConfig & React.RefAttributes<unknown>>;
export default G2ColumnChart;
