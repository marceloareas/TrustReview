import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import CardImage from "../../../assets/card-image.svg";
import type { IProduct } from "../../../interfaces/Product";

const ProductCard = ({ productData }: { productData?: Partial<IProduct> }) => {
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
        image={productData?.imageUrl || CardImage}
        title={productData?.name}
      />
      <CardContent
        sx={{
          textAlign: "flex-start",
          width: "100%",
          bgcolor: "background.cardContent",
        }}
      >
        <Typography variant="h6" noWrap>
          {productData?.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
