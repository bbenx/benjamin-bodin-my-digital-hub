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
    scrollDocumentToTop();
  }, [location.pathname, location.search]);

  /* Après focus / layout, certains navigateurs déplacent encore le scroll : correction différée. */
  useEffect(() => {
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
  }, [location.pathname, location.search]);

  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden">
      <Header />
      <main className="min-w-0 w-full flex-1 overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export { Layout };
