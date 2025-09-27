import { Box } from "@mui/material";
import CardImage from "../../assets/card-image.svg";
import type { IProduct } from "../../interfaces/Product";

const ProductCard = ({ productData }: { productData?: Partial<IProduct> }) => {
  return (
    <Box
      sx={{
        width: "200px",
        height: "200px",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <Box
        component="img"
        src={productData?.imageUrl || CardImage}
        alt={productData?.imageUrl ? `${productData.name}` : "Default Image"}
        sx={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: 4,
          boxShadow: 3,
        }}
      />
    </Box>
  );
};

export default ProductCard;
