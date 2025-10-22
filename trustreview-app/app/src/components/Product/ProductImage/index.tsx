import { Card, CardMedia } from "@mui/material";
import CardImage from "../../../assets/images/card-image.svg";

const ProductImage = ({
  name,
  imageUrl,
}: {
  name?: string;
  imageUrl?: string;
}) => {
  return (
    <Card
      sx={{
        width: "240px",
        height: "240px",
        borderRadius: 4,
        flex: 1,
      }}
    >
      <CardMedia
        component={"img"}
        sx={{
          objectFit: "contain",
          width: "100%",
          p: 2,
        }}
        draggable={false}
        image={imageUrl || CardImage}
        title={name}
      />
    </Card>
  );
};

export default ProductImage;
