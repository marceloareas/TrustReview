import {
  Box,
  Button,
  Container,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Review from "../../assets/icons/Review.svg";
import { useState } from "react";
import ProductImage from "../../components/Product/ProductImage";
import type { IProduct } from "../../interfaces/Product";
import TagsList from "../../components/TagList";

const CreateProduct = ({ product = {} }: { product?: Partial<IProduct> }) => {
  const [reviewRating, setReviewRating] = useState<number | null>(0);
  const [productRating, setProductRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string>("");
  const [pros, setPros] = useState<string>("");
  const [cons, setCons] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [productName, setProductName] = useState<string>("");

  const handleSave = async () => {
    console.log(comment, reviewRating, pros, cons, description, productName);
    //onReview();
  };

  return (
    <Container maxWidth="xl">
      <Stack
        flex={1}
        spacing={3}
        justifyContent={"center"}
        alignItems={"flex-start"}
        pb={4}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          sx={{ width: "100%" }}
        >
          <Box>
            <ProductImage name={product?.name} imageUrl={product?.imageUrl} />
          </Box>
          <Stack spacing={2}>
            <Typography>Product Name</Typography>
            <TextField onChange={(e) => setProductName(e.target.value)} />
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Rating
                name="Product rating"
                precision={0.5}
                value={productRating}
                size="large"
                onChange={(_, newValue) => setProductRating(newValue)}
              />
              <Typography variant="body2">{productRating || ""}</Typography>
            </Stack>
            <Typography variant="h6" fontWeight={100}>
              Tags
            </Typography>
            <TagsList tags={product?.tags || []} />
          </Stack>
        </Stack>
        <Stack spacing={1} sx={{ width: "100%" }}>
          <Typography>Description</Typography>
          <TextField
            multiline
            minRows={5}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Typography>Review</Typography>
          <Box component={"img"} src={Review} alt="Review" />
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Rating
            name="Product rating"
            precision={0.5}
            value={reviewRating}
            size="large"
            onChange={(_, newValue) => setReviewRating(newValue)}
          />
          <Typography variant="body2">{reviewRating || ""}</Typography>
        </Stack>
        <Stack spacing={1} sx={{ width: "100%" }}>
          <Typography>Comment</Typography>
          <TextField
            multiline
            minRows={5}
            onChange={(e) => setComment(e.target.value)}
          />
        </Stack>
        <Stack spacing={1} sx={{ width: "100%" }}>
          <Typography>Pros</Typography>
          <TextField
            multiline
            minRows={5}
            onChange={(e) => setPros(e.target.value)}
          />
        </Stack>
        <Stack spacing={1} sx={{ width: "100%" }}>
          <Typography>Cons</Typography>
          <TextField
            multiline
            minRows={5}
            onChange={(e) => setCons(e.target.value)}
          />
        </Stack>
        <Stack
          direction={"row"}
          spacing={4}
          justifyContent={"flex-end"}
          alignItems={"flex-end"}
          sx={{ width: "100%" }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "background.discard",
              "&:hover": {
                backgroundColor: "#e74545d2",
              },
            }}
          >
            Descartar Produto e Review
          </Button>

          <Button variant="contained" size="large" onClick={handleSave}>
            Publicar Produto e Review
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default CreateProduct;
