import { Stack, Box } from "@mui/material";
import Tag from "../Tag";
import type { ITag } from "../../interfaces/Product";

import { useState } from "react";
import TagButton from "../Tag/TagButton";
import DialogTag from "../Tag/DialogTag";

const TagsList = ({
  tags,
  isEdit,
  showDialog = true,
}: {
  tags: ITag[];
  isEdit?: boolean;
  showDialog?: boolean;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [showInlineInput, setShowInlineInput] = useState(false);

  const handleDelete = (tagId: string) => {
    console.log(`Delete clicked for tag: ${tagId}`);
  };

  return (
    <>
      <Stack spacing={2} width={"100%"} direction={"row"} >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            width: "100%",
            overflowX: "auto",
            p: 0.5,
          }}
        >
          {isEdit && (
            <Box sx={{ flex: "0 0 auto" }}>
              <TagButton
                onClick={() => {
                  if (showDialog) {
                    setOpenDialog(true);
                  } else {
                    setShowInlineInput(true);
                  }
                }}
              />
            </Box>
          )}

          {tags.map((tag) => (
            <Box key={tag.id} sx={{ flex: "0 0 auto" }}>
              <Tag
                label={tag.name}
                isEdit={isEdit}
                handleDelete={() => handleDelete(tag.id || "")}
              />
            </Box>
          ))}

          {showInlineInput && (
            <Box sx={{ flex: "0 0 auto" }}>
              <Tag isEdit />
            </Box>
          )}
        </Box>
      </Stack>

      {showDialog && (
        <DialogTag
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onCreateTag={() => {}}
          tags={tags}
        />
      )}
    </>
  );
};

export default TagsList;
