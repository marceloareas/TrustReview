import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Avatar, IconButton, Stack } from '@mui/material';

export default function AppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <MuiAppBar position="sticky" sx={{ bgcolor: 'secondary.main', color: 'text.primary', boxShadow: 1 }}>
                <Stack direction="row" spacing={2} justifyContent={'flex-end'} alignItems={'center'} sx={{ px: 2, py: 1 }}>
                    <Stack direction={'row'} spacing={3} alignItems={'center'}>
                        <IconButton size="large" aria-label="search" color="inherit">
                            <Avatar />
                        </IconButton>
                    </Stack>
                </Stack>
            </MuiAppBar>
        </Box>
    );
}
