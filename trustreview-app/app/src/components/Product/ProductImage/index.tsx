import { Card, CardMedia } from "@mui/material";
import CardImage from "../../../assets/card-image.svg";

const ProductImage = ({ name, imageUrl }: { name?: string; imageUrl?: string }) => {
  return (
    <Card
      sx={{
        width: "240px",
        height: "240px",
        borderRadius: 4,
        flex: 1,
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <CardMedia
        component={"img"}
        sx={{
          objectFit: "contain",
          width: "100%",
          height: "180px",
          p: 2,
        }}
        image={imageUrl || CardImage}
        title={name}
      />
    </Card>
  );
};

export default ProductImage;