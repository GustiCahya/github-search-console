import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
} from "@mui/material";
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
  name: "cobol",
  stars: 5400,
  forks: 29,
};

export default function RepositoryCard({ repository = initial }) {
  return (
    <Card elevation={1} sx={styles.card}>
      <Box sx={{width: "100%"}}>
        <CardHeader
          sx={styles.cardHeader}
          title={repository.name}
        />
        <CardContent sx={styles.cardContent}>
          <Typography sx={styles.text} variant="body2" color="textSecondary">
            {nFormatter(repository.stars, 1)} stars
          </Typography>
          <Typography sx={styles.text} variant="body2" color="textSecondary">
            {nFormatter(repository.forks, 1)} forks
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
