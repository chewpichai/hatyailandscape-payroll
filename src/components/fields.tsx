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
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { invalid } }) => (
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
          error={invalid}
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
      render={({ field: { onChange, value }, fieldState: { invalid } }) => (
        <DateField
          variant="outlined"
          label={label}
          value={value}
          onChange={onChange}
          format={format}
          InputLabelProps={{
            shrink: true,
            error: invalid,
          }}
          size="small"
          fullWidth
          InputProps={{ error: invalid }}
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
      render={({ field: { onChange, value }, fieldState: { invalid } }) => (
        <FormControl fullWidth size="small">
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            value={value || ""}
            onChange={onChange}
            disabled={disabled}
            error={invalid}
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
