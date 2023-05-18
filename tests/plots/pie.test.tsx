// @ts-nocheck
import React, { useRef, createRef } from 'react';
import { create } from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks/server';
import { render } from '../../src/utils';
import { act } from 'react-dom/test-utils';
import Pie from '../../src/components/pie';
import ChartLoading from '../../src/utils/createLoading';
import ErrorBoundary from '../../src/errorBoundary';

const refs = renderHook(() => useRef());

describe('Pie render', () => {
  let container;
  const data = [
    { type: '分类一', value: 27 },
    { type: '分类二', value: 25 },
  ];
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
    const testRenderer = create(<Pie {...props} />);
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
    const testRenderer = create(<Pie {...props} />);
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
      data,
      angleField: 'value',
      colorField: 'type',
      pixelRatio: 1,
      autoFit: false,
      width: 200,
      height: 160,
    };
    act(() => {
      render(<Pie {...props} {...chartProps} />, container);
    });
    expect(chartRef).not.toBeUndefined();
    const canvas = container.querySelector('canvas');
    expect(canvas.width).toBe(200);
    expect(canvas.height).toBe(160);
    expect(chartRef.chart.getData()).toEqual(data);
  });

  it('chartRef with createRef', () => {
    const chartRef = createRef();
    const props = {
      className: 'container',
      chartRef,
    };
    const chartProps = {
      data,
      angleField: 'value',
      colorField: 'type',
      pixelRatio: 1,
      autoFit: false,
      width: 200,
      height: 160,
    };
    act(() => {
      render(<Pie {...props} {...chartProps} />, container);
    });
    expect(chartRef.current.chart.getData()).toEqual(data);
  });

  it('chartRef with useRef', () => {
    const props = {
      className: 'container',
    };
    const chartProps = {
      data,
      angleField: 'value',
      colorField: 'type',
      pixelRatio: 1,
      autoFit: false,
      width: 200,
      height: 160,
    };
    act(() => {
      render(<Pie {...props} {...chartProps} ref={refs} />, container);
    });
    expect(refs.current.getChart().chart.getData()).toEqual(data);
  });
});
