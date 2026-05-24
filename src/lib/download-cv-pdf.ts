import { createElement } from "react";

const PDF_FILENAME = "benjamin-bodin-fiche-artiste.pdf";

/** Génère et télécharge le PDF à partir de cv-data (chargement à la demande). */
export async function downloadCvPdf(): Promise<void> {
  const [{ pdf }, { CvPdfDocument }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("@/lib/cv-pdf-document"),
  ]);

  const blob = await pdf(createElement(CvPdfDocument)).toBlob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = PDF_FILENAME;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
