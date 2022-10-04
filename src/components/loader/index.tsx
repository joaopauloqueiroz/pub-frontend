import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box className="loader-container" sx={{ display: "flex" }}>
      <CircularProgress sx={{ color: "#fff" }} size={70} />
    </Box>
  );
}
