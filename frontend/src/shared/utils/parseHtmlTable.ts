/** Parses an HTML <table> string into headers + rows (textContent only, no HTML is injected). */
export function parseHtmlTable(html: string | null | undefined) {
  if (!html) return { headers: [] as string[], rows: [] as string[][] };

  const doc = new DOMParser().parseFromString(html, "text/html");
  const clean = (el: Element) => (el.textContent ?? "").replace(/\s+/g, " ").trim();

  const headers = Array.from(doc.querySelectorAll("thead th")).map(clean);
  const rows = Array.from(doc.querySelectorAll("tbody tr"))
    .map((tr) => Array.from(tr.querySelectorAll("td")).map(clean))
    .filter((row) => row.some(Boolean));

  return { headers, rows };
}