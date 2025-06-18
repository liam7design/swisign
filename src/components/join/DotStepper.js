import React from "react";
import { Stack, Box } from "@mui/material";

const DotStepper = ({ count, active }) => {
  return (
    <Stack direction="row" spacing={1}>
      {Array.from({ length: count }).map((_, idx) => (
        <Box
          key={idx}
          sx={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            backgroundColor:
              idx <= active ? "primary.main" : "grey.300", // 현재 step 이하 모두 활성화
            transition: "background 0.2s"
          }}
        />
      ))}
    </Stack>
  );
}

export default DotStepper;