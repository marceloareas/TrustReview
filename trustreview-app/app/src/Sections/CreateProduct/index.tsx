import {
    Box,
    Button,
    Container,
    Rating,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Review from '../../assets/icons/Review.svg'
import { useState } from "react";

const CreateProductSection = ({onReview}: {onReview: () => void}) => {
    const [rating, setRating] = useState<number | null>(0);
    const [comment, setComment] = useState<string>("");
    const [pros, setPros] = useState<string>("");
    const [cons, setCons] = useState<string>("");

    const handleSave = () => {
        console.log(comment, rating, pros, cons);
        onReview();
    }

    return (
        <Container maxWidth="xl">
            <Stack
                flex={1}
                spacing={3}
                justifyContent={"center"}
                alignItems={"flex-start"}
                pb={4}
            >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Typography>Review</Typography>
                    <Box component={'img'} src={Review} alt="Review" />
                </Stack>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Rating
                        name="Product rating"
                        precision={0.5}
                        value={rating}
                        size="large"
                        onChange={(_, newValue) => setRating(newValue)}
                    />
                    <Typography variant="body2">
                        {rating || ""}
                    </Typography>
                </Stack>
                <Stack sx={{ width: "100%" }}>
                    <Typography>Comment</Typography>
                    <TextField multiline
                        minRows={5} onChange={(e) => setComment(e.target.value)} />
                </Stack>
                <Stack sx={{ width: "100%" }}>
                    <Typography>Pros</Typography>
                    <TextField multiline
                        minRows={5} onChange={(e) => setPros(e.target.value)} />
                </Stack>
                <Stack sx={{ width: "100%" }}>
                    <Typography>Cons</Typography>
                    <TextField multiline
                        minRows={5} onChange={(e) => setCons(e.target.value)} />
                </Stack>
                <Box
                    width={"100%"}
                    height={"100%"}
                    display={"flex"}
                    justifyContent={"flex-end"}
                    alignItems={"flex-end"}
                >
                    <Button variant="contained" size="large" onClick={handleSave}>
                        Publicar Review
                    </Button>
                </Box>
            </Stack>
        </Container>
    );
};

export default CreateProductSection;
