// @ts-nocheck
import React, { useRef, createRef } from 'react';
import { create } from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks/server';
import { render } from '../../src/utils';
import { act } from 'react-dom/test-utils';
import Bullet from '../../src/components/bullet';

const refs = renderHook(() => useRef());

describe('Bullet render', () => {
  let container;
  const data = [
    {
      title: '满意度',
      ranges: [100],
      measures: [80],
      target: 85,
    },
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
    const testRenderer = create(<Bullet {...props} />);
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
    const testRenderer = create(<Bullet {...props} />);
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
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      pixelRatio: 1,
      autoFit: false,
      width: 200,
      height: 160,
    };
    act(() => {
      render(<Bullet {...props} {...chartProps} />, container);
    });
    expect(chartRef).not.toBeUndefined();
    const canvas = container.querySelector('canvas');
    expect(canvas.width).toBe(200);
    expect(canvas.height).toBe(160);
    expect(chartRef.chart.getData()).toEqual([
      { rKey: 'ranges_0', title: '满意度', ranges: 100 },
      { mKey: 'measures', title: '满意度', measures: 80 },
      { tKey: 'target', title: '满意度', target: 85 },
    ]);
  });

  it('chartRef with createRef', () => {
    const chartRef = createRef();
    const props = {
      className: 'container',
      chartRef,
    };
    const chartProps = {
      data,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      pixelRatio: 1,
      autoFit: false,
      width: 200,
      height: 160,
    };
    act(() => {
      render(<Bullet {...props} {...chartProps} />, container);
    });
    expect(chartRef.current.chart.getData()).toEqual([
      { rKey: 'ranges_0', title: '满意度', ranges: 100 },
      { mKey: 'measures', title: '满意度', measures: 80 },
      { tKey: 'target', title: '满意度', target: 85 },
    ]);
  });

  it('chartRef with useRef', () => {
    const props = {
      className: 'container',
    };
    const chartProps = {
      data,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      pixelRatio: 1,
      autoFit: false,
      width: 200,
      height: 160,
    };
    act(() => {
      render(<Bullet {...props} {...chartProps} ref={refs} />, container);
    });
    expect(refs.current.getChart().chart.getData()).toEqual([
      { rKey: 'ranges_0', title: '满意度', ranges: 100 },
      { mKey: 'measures', title: '满意度', measures: 80 },
      { tKey: 'target', title: '满意度', target: 85 },
    ]);
  });
});
