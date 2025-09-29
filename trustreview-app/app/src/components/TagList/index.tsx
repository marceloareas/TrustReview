import { Stack } from "@mui/material";
import Tag from "../Tag";
import type { ITag } from "../../interfaces/Product";

const TagsList = ({ tags, isEdit }: { tags: ITag[]; isEdit?: boolean }) => {
  const handleDelete = (tagId: string) => {
    console.log(`Delete clicked for tag: ${tagId}`);
  };

  return (
    <Stack
      direction={"row"}
      justifyContent={"flex-start"}
      width={"100%"}
      spacing={1}
      flexWrap={"wrap"}
    >
      {tags.map((tag) => (
        <Tag
          key={tag.id}
          label={tag.name}
          isEdit={isEdit}
          handleDelete={() => handleDelete(tag.id || "")}
        />
      ))}
    </Stack>
  );
};

export default TagsList;
