import { Suspense, useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

function scrollDocumentToTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

const Layout = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.hash) return;
    scrollDocumentToTop();
  }, [location.pathname, location.search, location.hash]);

  /* Après focus / layout, certains navigateurs déplacent encore le scroll : correction différée. */
  useEffect(() => {
    if (location.hash) return;
    scrollDocumentToTop();
    let raf2 = 0;
    const raf1 = window.requestAnimationFrame(() => {
      scrollDocumentToTop();
      raf2 = window.requestAnimationFrame(scrollDocumentToTop);
    });
    return () => {
      window.cancelAnimationFrame(raf1);
      if (raf2) window.cancelAnimationFrame(raf2);
    };
  }, [location.pathname, location.search, location.hash]);

  /* Ancres (#galerie, etc.) : scroll après navigation (y compris depuis une autre page). */
  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;

    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (!el) return;

      /* #galerie : desktop = haut de section sous le header. Mobile = section en 100svh : sous header fixe
         on ne voit pas le bas (CTA) ; on vise le bas de section pour garder « Voir tout le book » dans le cadre. */
      if (id === "galerie") {
        const header = document.querySelector("header");
        const headerH = header?.getBoundingClientRect().height ?? 0;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const sectionH = rect.height;
        const vh = window.innerHeight;
        const isNarrow = window.matchMedia("(max-width: 767px)").matches;
        let y: number;
        if (isNarrow) {
          const bottomAligned = top + sectionH - vh + 20;
          const topAligned = top - headerH;
          y = Math.max(topAligned, bottomAligned);
        } else {
          y = top - headerH;
        }
        const maxY = Math.max(
          0,
          document.documentElement.scrollHeight - vh,
        );
        window.scrollTo({
          top: Math.max(0, Math.min(y, maxY)),
          behavior: "smooth",
        });
        return;
      }

      el.scrollIntoView({ behavior: "smooth" });
    };

    scrollToTarget();
    const t1 = window.setTimeout(scrollToTarget, 120);
    const t2 = window.setTimeout(scrollToTarget, 400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [location.pathname, location.hash]);

  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden">
      <Header />
      <main className="min-w-0 w-full flex-1 overflow-x-hidden">
        <Suspense
          fallback={
            <div className="min-h-[50vh] w-full bg-background" aria-hidden />
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export { Layout };
