import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { AppButton } from "../../src/components/ui/app-button";
import { FormField } from "../../src/components/ui/form-field";
import { AuthFooterLink } from "../../src/features/auth/components/auth-footer-link";
import { AuthScreenLayout } from "../../src/features/auth/components/auth-screen-layout";
import {
  authContent,
  registerFields,
} from "../../src/features/auth/auth-content";
import { logAuthSubmission } from "../../src/features/auth/auth-logging";
import type { RegisterValues } from "../../src/features/auth/auth-types";

const content = authContent.register;

export default function RegisterScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitting },
  } = useForm<RegisterValues>({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: RegisterValues) => {
    logAuthSubmission("register", values);
    router.replace("/");
  };

  return (
    <AuthScreenLayout
      title={content.title}
      subtitle={content.subtitle}
      footer={
        <AuthFooterLink
          prompt={content.footerPrompt}
          action={content.footerAction}
          href="/login"
        />
      }
    >
      {registerFields.map((field, index) => {
        const next = registerFields[index + 1];
        return (
          <FormField
            key={field.name}
            control={control}
            returnKeyType={next ? "next" : "done"}
            submitBehavior={next ? "submit" : "blurAndSubmit"}
            onSubmitEditing={() =>
              next ? setFocus(next.name) : void handleSubmit(onSubmit)()
            }
            {...field}
          />
        );
      })}

      <AppButton
        title={content.submit}
        loading={isSubmitting}
        fullWidth
        onPress={handleSubmit(onSubmit)}
      />
    </AuthScreenLayout>
  );
}
