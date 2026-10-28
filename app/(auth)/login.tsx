import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { AppButton } from "../../src/components/ui/app-button";
import { FormField } from "../../src/components/ui/form-field";
import { DevGuestAccess } from "../../src/features/auth/components/dev-guest-access";
import { AuthFooterLink } from "../../src/features/auth/components/auth-footer-link";
import { AuthScreenLayout } from "../../src/features/auth/components/auth-screen-layout";
import { authContent, loginFields } from "../../src/features/auth/auth-content";
import { logAuthSubmission } from "../../src/features/auth/auth-logging";
import type { LoginValues } from "../../src/features/auth/auth-types";

const content = authContent.login;

export default function LoginScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitting },
  } = useForm<LoginValues>({
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: LoginValues) => {
    logAuthSubmission("login", values);
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
          href="/register"
        />
      }
    >
      {loginFields.map((field, index) => {
        const next = loginFields[index + 1];
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

      <DevGuestAccess />
    </AuthScreenLayout>
  );
}
