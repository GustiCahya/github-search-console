import React from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import UserCard from "../components/atoms/UserCard";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../store/users/actions";
import CancelIcon from "@mui/icons-material/Cancel";
import Masonry from "react-masonry-css";
import Welcome from "../components/molecules/Welcome";
import SearchNotFound from "../components/molecules/SearchNotFound";
import { setSearch } from "../store/search/actions";

const styles = {
  textField: {
    fontFamily: "Jost",
  },
};

export default function Main() {
  const search = useSelector((state) => state.search);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  //   React.useEffect(() => {
  //     dispatch(getUsers());
  //   }, [dispatch]);
  //   const breakpoints = {
  //     default: 3,
  //     1100: 2,
  //     700: 1,
  //   }
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
      {/* {search.length > 0 && users.length === 0 ? (
        <SearchNotFound />
      ) : (
        <Welcome />
      )} */}
      {/* <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {users.map((user) => (
          <Box key={user.id}>
            <UserCard user={user} />
          </Box>
        ))}
      </Masonry> */}
    </Container>
  );
}
