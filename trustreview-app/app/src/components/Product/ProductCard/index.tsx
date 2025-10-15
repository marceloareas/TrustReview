import {
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import CardImage from "../../../assets/card-image.svg";
import type { IProduct } from "../../../interfaces/Product";

const ProductCard = ({
  productData,
  onClick,
}: {
  productData?: Partial<IProduct>;
  onClick: () => void;
}) => {
  return (
    <Card
      sx={{
        width: "240px",
        height: "240px",
        borderRadius: 4,
        backgroundColor: "#fff",
        cursor: "pointer",
        flexShrink: 0,
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
      onClick={onClick}
    >
      <CardMedia
        component={"img"}
        sx={{
          objectFit: "contain",
          width: "100%",
          height: "180px",
          p: 1,
        }}
        draggable={false}
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
        <Tooltip title={productData?.name} arrow placement="top">
          <Typography variant="h6" noWrap>
            {productData?.name}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
