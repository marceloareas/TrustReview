import type { IProduct } from "../../interfaces/Product";
import { Box, Container, Stack, Grid } from "@mui/material";
import StylizedTitle from "../../components/Product/StylizedTitle";
import ProductSelect from "../../components/MultiSelect/TagSelect";
import darkVs from "../../assets/icons/darkVs.png";

const CompareProductsSection = ({ products }: { products: IProduct[] }) => {
    return (
        <Container maxWidth="xl">
            <Stack spacing={8} my={4} alignItems="center">
                <StylizedTitle title="Comparar Produtos" />
                <Grid container spacing={4} alignItems="center" sx={{ width: '100%' }}>
                    <Grid size={{ xs: 12, md: 5.5 }}>
                        <ProductSelect
                            names={products.map(product => product.name)}
                            value={null}
                            onChange={() => { }}
                            multiple={false}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 1 }} display="flex" justifyContent="center">
                        <Box component={'img'} src={darkVs} alt="VS" sx={{ width: 42, height: 42, objectFit: 'contain' }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 5.5 }}>
                        <ProductSelect
                            names={products.map(product => product.name)}
                            value={null}
                            onChange={() => { }}
                            multiple={false}
                        />
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
};

export default CompareProductsSection;