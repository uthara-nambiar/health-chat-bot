import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import { useState } from "react";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    //height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});
const Chat = () => {
  var temp = [];
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  let arr = [];
  let key = 0;
  // const messages = [
  //   {
  //     key: "1",
  //     bot: "hi",
  //     user: "hi bot",
  //   },
  //   {
  //     key: "2",
  //     bot: "hi 1",
  //     user: "hi bot 1",
  //   },
  //   {
  //     key: "3",
  //     bot: "hi 2",
  //     user: "hi bot 2",
  //   },
  //   {
  //     key: '4',
  //     bot:"hi 3",
  //     user:'hi bot 3'
  //   }
  // ];
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleClick = () => {
    // messages.push({
    //     key: "4",
    //     bot: "",
    //     user: message
    // })
    let obj = {};
    obj.key = key;
    obj.bot = "";
    obj.user = message;
    temp = [...messages, obj];
    console.log("temp", temp);
    key++;
    console.log("key", key);
    setMessages([...messages, obj]);
    setMessage("");
    setTimeout(() => {
      let obj = temp[temp.length - 1];
      console.log("obj", temp);
      temp.splice(temp.length - 1, 1);
      console.log("new msg", temp);
      obj.bot = "response from bot";
      setMessages([...temp, obj]);
    }, 2000);
    //after response take last obj from the array and obj.bot = response.message
  };
  // useEffect(() => {
  // }, [key])
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={12}>
          <List className={classes.messageArea}>
            {messages.map(({ key, bot, user }, i) => (
              <ListItem key={key}>
                <Grid container>
                  <Grid item xs={12} style={{display: "flex",justifyContent: "flex-end"}}>
                    {/* <ListItemText align="right" primary={user}></ListItemText> */}
                    <Typography variant="solid" color="white" noWrap style={{borderRadius: "15px", backgroundColor: "#3a97cf", padding: "5px 15px 5px 15px", color: "white"}}>{user}</Typography>
                  </Grid>

                  <Grid item xs={12} style={{display: "flex",justifyContent: "flex-start"}}>
                      {/* <ListItemText align="left" primary={bot}></ListItemText> */}
                      <Typography variant="solid" color="white" noWrap style={{borderRadius: "15px", backgroundColor: "white", padding: "5px 15px 5px 15px"}}>{bot}</Typography>
                    </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
                value={message}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={1} align="right">
              <Fab color="primary" aria-label="add">
                <SendIcon onClick={handleClick} />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Chat;
