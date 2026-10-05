import { juiceOrange, tigerOrange } from "@/utilities/toastThemes";
import { Box, Typography } from "@mui/material";

interface GradientBannerProps {
  children: React.ReactNode;
  height?: number;
}

const GradientBanner = ({ children, height = 3 }: GradientBannerProps) => (
  <Box
    sx={{
      backgroundImage: `linear-gradient(to right, ${juiceOrange}, ${tigerOrange})`,
      width: "100%",
      paddingY: `${height}vh`,
    }}
  >
    {children}
  </Box>
);

export default GradientBanner;
