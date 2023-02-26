import BaseLayout from "../../components/BaseLayout";
import { Header } from "../../components/Header";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <BaseLayout>
      <Header></Header>
      {children}
    </BaseLayout>
  );
}
