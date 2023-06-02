import { Stack, Button, Container } from "@mui/material";
import { InputField } from "./fields";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/auth";

type LoginFormData = {
  username: string;
  password: string;
};

export function LoginForm() {
  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: { username: "", password: "" },
  });
  const auth = useAuth();

  function onSubmit(data: LoginFormData) {
    auth?.login(data);
  }

  return (
    <Container className="w-[300px] mt-8">
      <Stack rowGap={1}>
        <InputField control={control} label="ชื่อผู้ใช้" name="username" />
        <InputField
          control={control}
          label="รหัสผ่าน"
          name="password"
          type="password"
        />
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          เช้าสู่ระบบ
        </Button>
      </Stack>
    </Container>
  );
}
