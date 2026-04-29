import { useEffect, useLayoutEffect } from "react";
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

      /* scroll-mt-* sur les sections compense le header fixe ; block:start aligne le haut de la section. */
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    scrollToTarget();
    const t1 = window.setTimeout(scrollToTarget, 120);
    const t2 = window.setTimeout(scrollToTarget, 400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [location.pathname, location.hash]);

  /* Une seule lecture HTML5 à la fois (bio, bande démo, vidéos du book…). */
  useEffect(() => {
    const onVideoPlay = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLVideoElement)) return;
      document.querySelectorAll("video").forEach((video) => {
        if (video !== target) {
          video.pause();
        }
      });
    };
    document.addEventListener("play", onVideoPlay, true);
    return () => document.removeEventListener("play", onVideoPlay, true);
  }, []);

  const layoutShellStyle = {
    display: "flex",
    flexDirection: "column" as const,
    minHeight: "100vh",
    width: "100%",
  };

  return (
    <div
      className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden"
      style={layoutShellStyle}
    >
      <Header />
      <main className="min-w-0 w-full flex-1 overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export { Layout };
