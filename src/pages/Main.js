import React from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  IconButton,
  Pagination,
} from "@mui/material";
import UserCard from "../components/atoms/UserCard";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../store/users/actions";
import CancelIcon from "@mui/icons-material/Cancel";
import Welcome from "../components/molecules/Welcome";
import SearchNotFound from "../components/molecules/SearchNotFound";
import GridMasonry from "../components/atoms/GridMasonry";
import thousandSeparator from "../utils/thousandSeparator";
import { setSearch } from "../store/search/actions";

const styles = {
  textField: {
    fontFamily: "Jost",
  },
  desc: {
    fontFamily: "Jost",
    fontSize: 14,
    lineHeight: "20px",
    my: 2,
  },
  cards: {},
  boxContainer: {
    display: "flex",
    flexDirection: "column",
  },
  boxPagination: {
    my: 1,
    alignSelf: "center",
    "& .MuiPaginationItem-root": {
      boxShadow:
        "0px 1px 1px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);",
    },
    "& .MuiPaginationItem-previousNext": {
      borderRadius: "50%",
      mx: 1.3,
    },
  },
};

export default function Main() {
  const search = useSelector((state) => state.search);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  //   React.useEffect(() => {
  //     dispatch(getUsers());
  //   }, [dispatch]);
  return (
    <Container>
      <TextField
        sx={styles.textField}
        label="Enter GitHub username, i.e. gaearon"
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton
              sx={{
                opacity: search.length > 0 ? 1 : 0,
                transition: "0.1s ease-in",
              }}
              onClick={() => dispatch(setSearch(""))}
            >
              <CancelIcon />
            </IconButton>
          ),
        }}
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        onKeyUp={(e) => {
          if (e.key === "Delete") {
            dispatch(setSearch(""));
          }
        }}
      />
      {/* users count */}
      {users.length > 0 ? (
        <Typography sx={styles.desc}>
          {thousandSeparator(users.length)} Github users found
        </Typography>
      ) : null}
      {/* display items */}
      {
      search.length > 0 && users.length === 0 
        ? <SearchNotFound /> 
        : users.length > 0
        ? (
            <Box sx={styles.boxContainer}>
              <GridMasonry sx={styles.cards}>
                {users.map((user) => (
                  <Box key={user.id}>
                    <UserCard user={user} />
                  </Box>
                ))}
              </GridMasonry>
              <Pagination
                sx={styles.boxPagination}
                count={6}
                shape="rounded"
                color="primary"
              />
            </Box>
          )
        : <Welcome />
      }
    </Container>
  );
}
