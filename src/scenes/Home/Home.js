import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SideBar from './components/Sidebar/Sidebar';
/** Import components */
import TopNav from './components/TopNav/TopNav';
import Message from './scenes/Message/Message';

class Home extends React.Component {
    state = {
        title:"Message Composer"
    }
    componentDidMount() {

    }
    render() {
        if (this.props.location.pathname === '/') {
            return (
                <Redirect
                    to={{
                        pathname: '/messages'
                    }}
                />
            );
        }
        const { title } = this.state;
        return (
            <div className="wrapper">
                <SideBar route={this.props.location.pathname}/>
                <div id="content">
                    <TopNav title={title} />
                    <div className="container-content">
                         <Switch>
                            <Route path="/messages" exact render={props => <Message {...props} title="Message"/>} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;