import { Container } from "@/components/atoms/container";

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-8">
      <Container className="flex flex-col gap-2 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} OVI. All rights reserved.</p>
        <p>Industrial biotechnology and advanced cleaning technology.</p>
      </Container>
    </footer>
  );
};
