import { FC, PropsWithChildren } from "react";
import Stack from "@mui/material/Stack";

export const Column: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack gap={1} p={1}>
      {children}
    </Stack>
  );
};
