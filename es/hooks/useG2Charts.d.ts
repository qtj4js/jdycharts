import { BaseConfig, AllBaseConfig } from "../interface";
import { Plot } from '@antv/g2plot';
interface Base extends BaseConfig<AllBaseConfig> {
    data?: any;
    value?: number;
    /** Gauge、Liquid、Progress、RingProgress */
    percent?: number;
}
declare const useInit: <T extends Plot<any>, U extends Base>(ChartClass: any, config: U) => {
    chart: import("react").MutableRefObject<T | undefined>;
    container: import("react").RefObject<HTMLDivElement>;
};
export default useInit;
