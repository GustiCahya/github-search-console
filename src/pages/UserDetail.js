import React from "react";
import { Container, Box, Avatar, Typography, Tab } from "@mui/material";
import { useSelector } from "react-redux";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ApartmentIcon from "@mui/icons-material/Apartment";
import nFormatter from "../utils/nFormatter";
import GridMasonry from "../components/atoms/GridMasonry";
import UserCard from "../components/atoms/UserCard";
import RepositoryCard from "../components/atoms/RepositoryCard";

const styles = {
  head: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: 160,
    height: 160,
  },
  title: {
    fontFamily: "Arsenal",
    fontWeight: 700,
    fontSize: 26,
    lineHeight: "36px",
    mt: 1,
  },
  subtitle: {
    fontFamily: "Arsenal",
    fontWeight: 400,
    fontSize: 24,
    lineHeight: "32px",
  },
  desc: {
    fontFamily: "Jost",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: "24px",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    mb: 2,
  },
};

export default function UserDetail({ match }) {
  // user
  const username = React.useMemo(() => match.params.username, [match]);
  const users = useSelector((state) => state.users);
  const user = useSelector((state) =>
    state.users.find((user) => user.name === username)
  );
  const repositories = React.useMemo(() => {
    return user.repositories || [];
  }, [user]);
  // tab
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Box sx={styles.head}>
        <Avatar sx={styles.avatar} alt="Profile Picture" src={user.picture} />
        <Typography sx={styles.title} component="h2">
          {user.name}
        </Typography>
        <Typography sx={styles.subtitle} component="h3">
          {user.name}
        </Typography>
        <Typography sx={styles.desc} component="p">
          <ApartmentIcon sx={{ mx: 1 }} />
          {user.name}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab
                icon={<div>REPOSITORIES</div>}
                label={`(${nFormatter(1000)})`}
                value={0}
              />
              <Tab
                icon={<div>FOLLOWERS</div>}
                label={`(${nFormatter(1000)})`}
                value={1}
              />
              <Tab
                icon={<div>FOLLOWINGS</div>}
                label={`(${nFormatter(1000)})`}
                value={2}
              />
            </TabList>
          </Box>
          <TabPanel value={0}>
            <GridMasonry sx={styles.cards}>
              {repositories.map((user) => (
                <Box key={user.id}>
                  <RepositoryCard user={user} />
                </Box>
              ))}
            </GridMasonry>
          </TabPanel>
          <TabPanel value={1}>
            <GridMasonry sx={styles.cards}>
              {users.map((user) => (
                <Box key={user.id}>
                  <UserCard user={user} />
                </Box>
              ))}
            </GridMasonry>
          </TabPanel>
          <TabPanel value={2}>
            <GridMasonry sx={styles.cards}>
              {users.map((user) => (
                <Box key={user.id}>
                  <UserCard user={user} />
                </Box>
              ))}
            </GridMasonry>
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}
