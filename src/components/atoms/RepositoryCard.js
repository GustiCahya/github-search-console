import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Tooltip,
  Link
} from "@mui/material";
import nFormatter from "../../utils/nFormatter";

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1);"
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

export default function RepositoryCard({ repo = {} }) {
  return (
    <Card elevation={1} sx={styles.card}>
      <Box sx={{width: "100%"}}>
        <CardHeader
          sx={styles.cardHeader}
          title={
            <Typography sx={styles.cardTitle}>
              <Tooltip title="Click to see repository on github">
                <Link href={repo.html_url} target="_blank">{repo.name}</Link>
              </Tooltip>
            </Typography>
          }
        />
        <CardContent sx={styles.cardContent}>
          <Typography sx={styles.text} variant="body2" color="textSecondary">
            {nFormatter(repo.stargazers_count, 1)} stars
          </Typography>
          <Typography sx={styles.text} variant="body2" color="textSecondary">
            {nFormatter(repo.forks, 1)} forks
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
