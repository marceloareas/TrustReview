import {
    Dialog,
    DialogContent,
    Stack,
    Chip,
    Box,
} from "@mui/material";
import { useState } from "react";
import type { ITag } from "../../../interfaces/Product";
import TagButton from "../TagButton";
import Search from "../../Search";

export default function DialogTag({
    open,
    onClose,
    tags,
    onCreateTag,
}: {
    open: boolean;
    onClose: () => void;
    tags: ITag[];
    onCreateTag?: (name: string) => void;
}) {
    const [value, setValue] = useState("");

    const handleAdd = () => {
        const trimmed = value.trim();
        if (!trimmed) return;
        onCreateTag?.(trimmed);
        setValue("");
    };


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <Search
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                        handleSearchSubmit={handleAdd}
                    />

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                            gap: 1,
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <TagButton isEditMode={true} />
                        </Box>

                        {tags.map((t) => (
                            <Chip key={t.id || t.name} label={t.name} sx={{ p: 0 }} />
                        ))}
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
