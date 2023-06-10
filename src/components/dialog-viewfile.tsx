import {
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { getPath } from "@/libs/utils";

type Props = {
  files?: [{ _id: string; fileName: string }];
  open: boolean;
  onClose: () => void;
};

export default function ViewFileDialog({ files, open, onClose }: Props) {
  return (
    <Dialog maxWidth="xs" open={open} onClose={onClose}>
      <DialogContent>
        <Stack gap={1}>
          {files?.map((file) => (
            <Stack key={file._id} direction="row" gap={1}>
              <ImageIcon />
              <a href={getPath(file.fileName)} target="_blank">
                <Typography>{file.fileName.split("/").pop()}</Typography>
              </a>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ปิด</Button>
      </DialogActions>
    </Dialog>
  );
}
