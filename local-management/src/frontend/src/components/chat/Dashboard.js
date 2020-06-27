import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { getMessage, sendMessage } from "../../actions/chat";
import { withStyles } from "@material-ui/core/styles";
import "./Chat.css";
const classes = {
    root: {
        margin: "50px",
        padding: "10px"
    },

    flex: {
        display: "flex",
        alignItems: "center"
    },

    topicsWindow: {
        width: "30%",
        height: "300px",
        borderRight: "1px solid grey"
    },
    chatWindow: {
        width: "70%",
        height: "300px",
        padding: "20px"
    },
    chatBox: {
        width: "85%"
    },
    button: {
        width: "15%"
    }
};

export class Dashboard extends Component {
    static propTypes = {
        chats: PropTypes.object.isRequired,
        getMessage: PropTypes.func.isRequired,
        sendMessage: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.changeActiveTopic = this.changeActiveTopic.bind(this);
        this.changeTextValue = this.changeTextValue.bind(this);
        this.dateFormatter = this.dateFormatter.bind(this);
    }

    dateFormatter(datenow) {
        var date = new Date();
        var now = Date.now() / 1000;
        var curMin = date.getMinutes();
        var curHour = date.getHours();
        var secpassed = Math.floor(now - datenow);
        var hourPassed = Math.floor(secpassed / 3600);
        var minPassed = Math.floor(secpassed - hourPassed * 3600);
        var originalHour = curHour - hourPassed;
        var originalMin = curMin - minPassed;
        var dayCounter = 0;
        if (hourPassed > curHour) {
            var cacheHour = curHour - hourPassed;
            while (cacheHour < 0) {
                dayCounter += 1;
                cacheHour += 24;
            }
            if (dayCounter === 1) {
                return "yesterday";
            } else {
                return dayCounter.toString().concat(" days ago");
            }
        } else {
            return originalHour
                .toString()
                .concat(":")
                .concat(curMin.toString());
        }
    }
    state = {
        activeTopic: "General",
        topics: ["General", "MBSTeam"],
        textValue: "",
        interval: 0
    };
    changeActiveTopic(value) {
        //event.preventDefault();
        //let value = event.target.key;
        console.log("value");
        console.log(value);
        this.setState({
            activeTopic: value
        });
    }
    changeTextValue(value) {
        event.preventDefault();
        this.setState({
            textValue: value
        });
    }

    componentDidMount() {
        //this.props.getMessage(this.props.chats);
        //console.log("printing");
        //console.log(this.props.chats[this.state.activeTopic]);
        this.interval = setInterval(this.props.getMessage, 1000);
    }
    render() {
        return (
            <div className="mycontainer">
                <div className="header">
                    <Typography variant="h5" component="h5">
                        {this.state.activeTopic}
                    </Typography>
                </div>
                <div className="mybody">
                    <div className="sidebar">
                        <List>
                            {this.state.topics.map(topic => (
                                <ListItem
                                    onClick={e =>
                                        this.changeActiveTopic(
                                            e.target.innerText
                                        )
                                    }
                                    key={topic}
                                    button
                                >
                                    <ListItemText primary={topic} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                    <div className="content">
                        {this.props.chats[this.state.activeTopic].map(
                            (chat, i) => (
                                <div styles={classes.flex} key={i}>
                                    <span>
                                        <Chip
                                            label={chat.from
                                                .concat(": ")
                                                .concat(
                                                    this.dateFormatter(
                                                        chat.timestamp
                                                    )
                                                )}
                                            styles={classes.chip}
                                        />
                                    </span>
                                    <Typography variant="body1" gutterBottom>
                                        {" "}
                                        {chat.msg}{" "}
                                    </Typography>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="footer">
                    <TextField
                        label="Write a message"
                        styles={classes.chatBox}
                        value={this.state.textValue}
                        onChange={e => this.changeTextValue(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        styles={classes.button}
                        onClick={() => {
                            this.props.sendMessage({
                                msg: this.state.textValue,
                                topic: this.state.activeTopic
                            });
                            this.setState({
                                textValue: ""
                            });
                        }}
                    >
                        Send
                    </Button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    chats: state.chats.chats
});
export default connect(mapStateToProps, { getMessage, sendMessage })(Dashboard);
