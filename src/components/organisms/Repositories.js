import React from "react";
import {
  Box,
  Skeleton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import GridMasonry from "../atoms/GridMasonry";
import RepositoryCard from "../atoms/RepositoryCard";
import { getRepositories } from "../../store/user/actions";

export default function Repositories({username}) {
  const loading = useSelector((state) => state.loading.cards);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
      dispatch(getRepositories(username));
  }, [dispatch, username]);
  const repositories = React.useMemo(() => {
    return user?.repositories || [];
  }, [user]);
  return (
    <GridMasonry>
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
  );
}
