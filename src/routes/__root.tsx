import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/components/site/useReveal";
import { brandButton } from "@/components/site/BrandButton";
import appCss from "../styles.css?url";

// SPEC-07: 404 e erro em português, na identidade da marca.
function NotFoundComponent() {
  return (
    <div className="texture-coal flex min-h-[70vh] items-center justify-center px-5 py-24">
      <div className="max-w-md text-center">
        <p className="eyebrow">Erro 404</p>
        <h1 className="title-display mt-5 text-5xl sm:text-6xl">Essa saiu do forno errado.</h1>
        <p className="mt-6 text-lg text-muted-foreground">A página que você procurou não existe. Volta pro começo ou vai direto no cardápio.</p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/" className={brandButton()}>Voltar pro início</Link>
          <Link to="/cardapio" className={brandButton({ variant: "outline" })}>Ver o cardápio</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="texture-coal flex min-h-screen items-center justify-center px-5 py-24">
      <div className="max-w-md text-center">
        <p className="eyebrow">Ops</p>
        <h1 className="title-display mt-5 text-4xl sm:text-5xl">A página não carregou.</h1>
        <p className="mt-6 text-lg text-muted-foreground">Deu um problema do nosso lado. Tenta de novo ou volta pro início.</p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={brandButton()}
          >
            Tentar de novo
          </button>
          <a href="/" className={brandButton({ variant: "outline" })}>Voltar pro início</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Replace these placeholders with the app's name and description when first building the app.
    // Each content route, / included, must still set its own head(). Never add og:image or
    // twitter:image here: every page without its own would inherit the root's preview image.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pizzaria O Brabo" },
      { name: "description", content: "Pizza artesanal no forno a lenha." },
      { name: "theme-color", content: "#0E0E0E" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Lato:wght@400;700&family=Playfair+Display:wght@700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useReveal();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <a href="#conteudo" className="sr-only focus:not-sr-only">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo"><Outlet /></main>
      <Footer />
    </QueryClientProvider>
  );
}
