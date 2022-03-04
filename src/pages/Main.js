import React from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  IconButton,
  Pagination,
  Skeleton,
} from "@mui/material";
import UserCard from "../components/atoms/UserCard";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../store/users/actions";
import CancelIcon from "@mui/icons-material/Cancel";
import Welcome from "../components/molecules/Welcome";
import SearchNotFound from "../components/molecules/SearchNotFound";
import GridMasonry from "../components/atoms/GridMasonry";
import thousandSeparator from "../utils/thousandSeparator";
import useWindowDimensions from "../hooks/useWindowDimensions";

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
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const { width } = useWindowDimensions();
  const users = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading.main);
  const dispatch = useDispatch();
  const searchUsers = React.useCallback(
    async (page = 1) => {
      setPage(page);
      dispatch(getUsers(search, page))
        .then(() => setIsSubmit(true))
        .catch(() => setIsSubmit(false));
    },
    [dispatch, search]
  );
  const choosePage = React.useCallback(
    (_, page) => {
      searchUsers(page);
    },
    [searchUsers]
  );
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
              onClick={() => setSearch("")}
            >
              <CancelIcon />
            </IconButton>
          ),
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Delete") {
            setIsSubmit(false);
            setSearch("");
          }
          if (e.key === "Enter") {
            searchUsers();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Backspace") {
            setIsSubmit(false);
          }
        }}
      />
      {/* display items */}
      {loading ? (
        <Box sx={{ my: 2 }}>
          <Skeleton
            sx={{ mb: 1.5, borderRadius: "2px" }}
            variant="text"
            width={210}
            height={25}
          />
          <GridMasonry sx={styles.cards}>
            {Array(9)
              .fill()
              .map((_, idx) => (
                <Skeleton
                  key={idx}
                  sx={{ borderRadius: "10px", mb: 3 }}
                  variant="rectangular"
                  height={90}
                />
              ))}
          </GridMasonry>
        </Box>
      ) : search.length > 0 && users.totalCount === 0 && isSubmit ? (
        <SearchNotFound search={search} />
      ) : users.totalCount > 0 ? (
        <Box sx={styles.boxContainer}>
          <Typography sx={styles.desc}>
            {thousandSeparator(users.totalCount)} Github users found
          </Typography>
          <GridMasonry sx={styles.cards}>
            {users.items.map((user) => (
              <Box key={user.id}>
                <UserCard user={user} />
              </Box>
            ))}
          </GridMasonry>
        </Box>
      ) : (
        <Welcome />
      )}
      {users.totalCount > 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            sx={styles.boxPagination}
            count={users.pagesLength}
            size={width < 900 ? "small" : "medium"}
            shape="rounded"
            color="primary"
            page={page}
            onChange={choosePage}
          />
        </Box>
      ) : null}
    </Container>
  );
}
