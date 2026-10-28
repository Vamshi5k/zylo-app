import { Link, type Href } from "expo-router";
import { AppText } from "../../../components/ui/app-text";

type AuthFooterLinkProps = {
  prompt: string;
  action: string;
  href: Href;
};

/** "Already have an account? Sign in" row; replaces so login and signup don't stack. */
export function AuthFooterLink({ prompt, action, href }: AuthFooterLinkProps) {
  return (
    <>
      <AppText variant="body" color="textSecondary">
        {prompt}
      </AppText>
      <Link href={href} replace accessibilityRole="link">
        <AppText variant="fieldLabel">{action}</AppText>
      </Link>
    </>
  );
}
