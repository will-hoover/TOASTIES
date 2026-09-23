import { juiceOrange, tigerOrange } from "@/utilities/toastThemes";
import { Box, Typography } from "@mui/material";

interface GradientStripeProps {
  text?: string;
  height?: number;
  textHeading?: "h1" | "h2" | "h3" | "h4";
}

const GradientStripe = ({
  text,
  height = 3,
  textHeading = "h1",
}: GradientStripeProps) => (
  <Box
    sx={{
      backgroundImage: `linear-gradient(to right, ${juiceOrange}, ${tigerOrange})`,
      width: "100%",
      paddingY: `${height}vh`,
    }}
  >
    <Typography
      variant={textHeading}
      align="center"
      sx={{ fontWeight: 400, color: "white" }}
    >
      {text}
    </Typography>
  </Box>
);

export default GradientStripe;
