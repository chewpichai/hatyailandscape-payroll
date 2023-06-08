"use client";
import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Container, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Unstable_Grid2";
import { InputField, SelectInput } from "./fields";
import { IUser } from "@/models/user";
import { api } from "@/libs/fetch";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  type: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
});

type Props = { user?: IUser; onSaved?: () => void };

function UserForm({ user, onSaved }: Props) {
  const [saving, setSaving] = useState(false);
  const { control, handleSubmit, watch, reset } = useForm<IUser>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  function onSubmit(data: IUser) {
    setSaving(true);
    let promise;
    if (user) promise = api.put(`/api/user/${user._id}`, data);
    else promise = api.post("/api/user", data);
    promise.then(({ data }) => {
      setSaving(false);
      onSaved && onSaved();
    });
  }

  return (
    <Container component={Paper} maxWidth="sm" className="py-4">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <SelectInput
            control={control}
            name="type"
            label="ประเภท"
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
            ]}
          />
        </Grid>
        <Grid xs={12}>
          <InputField control={control} name="username" label="ชื่อผู้ใช้" />
        </Grid>
        <Grid xs={12}>
          <InputField control={control} name="password" label="รหัสผ่าน" />
        </Grid>
      </Grid>

      <div className="flex mt-4">
        {saving ? (
          <CircularProgress className="ml-auto" />
        ) : (
          <Button
            className="ml-auto"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            บันทึก
          </Button>
        )}
      </div>
    </Container>
  );
}

export default UserForm;
