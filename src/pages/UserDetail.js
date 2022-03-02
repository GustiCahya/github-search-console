import React from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  Tab,
  Skeleton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ApartmentIcon from "@mui/icons-material/Apartment";
import nFormatter from "../utils/nFormatter";
import GridMasonry from "../components/atoms/GridMasonry";
import UserCard from "../components/atoms/UserCard";
import RepositoryCard from "../components/atoms/RepositoryCard";
import { getUser } from "../store/user/actions";

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
    mb: 0.3,
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
  const loading = useSelector((state) => state.loading);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUser(username));
  }, [dispatch, username]);
  const repositories = React.useMemo(() => {
    return user.repositories || [];
  }, [user]);
  const followers_items = React.useMemo(() => {
    return user.followers_items || [];
  }, [user]);
  const following_items = React.useMemo(() => {
    return user.following_items || [];
  }, [user]);
  // tab
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Box sx={styles.head}>
        {loading ? (
          <>
            <Skeleton sx={styles.avatar} variant="circular" />
            <Skeleton sx={styles.title} variant="text" width={120} />
            <Skeleton sx={styles.subtitle} variant="text" width={125} />
            <Skeleton sx={styles.desc} variant="text" width={140} />
          </>
        ) : (
          <>
            <Avatar
              sx={styles.avatar}
              alt="Profile Picture"
              src={user.avatar_url}
            />
            <Typography
              sx={{
                ...styles.title,
                visibility: user?.name ? "visible" : "hidden",
              }}
              component="h2"
            >
              {user.name}
            </Typography>
            <Typography sx={styles.subtitle} component="h3">
              {user.login}
            </Typography>
            <Typography
              sx={{
                ...styles.desc,
                visibility: user?.company ? "visible" : "hidden",
              }}
              component="p"
            >
              <ApartmentIcon sx={{ mx: 1 }} />
              {user.company}
            </Typography>
          </>
        )}
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
                label={`(${loading ? "" : nFormatter(user.public_repos)})`}
                value={0}
              />
              <Tab
                icon={<div>FOLLOWERS</div>}
                label={`(${loading ? "" : nFormatter(user.followers)})`}
                value={1}
              />
              <Tab
                icon={<div>FOLLOWINGS</div>}
                label={`(${loading ? "" : nFormatter(user.following)})`}
                value={2}
              />
            </TabList>
          </Box>
          <TabPanel value={0}>
            <GridMasonry sx={styles.cards}>
              {loading
                ? Array(9)
                    .fill()
                    .map((_, idx) => (
                      <Skeleton
                        key={idx}
                        sx={{ borderRadius: "10px", mb: 3 }}
                        variant="rectangular"
                        height={90}
                      />
                    ))
                : repositories.map((repo) => (
                    <Box key={repo.id}>
                      <RepositoryCard repo={repo} />
                    </Box>
                  ))}
            </GridMasonry>
          </TabPanel>
          <TabPanel value={1}>
            <GridMasonry sx={styles.cards}>
              {loading
                ? Array(9)
                    .fill()
                    .map((_, idx) => (
                      <Skeleton
                        key={idx}
                        sx={{ borderRadius: "10px", mb: 3 }}
                        variant="rectangular"
                        height={90}
                      />
                    ))
                : followers_items.map((user) => (
                    <Box key={user.id}>
                      <UserCard user={user} />
                    </Box>
                  ))}
            </GridMasonry>
          </TabPanel>
          <TabPanel value={2}>
            <GridMasonry sx={styles.cards}>
              {loading
                ? Array(9)
                    .fill()
                    .map((_, idx) => (
                      <Skeleton
                        key={idx}
                        sx={{ borderRadius: "10px", mb: 3 }}
                        variant="rectangular"
                        height={90}
                      />
                    ))
                : following_items.map((user) => (
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
