import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Friend from "components/Friend";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const SearchBox = () => {
  const [options, setOptions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const token = useSelector((state) => state.token);

  const [open, setOpen] = useState(false);

  const handleSearch = async (firstName) => {
    if (firstName) {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/search/${firstName}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setOptions(data);

      const results = data.map((option) => (
        <Box
          key={option._id}
          sx={{
            padding: "0.5rem",
          }}
        >
          <Friend
            friendId={option._id}
            name={`${option.firstName} ${option.lastName}`}
            subtitle={option.occupation}
            userPicturePath={option.picturePath}
          />
        </Box>
      ));
      setSearchResults(results);
    } else {
      setOptions([]);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <Autocomplete
        freeSolo
        onInputChange={(_, value) => handleSearch(value)}
        options={options}
        getOptionLabel={(option) => ""}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        sx={{ width: "20rem" }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search users by first name"
            InputProps={{
              ...params.InputProps,
              sx: {
                borderRadius: "9px",
                padding: "0.5rem",
              },
            }}
          />
        )}
      />
      {searchResults.length > 0 && (
        <Paper
          sx={{
            position: "absolute",
            zIndex: 1,
            maxHeight: "50vh",
            overflowY: "auto",
            width: "20rem",
            padding: "0.75rem",
          }}
        >
          {searchResults}
        </Paper>
      )}
    </div>
  );
};

export default SearchBox;
