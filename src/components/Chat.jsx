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
import { Info } from "../context/Context";
import Modal from '@mui/material/Modal';
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
    height: "50vh",
    overflowY: "auto",
  },
});

// useEffect(() => {
//   //login api call with userId
// },[])
const Chat = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const {user,isSignedIn} = useUser()
  const {userName, Email, Diagnosed, setUsername, setDiagnosed, setEmail} = useContext(Info)
  console.log("user", userName, Email, Diagnosed)
  console.log(user, isSignedIn)
  var temp = [];
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  let key = 0;
  
  if(!userName || !Email || !Diagnosed){
    setDiagnosed('Cancer')
    setEmail(user.emailAddresses[0].emailAddress)
    setUsername(user.username)
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleClick = () => {
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

  return (
    <div>
      <div style={{display:'flex', flexDirection:'row', height:'60px', margin:'5px', justifyContent:'space-between'}}>
        {
          isSignedIn ? (
            <>
              <SignOutButton signOutCallback={() => navigate('/sign-in')} className="button-42" />
            </>
          ) : (
            <div>Page not found</div>
          )
        }
        {
          <img src={user.hasImage?user.imageUrl:''} style={{width:'50px', height:'50px', borderRadius:'50%', cursor:'pointer'}} onClick={() => setOpen(true)} />
          
        }
        

      </div>
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
          {
            open && <BasicModal open={open} setOpen={setOpen} user={user} userName={userName} Email={Email} Diagnosed={Diagnosed} fullName={user.fullName} />
          }
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
function BasicModal({open, setOpen,fullName,user, userName, Email, Diagnosed}) {
  
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={{background:'#097975',marginTop:'6rem', width:'70%', marginLeft:'13%', height:'60%', border:'none', borderRadius:'30px' }}>
          <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <img src={user.hasImage?user.imageUrl:''} style={{width:'100px', height:'100px', borderRadius:'50%'}} />
            <span style={{fontSize:'20px', fontWeight:'bold'}}>{fullName}</span>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'6px', marginTop:'10px'}}>
            <span style={{padding:'5px', marginLeft:'20px', fontFamily:'monospace'}}>Email: {Email}</span>
            <span style={{padding:'5px', marginLeft:'20px', fontFamily:'monospace'}}>Username: {userName}</span>
            <span style={{padding:'5px', marginLeft:'20px', fontFamily:'monospace'}}>Diagnosed with: {Diagnosed}</span>
          </div>
        </Box>

      </Modal>
    </div>
  );
}
export default Chat;
