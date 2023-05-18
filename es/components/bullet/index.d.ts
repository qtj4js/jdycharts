import React from 'react';
import { BulletOptions as G2plotConfig } from '@antv/g2plot';
import { BaseConfig } from '../../interface';
export interface BulletConfig extends Omit<G2plotConfig, 'tooltip'>, BaseConfig<G2plotConfig> {
}
declare const G2BulletChart: React.ForwardRefExoticComponent<BulletConfig & React.RefAttributes<unknown>>;
export default G2BulletChart;
