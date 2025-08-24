import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectLabels(labels) {
  const [options, setOptions] = React.useState("");

  const handleChange = (event) => {
    setOptions(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="demo-simple-select-helper-label">{labels.intent}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={options}
          label={labels.intent}
          onChange={handleChange}
        >
          <MenuItem value={1}>Option 1</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <MenuItem value={3}>Option 3</MenuItem>
        </Select>
        <FormHelperText>Select an option</FormHelperText>
      </FormControl>
    </div>
  );
}
