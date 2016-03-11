contextTabs = [
    "Shaders",
    "Profiles",
    "State",
    "Settings"
]

define(["jsx!tab_bar", "jsx!shaders", "jsx!profiles", "jsx!state_view", "jsx!settings", "messages"],
function (TabBar, Shaders, Profiles, StateView, Settings, Messages) {
    var ctx = React.createClass({
        getInitialState: function() {
            return {"currentTab": 0}
        },
        componentWillMount: function() {
            Messages.sendMessage(this.props.activeContext, messageType.DISABLE_ALL, {});
            window.addEventListener('unload', function() {
                Messages.sendMessage(this.props.activeContext, messageType.DISABLE_ALL, {});
            }.bind(this))
        },
        changeTab: function(i) {
            Messages.sendMessage(this.props.activeContext, messageType.DISABLE_ALL, {});
            this.setState({currentTab: i});
        },
        render: function() {
            var tab;
            if (this.state.currentTab == 0) {
                tab = <Shaders activeContext={this.props.activeContext}/>;
            } else if (this.state.currentTab == 1) {
                tab = <Profiles activeContext={this.props.activeContext}/>;
            } else if (this.state.currentTab == 2) {
                tab = <StateView activeContext={this.props.activeContext}/>;
            } else {
                tab = <Settings activeContext={this.props.activeContext}/>;
            }
            return <div className="context">
                <TabBar tabs={contextTabs} changeTab={this.changeTab} />
                <div className="tab-container">{tab}</div>
            </div>;
        }
    });
    return ctx;
});
