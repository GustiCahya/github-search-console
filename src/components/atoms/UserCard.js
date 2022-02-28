import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  CardMedia,
  Box,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import nFormatter from "../../utils/nFormatter";

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1);"
  },
  cardMedia: {
    width: 151,
    height: 80,
    borderRadius: "4px",
    m: "8px",
    mr: 0,
    objectFit: "contain"
  },
  cardHeader: {
    display: "flex",
    pb: 0,
    "& .MuiCardHeader-title": {
      fontFamily: "Jost",
      fontSize: 16,
      lineHeight: "24px",
      fontWeight: "bold",
      flexGrow: 1
    },
  },
  cardContent: {
    pt: "6px"
  },
  text: {
    fontFamily: "Jost",
    fontSize: 12,
    lineHeight: "16px",
  },
};

const initial = {
  name: "Bob",
  followers: 17400,
  followings: 103,
};

export default function UserCard({ user = initial }) {
  const dispatch = useDispatch();
  return (
    <Card elevation={1} sx={styles.card}>
      <CardMedia
        sx={styles.cardMedia}
        component="img"
        image="/logo512.png"
        alt="User Profile Picture"
      />
      <Box sx={{width: "100%"}}>
        <CardHeader
          sx={styles.cardHeader}
          action={
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
          }
          title={user.name}
        />
        <CardContent sx={styles.cardContent}>
          <Typography sx={styles.text} variant="body2" color="textSecondary">
            {nFormatter(user.followers, 1)} followers
          </Typography>
          <Typography sx={styles.text} variant="body2" color="textSecondary">
            {nFormatter(user.followings, 1)} followings
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
