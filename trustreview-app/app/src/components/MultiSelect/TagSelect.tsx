import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from 'react';

// ...existing code...

export interface TagSelectProps {
    label?: string;
    names: string[];
    value?: string[] | string | null;
    onChange?: (value: string[] | string | null) => void;
    sx?: object
    multiple?: boolean;
}

export default function ProductSelect({
    label = 'Produto',
    names,
    value,
    onChange,
    sx = { 
        width: '100%' },
    multiple = true,
}: TagSelectProps) {
    const [internalValue, setInternalValue] = useState<string[] | string | null>(
        multiple ? (Array.isArray(value) ? value : []) : (typeof value === 'string' ? value : null)
    );

    React.useEffect(() => {
        if (value !== undefined) {
            setInternalValue(multiple ? (Array.isArray(value) ? value : []) : (typeof value === 'string' ? value : null));
        }
    }, [value, multiple]);

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
        <Box sx={sx}>
            <Autocomplete
                multiple={multiple}
                options={names}
                disableCloseOnSelect={multiple}
                value={internalValue as any}
                onChange={(_, newValue) => {
                    setInternalValue(newValue as any);
                    if (onChange) onChange(newValue as any);
                }}
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        {multiple && (
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                        )}
                        {option}
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
                {...(multiple ? {
                    renderTags: (value: string[], getTagProps: any) => (
                        value.map((option: string, index: number) => (
                            <Chip key={option} size="small" label={option} {...getTagProps({ index })} />
                        ))
                    )
                } : {})}
            />
        </Box>
    );
}
