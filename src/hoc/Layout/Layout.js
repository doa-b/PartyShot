import React, {Component} from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom'
import { pageTitle } from '../../shared/routes';




import MyToolbar from '../../components/ui/MyToolbar/MyToolbar';
import MySideDrawer from '../../components/ui/MySideDrawer/MySideDrawer';



/**
 * Created by Doa on 23-10-2019.
 */
class Layout extends Component {

    state = {
        drawer: false
    };

    toggleDrawer = () => {
        this.setState(prevState => ({
            drawer: !prevState.drawer
        }));
    };

    onItemClick = () => () => {
        this.setState(prevState => ({
            drawer: (this.props.variant === 'temporary') ? false : prevState.drawer
        }));
    };

    render() {

        return (
            <>
                <MyToolbar
                    title={pageTitle(this.props.location.pathname)}
                    onMenuClick={this.toggleDrawer}     />
                <MySideDrawer
                    variant={this.props.variant}
                    open={this.state.drawer}
                    onClose={this.toggleDrawer}
                    onItemClick={this.onItemClick}
                />
                <div>
                {this.props.children}
                </div>
           </>
        )
    }
}


export default compose(
    withRouter
)(Layout);