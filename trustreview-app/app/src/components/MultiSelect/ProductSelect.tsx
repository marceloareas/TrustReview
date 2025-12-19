import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useState } from "react";
import type { IProduct } from "../../interfaces/Product";

export interface ProductSelectProps {
  label?: string;
  options: IProduct[];
  value?: string | null;
  onChange?: (value: string | null) => void;
  sx?: object;
}

export default function ProductSelect({
  label = "Produto",
  options,
  value,
  onChange,
  sx,
}: ProductSelectProps) {
  const [internalValue, setInternalValue] = useState<string | null>();

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Box sx={sx}>
      <Autocomplete
        options={options}
        value={options.find((opt) => opt.name === internalValue) || null}
        onChange={(_, newValue) => {
          setInternalValue(newValue?.name || null);
          if (onChange) onChange(newValue?.id || null);
        }}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            placeholder={label}
          />
        )}
      />
    </Box>
  );
}
