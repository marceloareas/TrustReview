import { Box, Typography } from "@mui/material";
import titleBg from '../../assets/titleBg.svg';

const ProductTitle = () => {

    return (
        <>
            <Box
                component="img"
                src={titleBg}
                alt="Product Title Background"
                sx={{
                    objectFit: "cover",
                    width: '100%',
                    height: 50,
                }}
            />
            <Typography variant="h5"
                sx={{
                    marginTop: '-46px',
                    paddingBottom: '46px',
                    paddingLeft: '16px',
                    fontWeight: 'bold',
                    zIndex: 1000
                }}>
                Produtos
            </Typography>
        </>

    );
}

export default ProductTitle;
