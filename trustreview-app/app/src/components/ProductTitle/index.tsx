import { Box, Typography } from "@mui/material";
import titleBg from "../../assets/titleBg.svg";

const ProductTitle = () => {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        component="img"
        src={titleBg}
        alt="Product Title Background"
        sx={{
          position: "relative",
          objectFit: "cover",
          width: "100%",
          opacity: 0.9,
          height: 60,
        }}
      />
      <Typography
        variant="h4"
        sx={{
          position: "absolute",
          top: "8px",
          left: "16px",
          fontWeight: "bold",
          color: "primary.contrastText",
        }}
      >
        Produtos
      </Typography>
    </Box>
  );
};

export default ProductTitle;
