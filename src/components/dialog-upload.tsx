import {
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  CircularProgress,
  Box,
} from "@mui/material";
import { useState } from "react";
import { MuiFileInput } from "mui-file-input";
import { IEmployee } from "@/models/employee";
import { api } from "@/libs/fetch";
import { IPayroll } from "@/models/payroll";
import Image from "next/image";

type Props = {
  employee?: IEmployee;
  payroll?: IPayroll;
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
};

export default function UploadDialog({
  employee,
  payroll,
  open,
  onClose,
  onSaved,
}: Props) {
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  function handleChange(selectedFile: File | null) {
    const accept = ["image/jpeg", "image/png", "image/gif"];
    if (selectedFile && accept.includes(selectedFile.type)) {
      const fileReader = new FileReader();
      fileReader.onload = (evt) => {
        if (evt.target) {
          const { result } = evt.target;
          setPreview(result as string);
        }
      };
      fileReader.readAsDataURL(selectedFile as Blob);
    }
    setFile(selectedFile);
  }

  function handleSubmit() {
    if (!file) return;

    setSaving(true);
    const data = new FormData();
    data.set("media", file as Blob);
    let promise;
    if (employee)
      promise = api.post(`/api/employee/${employee._id}/media`, data);
    else promise = api.post(`/api/payroll/${payroll?._id}/media`, data);
    promise.then(() => {
      onSaved();
      setFile(null);
      setSaving(false);
    });
  }

  return (
    <Dialog maxWidth="xs" open={open} onClose={onClose}>
      <DialogContent>
        <MuiFileInput value={file} onChange={handleChange} />
        {file && preview && (
          <Box sx={{ position: "relative", height: 200, marginTop: 2 }}>
            <Image
              alt="preview"
              src={preview}
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {saving ? (
          <CircularProgress size={20} />
        ) : (
          <>
            <Button onClick={onClose}>ยกเลิก</Button>
            <Button onClick={handleSubmit}>บันทึก</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
