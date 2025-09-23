import { Clear } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';

interface SearchProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({
    value,
    onChange,
}: SearchProps) => {
    return (
        <TextField
            value={value}
            onChange={onChange}
            variant="outlined"
            placeholder="Buscar"
            fullWidth
            size="small"
            slotProps={{
                input: {
                    'aria-label': 'search',
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: value && (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() =>
                                    onChange({
                                        target: { value: '' },
                                    } as React.ChangeEvent<HTMLInputElement>)
                                }
                                edge="end"
                                size="small"
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: '16px',
                                    },
                                }}
                            >
                                <Clear />
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};

export default Search;