import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { DateField } from "@mui/x-date-pickers";

type InputFieldProps = {
  control: Control<any>;
  name: string;
  label: string;
  disabled?: boolean;
  type?: string;
  format?: string;
};

type SelectInputProps = InputFieldProps & {
  options: { label: string; value: any }[];
};

export function InputField({
  control,
  name,
  label,
  disabled,
  type,
}: InputFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          variant="outlined"
          label={label}
          value={value}
          onChange={onChange}
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          fullWidth
          disabled={disabled}
          type={type}
        />
      )}
    />
  );
}

export function DateInputField({
  control,
  name,
  label,
  format = "DD/MM/YYYY",
}: InputFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <DateField
          variant="outlined"
          label={label}
          value={value}
          onChange={onChange}
          format={format}
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          fullWidth
        />
      )}
    />
  );
}

export function CheckboxInput({ control, name, label }: InputFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          className="mr-0"
          control={<Checkbox checked={value || false} onChange={onChange} />}
          label={label}
        />
      )}
    />
  );
}

export function SelectInput({
  control,
  name,
  label,
  options,
  disabled,
}: SelectInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControl fullWidth size="small">
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            value={value || ""}
            onChange={onChange}
            disabled={disabled}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
