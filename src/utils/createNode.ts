import React from 'react';
import ReactDOM from 'react-dom';
import {getUUID} from "./utils";

const TOOLTIP_CONTAINER_MAPPING = new Map();

const createNode = (children: React.ReactElement, type?: string, uuid?: string) => {
    let mountPoint = document.createElement('div');
    if (type === 'tooltip') {
        mountPoint.setAttribute('data-uuid', uuid || getUUID());
        if (TOOLTIP_CONTAINER_MAPPING.has(uuid)) {
            mountPoint = TOOLTIP_CONTAINER_MAPPING.get(uuid);
        } else {
            TOOLTIP_CONTAINER_MAPPING.set(uuid, mountPoint);
        }
        mountPoint.className = 'g2-tooltip';
    }
    ReactDOM.render(children as React.ReactElement<any, any>, mountPoint);
    return mountPoint;
};

export default createNode;
