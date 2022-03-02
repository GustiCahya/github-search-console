import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  CardMedia,
  Box,
  Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import nFormatter from "../../utils/nFormatter";
import { likeUser } from "../../store/users/actions";
import { Link } from "react-router-dom";

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1);",
  },
  cardMedia: {
    width: 151,
    height: 80,
    borderRadius: "4px",
    m: "8px",
    mr: 0,
    objectFit: "cover",
  },
  cardHeader: {
    display: "flex",
    pb: 0,
  },
  cardTitle: {
    fontFamily: "Jost",
    fontSize: 16,
    lineHeight: "24px",
    fontWeight: "bold",
    flexGrow: 1,
    "& a": {
      textDecoration: "none",
      color: "inherit",
    },
  },
  cardContent: {
    pt: "6px",
  },
  text: {
    fontFamily: "Jost",
    fontSize: 12,
    lineHeight: "16px",
  },
};

export default function UserCard({ user }) {
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
      />
      <Box sx={{ width: "100%" }}>
        <CardHeader
          sx={styles.cardHeader}
          action={
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                user.like = !user.like;
                dispatch(likeUser(user));
                forceUpdate();
              }}
            >
              {user.like ? (
                <FavoriteIcon color="secondary" />
              ) : (
                <Tooltip title={`Like this user`}>
                  <FavoriteBorderIcon color="secondary" />
                </Tooltip>
              )}
            </IconButton>
          }
          title={
            <Typography sx={styles.cardTitle}>
              <Tooltip title="Click to see user detail">
                <Link to={`/users/${user.login}`}>{user.login}</Link>
              </Tooltip>
            </Typography>
          }
        />
        <CardContent sx={styles.cardContent}>
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
      </Box>
    </Card>
  );
}
