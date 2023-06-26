import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchUserWidget = ({
  _id,
  firstName,
  lastName,
  subtitle,
  picturePath,
}) => {
  const navigate = useNavigate();

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <FlexBetween padding={1}>
      <FlexBetween gap="1rem">
        <UserImage image={picturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${_id}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light, // TODO change this
                cursor: "pointer",
              },
            }}
          >
            {firstName + " " + lastName}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default SearchUserWidget;
