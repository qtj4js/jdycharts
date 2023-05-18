import { BaseConfig, AllBaseConfig } from "../interface";
import {useRef, useEffect} from "react";
import {hasPath, setPath, isType, getUUID} from "../utils";
import createNode from "../utils/createNode";
import {G2, Plot} from '@antv/g2plot';
import { isEqual, get, cloneDeep, clone } from "../utils/lodash";

interface Base extends BaseConfig<AllBaseConfig> {
    data?: any;
    value?: number;
    /** Gauge、Liquid、Progress、RingProgress */
    percent?: number;
}

const useInit = <T extends Plot<any>, U extends Base>(ChartClass: any, config: U) => {
    const chart = useRef<T>();
    const chartOptions = useRef<U>();
    const container = useRef<HTMLDivElement>(null);
    const { onReady, onEvent } = config;

    const reactDomToString = (source: U, path: string[], type?: string, _uuid?: string) => {
        const statisticCustomHtml = hasPath(source, path);
        setPath(source, path, (...arg: any[]) => {
            const statisticDom = isType(statisticCustomHtml, 'Function') ? statisticCustomHtml(...arg) : statisticCustomHtml;
            if (isType(statisticDom, 'String') || isType(statisticDom, 'Number') || isType(statisticDom, 'HTMLDivElement')) {
                return statisticDom;
            }
            return createNode(statisticDom, type, _uuid);
        });
    };

    const processConfig = () => {
        const _uuid = getUUID();
        // statistic
        if (hasPath(config, ['statistic', 'content', 'customHtml'])) {
            reactDomToString(config, ['statistic', 'content', 'customHtml']);
        }
        if (hasPath(config, ['statistic', 'title', 'customHtml'])) {
            reactDomToString(config, ['statistic', 'title', 'customHtml']);
        }
        // tooltip
        if (typeof config.tooltip === 'object') {
            if (hasPath(config, ['tooltip', 'container'])) {
                reactDomToString(config, ['tooltip', 'container'], 'tooltip', _uuid);
            }
            if (hasPath(config, ['tooltip', 'customContent'])) {
                reactDomToString(config, ['tooltip', 'customContent'], 'tooltip', _uuid);
            }
        }
    };

    useEffect(() => {
        if (chart.current && !isEqual(chartOptions.current, config)) {
            let changeData = false;
            if (chartOptions.current) {
                // 从 options 里面取出 data 、value 、 percent 进行比对，判断是否仅数值发生改变
                const {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    data: currentData, value: currentValue, percent: currentPercent,
                    ...currentConfig
                } = chartOptions.current;
                // eslint-disable-next-line
                const { data: inputData, value: inputValue, percent: inputPercent, ...inputConfig } = config;
                changeData = isEqual(currentConfig, inputConfig);
            }
            chartOptions.current = cloneDeep(config);
            if (changeData && get(config, 'chartType') !== 'Mix') {
                let changeType = 'data';
                const typeMaps = ['percent']; // 特殊类型的图表 data 字段，例如 RingProgress
                const currentKeys = Object.keys(config);
                typeMaps.forEach((type: string) => {
                    if (currentKeys.includes(type)) {
                        changeType = type;
                    }
                });
                chart.current.changeData(get(config, [changeType]) || []);
                chart.current.render();
            } else {
                processConfig();
                chart.current.update(config);
            }
        }
    }, [config]);

    useEffect(() => {
        if (!container.current) {
            return () => null;
        }
        if (!chartOptions.current) {
            chartOptions.current = cloneDeep(config);
        }
        processConfig();
        const chartInstance: T = new (ChartClass as any)(container.current, {
            ...config,
        });
        chartInstance.render();
        chart.current = clone(chartInstance) as T;
        if (onReady) {
            onReady(chartInstance);
        }
        const handler = (event: G2.Event) => {
            if (onEvent) {
                onEvent(chartInstance, event);
            }
        };
        chartInstance.on('*', handler);

        // 组件销毁时销毁图表
        return () => {
            if (chart.current) {
                chart.current.destroy();
                chart.current.off('*', handler);
                chart.current = undefined;
            }
        };
    }, []);

    return {
        chart,
        container,
    };
};

export default useInit;


