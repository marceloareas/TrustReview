import { Box } from "@mui/material";
import CardImage from '../../assets/card-image.svg';
import type { IProduct } from "../../interfaces/Product";

const ProductCard = ({ productData }: { productData?: Partial<IProduct> }) => {

    return (
        <Box sx={{
            cursor: 'pointer', "&:hover": {
                transform: 'scale(1.02)',
            }
        }}>
            <Box
                component="img"
                src={productData?.imageUrl || CardImage}
                alt={productData?.imageUrl ? `${productData.name}` : "Default Image"}
                sx={{
                    objectFit: "cover",
                    width: 120,
                    height: 120,
                    borderRadius: 4,
                }}
            />
        </Box>
    );
}

export default ProductCard;
