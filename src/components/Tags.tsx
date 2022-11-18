import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

export const Tags = ({ tags }: { tags: string[] }) => {
  if (!tags.length) return null;

  return (
    <Stack direction="row" spacing={1} margin={1} justifyContent="flex-end">
      {tags.map((tag) => (
        <Tag key={tag} size="small" label={"#" + tag} />
      ))}
    </Stack>
  );
};

const Tag = styled(Chip)(({ theme }) => ({
  "background": "none",
  "color": theme.palette.text.secondary,
  "& .MuiChip-label": {
    padding: 0,
  },
}));
