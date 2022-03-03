import React from "react";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  CardMedia,
  Box,
  Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import nFormatter from "../../utils/nFormatter";
import { likeUser, dislikeUser } from "../../store/likedUsers/actions";
import { Link } from "react-router-dom";

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1);",
  },
  cardMedia: {
    width: {
      xs: 60,
      sm: 151,
    },
    height: {
      xs: undefined,
      sm: 80,
    },
    borderRadius: "4px",
    m: "8px",
    mr: 0,
    objectFit: "cover",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    pb: 0,
  },
  cardTitle: {
    fontFamily: "Jost",
    fontSize: {
      xs: 10,
      sm: 16,
    },
    lineHeight: {
      xs: undefined,
      sm: "24px",
    },
    inlineSize: {
      xs: "6ch",
    },
    overflowWrap: "break-word",
    fontWeight: "bold",
    flexGrow: 1,
    "& a": {
      textDecoration: "none",
      color: "inherit",
    },
  },
  cardContent: {
    width: "100%"
  },
  iconButton: {
    width: {
      xs: 18,
      sm: 30,
    },
  },
  text: {
    fontFamily: "Jost",
    fontSize: {
      xs: 8,
      sm: 12,
    },
    lineHeight: {
      xs: undefined,
      sm: "16px",
    },
  },
};

export default function UserCard({ user }) {
  const likedUsers = useSelector((state) => state.likedUsers);
  const dispatch = useDispatch();
  // force update component
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  return (
    <Card elevation={1} sx={styles.card}>
      <CardMedia
        sx={styles.cardMedia}
        component="img"
        image={user.avatar_url || "/profile.png"}
        alt="User Profile Picture"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = "/profile.png";
        }}
      />
      <CardContent sx={styles.cardContent}>
        <Box sx={styles.cardHeader}>
          <Typography sx={styles.cardTitle}>
            <Tooltip title="Click to see user detail">
              <Link to={`/users/${user.login}`}>{user.login}</Link>
            </Tooltip>
          </Typography>
          <Box sx={{ display: "block" }}>
            {likedUsers.some((item) => item.id === user.id) ? (
              <IconButton
                onClick={() => {
                  dispatch(dislikeUser(user));
                  forceUpdate();
                }}
              >
                <FavoriteIcon sx={styles.iconButton} color="secondary" />
              </IconButton>
            ) : (
              <Tooltip title={`Like this user`}>
                <IconButton
                  onClick={() => {
                    dispatch(likeUser(user));
                    forceUpdate();
                  }}
                >
                  <FavoriteBorderIcon
                    sx={styles.iconButton}
                    color="secondary"
                  />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
        <Typography
          sx={{
            ...styles.text,
            visibility: user.followers > 0 ? "visible" : "hidden",
          }}
          variant="body2"
          color="textSecondary"
        >
          {nFormatter(user.followers, 1)} followers
        </Typography>
        <Typography
          sx={{
            ...styles.text,
            visibility: user.following > 0 ? "visible" : "hidden",
          }}
          variant="body2"
          color="textSecondary"
        >
          {nFormatter(user.following, 1)} followings
        </Typography>
      </CardContent>
    </Card>
  );
}
