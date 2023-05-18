import React from 'react';
import {
    HashRouter as Router,
    Route,
    NavLink,
    Redirect
} from 'react-router-dom';
import _ from 'lodash';
import GaugeChartPage from "./gauge";
import LiquidChartPage from "./liquid";
import BulletChartPage from "./bullet";


export default class PlayGroundPage extends React.Component {
    routes = [{
        path: '/gauge',
        label: '仪表板',
        main: () => <GaugeChartPage />
    }, {
        path: '/liquid',
        label: '水波图',
        main: () => <LiquidChartPage />
    }, {
        path: '/bullet',
        label: '子弹图',
        main: () => <BulletChartPage />
    }];

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" render={() => (<Redirect to={this.routes[0].path}/>)}/>
                    <div className="page-playground">
                        <div className="page-body">
                            <div className="body-content">
                                <div className="page-menu">
                                    {
                                        _.map(this.routes, (route) => {
                                            return (<NavLink className="menu-link" key={route.path} to={route.path} activeClassName="selected">{route.label}</NavLink>);
                                        })
                                    }
                                </div>
                                <div className="page-main">
                                    {
                                        _.map(this.routes, (route, index) => {
                                            return <Route key={index} path={route.path} component={route.main}/>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}
