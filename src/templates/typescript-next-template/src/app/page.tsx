import { Container } from "@UI/Container";
import { Typography } from "@UI/Typography";

export default function Home() {
  return (
    <Container ScreenType="full-screen" fullHeight asElement="main">
      <Typography asElement="h1">
        Welcome to the Next.js 15 App Router with TypeScript and Tailwind CSS
      </Typography>
    </Container>
  );
}
