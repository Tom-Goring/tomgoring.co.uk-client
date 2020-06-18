import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DescriptionIcon from "@material-ui/icons/Description";
import DoneIcon from "@material-ui/icons/Done";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import MenuIcon from "@material-ui/icons/Menu";
import TimelineIcon from "@material-ui/icons/Timeline";
import clsx from "clsx";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ListItemLink from "./components/LinkListItem";
import HomePage from "./pages/Home";
import store from "./store";
import "./App.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  toolbar: theme.mixins.toolbar,
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBotton: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <Provider store={store}>
      <CssBaseline />
      <Router>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleOpen}
              className={clsx(classes.menuButton)}>
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}>
              Tom Goring
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          classes={{ paper: classes.drawerPaper }}
          open={open}>
          <div className={classes.toolbar} />
          <div>
            <List>
              <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
              <ListItemLink to="/about-me" primary="About Me" icon={<InfoIcon />} />
              <ListItemLink to="/timeline" primary="Timeline" icon={<TimelineIcon />} />
              <ListItemLink to="/cv" primary="CV" icon={<DescriptionIcon />} />
            </List>
            <Divider />
            <List>
              <ListItemLink to="/todo-list" primary="My todo-list" icon={<DoneIcon />} />
              <ListItemLink to="/projects" primary="My Projects" icon={<AssignmentIcon />} />
            </List>
          </div>
        </Drawer>
        <div
          className={clsx(classes.content, { [classes.contentShift]: open })}
          style={{ overflow: "hidden" }}>
          <div className={classes.toolbar} />
          <main
            style={{
              height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
              width: "100%",
              overflow: "auto",
            }}>
            <Route exact path="/" component={HomePage} />
          </main>
        </div>
      </Router>
    </Provider>
  );
}
