// @ts-nocheck
import React, { useRef, createRef } from 'react';
import { create } from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks/server';
import { render } from '../../src/utils';
import { act } from 'react-dom/test-utils';
import Gauge from '../../src/components/gauge';
import ChartLoading from '../../src/utils/createLoading';
import ErrorBoundary from '../../src/errorBoundary';

const refs = renderHook(() => useRef());

describe('Gauge render', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('classname * loading * style', () => {
    const props = {
      style: {
        height: '80%',
      },
      className: 'container',
      loading: true,
    };
    const testRenderer = create(<Gauge {...props} />);
    const renderTree = testRenderer.toTree();
    expect(renderTree.props.className).toBe('container');
    expect(renderTree.props.style).toEqual({
      height: '80%',
    });
    expect(renderTree.nodeType).toBe('host');
    expect(renderTree.type).toBe('div');
  });

  it('classname * loading * style with default', () => {
    const props = {};
    const testRenderer = create(<Gauge {...props} />);
    const renderTree = testRenderer.toTree();
    expect(renderTree.nodeType).toBe('host');
    expect(renderTree.type).toBe('div');
  });

  it('chart render * chartRef with callback', () => {
    let chartRef = undefined;
    const props = {
      className: 'container',
      chartRef: (ref) => {
        chartRef = ref;
      },
    };
    const chartProps = {
      percent: 0.75,
      pixelRatio: 1,
      autoFit: false,
      width: 200,
      height: 160,
    };
    act(() => {
      render(<Gauge {...props} {...chartProps} />, container);
    });
    expect(chartRef).not.toBeUndefined();
    const canvas = container.querySelector('canvas');
    expect(canvas.width).toBe(200);
    expect(canvas.height).toBe(160);
    expect(chartRef.chart.views[0].getData()).toEqual([{ percent: 0.75 }]);
  });

  it('chartRef with createRef', () => {
    const chartRef = createRef();
    const props = {
      className: 'container',
      chartRef,
    };
    const chartProps = {
      percent: 0.75,
      pixelRatio: 1,
      autoFit: false,
      width: 200,
      height: 160,
    };
    act(() => {
      render(<Gauge {...props} {...chartProps} />, container);
    });
    expect(chartRef.current.chart.views[0].getData()).toEqual([{ percent: 0.75 }]);
  });

  it('chartRef with useRef', () => {
    const props = {
      className: 'container',
    };
    const chartProps = {
      percent: 0.75,
      pixelRatio: 1,
      autoFit: false,
      width: 200,
      height: 160,
    };
    act(() => {
      render(<Gauge {...props} {...chartProps} ref={refs} />, container);
    });
    expect(refs.current.getChart().chart.views[0].getData()).toEqual([{ percent: 0.75 }]);
  });
});
