import { Helmet } from "react-helmet-async";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo-config";

type PageSeoProps = {
  title: string;
  description: string;
  /** Chemin commençant par / (ex. "/", "/book"). Absent sur les pages noindex. */
  path?: string;
  noindex?: boolean;
};

export function PageSeo({
  title,
  description,
  path,
  noindex = false,
}: PageSeoProps) {
  const canonical =
    noindex || path == null || path === ""
      ? null
      : path === "/"
        ? `${SITE_URL}/`
        : `${SITE_URL}${path}`;

  return (
    <Helmet htmlAttributes={{ lang: "fr" }} prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      <meta
        name="robots"
        content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}
      />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="508" />
      <meta property="og:image:type" content="image/png" />
      <meta
        property="og:image:alt"
        content="Benjamin Bodin — Comédien et mannequin"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
    </Helmet>
  );
}
