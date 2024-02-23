import React, { useContext, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import { useUser, SignOutButton, UserProfile } from "@clerk/clerk-react";
import SendIcon from "@material-ui/icons/Send";
import { useState } from "react";
import Select from "react-select";
import { Info } from "../context/Context";
import "react-dropdown/style.css";
import Modal from "@mui/material/Modal";
import axios from "axios";
import "../assets/Theme/styles.css";
import profile from "../assets/Icons/profile.png";
import bot from "../assets/Icons/bot.png";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "450px"
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "59vh",
    overflowY: "auto",
  },
});

// useEffect(() => {
//   //login api call with userId
// },[])
const Chat = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const { userName, Email, Diagnosed, setUsername, setDiagnosed, setEmail } =
    useContext(Info);
  // console.log("user", userName, Email, Diagnosed);
  // console.log(user, isSignedIn);
  
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [report, setReport] = useState(false);
  const optionsss = [
    { value: "related", label: "Query about my health" },
    { value: "general", label: "General query" },
    { value: "summarize", label: "Summarize a report" },
  ];
  let key = 0;

  if (!userName || !Email || !Diagnosed) {
    setDiagnosed("Cancer");
    setEmail(user?.emailAddresses[0]?.emailAddress);
    setUsername(user?.username);
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(()=>{
    if(selectedOption?.value === 'summarize')
    {
      setReport(true);
    }
    else
    {
      setReport(false);
    }
  }, [selectedOption?.value])

  const handleClick = async () => {
    //after response take last obj from the array and obj.bot = response.message
    // [{question:'hsifan', anser:'ans'},{question:'jsjd', answer:'......'}]
    let obj = {};
    obj.question = message;
    obj.answer = "";
    setMessages([...messages,obj]);

    let obj1;
    if (selectedOption !== null) {
      switch (selectedOption?.value) {
        case "related":
          obj1 = {
            prompt: `You are medical healthcare assistant. I am a ${Diagnosed} patient.` + message,
          };
          break;
        case "general":
          obj1 = {
            prompt: "You are medical healthcare assistant." + message,
          };
          break;
        case "summarize":
          obj1 = {
            prompt: "You are medical healthcare assistant." + message,
          };
          break;
      }
    }
    setIsLoading(true);
    setMessage("");

    await axios
      .post("http://127.0.0.1:5000/converse", obj1, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);
        let final = {}
        let lastObj = res.data[res.data.length-1]
        console.log('lastObj', lastObj)
        console.log('msgObj', obj)
        final.question = obj.question
        final.answer = lastObj.answer
        console.log('final', final)
        console.log('messagesseasd', messages)
        let msg = [...messages,final]
        console.log('msggg', msg)
        setMessages(msg);
      })
      .catch((err) => console.error(err));
  };

  const keyPress = (e) => {
    const keyCode = e.which || e.keyCode;

    if (keyCode === 13) {
      handleClick();
      return;
    }
  };

  // useEffect(() => {
  //   temp = tempArr
  // },[tempArr])

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "60px",
          margin: "5px",
          justifyContent: "space-between",
        }}
      >
        {isSignedIn ? (
          <>
            <SignOutButton
              signOutCallback={() => navigate("/sign-in")}
              className="button-42"
            />
          </>
        ) : (
          <div className='dot-pulse'></div>
        )}

        {
          <img
            src={user?.hasImage ? user.imageUrl : profile}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => setOpen(true)}
          />
        }
      </div>
      {/* <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid> */}
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={12}>
          <List className={classes.messageArea}>
            {messages.map((msg) => (
              <ListItem key={key}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    {/* <ListItemText align="right" primary={user}></ListItemText> */}
                    <Typography
                      variant="solid"
                      color="white"
                      paragraph
                      className="user-message"
                    >
                      {msg?.question}
                    </Typography>
                    <img
                      src={user.hasImage ? user.imageUrl : profile}
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                        marginTop: "4px",
                        marginLeft: "4px",
                      }}
                    />
                  </Grid>

                  {msg?.answer && (
                    <Grid
                      item
                      xs={12}
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      {/* <ListItemText align="left" primary={bot}></ListItemText> */}
                      <img
                        src={bot}
                        style={{
                          width: "25px",
                          height: "25px",
                          borderRadius: "50%",
                          marginTop: "4px",
                          marginLeft: "4px",
                          marginRight: "4px",
                        }}
                      />
                      <Typography
                        variant="solid"
                        color="white"
                        paragraph
                        className="bot-message"
                      >
                        {msg?.answer}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </ListItem>
            ))}
            {loading && (
              <>
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  {/* <ListItemText align="left" primary={bot}></ListItemText> */}
                  <img
                    src={bot}
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                      marginTop: "4px",
                      marginLeft: "15px",
                    }}
                  />
                  <div className="dot-pulse" />
                </Grid>
              </>
            )}
          </List>
          <Divider />
          {open && (
            <BasicModal
              open={open}
              setOpen={setOpen}
              user={user}
              userName={userName}
              Email={Email}
              Diagnosed={Diagnosed}
              fullName={user.fullName}
            />
          )}

          <Grid className="grid-container" container>
            <Grid
              item
              xs={11}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              {/* <SplitButton /> */}
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={optionsss}
                menuPlacement="top"
                sx={{ width: 1 }}
              />

              {console.log("selected:", report)}
              {report && <Avatar/>}
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                style={{ width: "70%" }}
                value={message}
                onChange={(e) => handleChange(e)}
                onKeyDown={keyPress}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={1} align="right">
              <Fab
                color="primary"
                aria-label="add"
                disabled={loading || selectedOption === null}
              >
                <SendIcon onClick={handleClick} />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

// const style = {
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };
function BasicModal({
  open,
  setOpen,
  fullName,
  user,
  userName,
  Email,
  Diagnosed,
}) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            background: "#097975",
            marginTop: "6rem",
            width: "70%",
            marginLeft: "13%",
            height: "60%",
            border: "none",
            borderRadius: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={user.hasImage ? user.imageUrl : profile}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginTop: "30px",
                marginBottom: "20px",
              }}
            />
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              {fullName}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              marginTop: "10px",
            }}
          >
            <span
              style={{
                padding: "5px",
                marginLeft: "20px",
                fontFamily: "monospace",
              }}
            >
              Email: {Email}
            </span>
            <span
              style={{
                padding: "5px",
                marginLeft: "20px",
                fontFamily: "monospace",
              }}
            >
              Username: {userName}
            </span>
            <span
              style={{
                padding: "5px",
                marginLeft: "20px",
                fontFamily: "monospace",
              }}
            >
              Diagnosed with: {Diagnosed}
            </span>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default Chat;
