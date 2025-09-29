import { Container, Grid, Stack } from "@mui/material";
import type { IProduct } from "../../interfaces/Product";
import ProductImage from "../../components/Product/ProductImage";

const ProductInfos = ({ product }: { product: Partial<IProduct> }) => {
    return (
        <Container
            maxWidth="xl"
            sx={{ height: "100%", width: "100%", py: 4 }}
        >
            <Grid container spacing={2} py={2} sx={{ width: "100%" }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <ProductImage name={product?.name} imageUrl={product?.imageUrl} />
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Stack spacing={2}>
                        <div>Product Details</div>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductInfos;