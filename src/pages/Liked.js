import React from "react";
import { Container, Skeleton, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import WelcomeLiked from "../components/molecules/WelcomeLiked";
import UserCard from "../components/atoms/UserCard";
import GridMasonry from "../components/atoms/GridMasonry";
import { getLikedUsers } from "../store/likedUsers/actions";

export default function Liked() {
  const loading = useSelector((state) => state.loading.main);
  const likedUsers = useSelector((state) => state.likedUsers);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getLikedUsers());
  }, [dispatch]);
  return (
    <Container>
      {likedUsers.length > 0 ? (
        <GridMasonry>
          {
            loading
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
            : likedUsers.map((user) => (
                <Box key={user.id}>
                  <UserCard user={user} />
                </Box>
              ))
          }
        </GridMasonry>
      ) : (
        <WelcomeLiked />
      )}
    </Container>
  );
}
