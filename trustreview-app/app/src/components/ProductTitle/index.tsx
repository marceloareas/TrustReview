import { Box, Typography } from "@mui/material";
import titleBg from '../../assets/titleBg.svg';

const ProductTitle = () => {

    return (
        <Box sx={{ position: 'relative', width: '100%', mb: 2 }}>
            <Box
                component="img"
                src={titleBg}
                alt="Product Title Background"
                sx={{
                    objectFit: "cover",
                    width: '100%',
                    opacity: 0.9,
                    height: 50,
                }}
            />
            <Typography variant="h5"
                sx={{
                    position: 'absolute',
                    top: '8px',
                    left: '16px',
                    fontWeight: 'bold',
                }}>
                Produtos
            </Typography>
        </Box>

    );
}

export default ProductTitle;
