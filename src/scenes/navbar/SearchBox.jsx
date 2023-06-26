import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchUserWidget from "scenes/widgets/SearchUserWidget";

const SearchBox = () => {
  const [options, setOptions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const token = useSelector((state) => state.token);

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
        <SearchUserWidget
          key={option._id}
          _id={option._id}
          firstName={option.firstName}
          lastName={option.lastName}
          subtitle={option.occupation}
          picturePath={option.picturePath}
        />
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
        renderInput={(params) => (
          <TextField {...params} label="Search users by first name" />
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
            padding: "0.5rem",
          }}
        >
          {searchResults}
        </Paper>
      )}
    </div>
  );
};

export default SearchBox;
