import React from "react";
import { Box, Skeleton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import GridMasonry from "../atoms/GridMasonry";
import UserCard from "../atoms/UserCard";
import { getFollowing } from "../../store/user/actions";

export default function Following({username}) {
  const loading = useSelector((state) => state.loading.cards);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getFollowing(username));
  }, [dispatch, username]);
  const following_items = React.useMemo(() => {
    return user.following_items || [];
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
        : following_items.map((user) => (
            <Box key={user.id}>
              <UserCard user={user} />
            </Box>
          ))}
    </GridMasonry>
  );
}
