// Person name -> photo file slug, shared by the site (Monogram) and scripts/people-photos.ts.
// "Prof. Dr. Gorazd Meško" -> "gorazd-mesko", "Dr. Vineet Kapoor (IPS)" -> "vineet-kapoor".
// Keep this module import-free: the photo script loads it directly with Node.

const HONORIFICS = /^(prof|dr|mr|ms|mrs|shri|smt)\.?$/i;

export function personSlug(name: string): string {
  return name
    .split(",")[0]! // drop trailing honours, e.g. ", Padma Shri"
    .replace(/\(.*?\)/g, "") // drop "(IPS)"
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // š -> s
    .split(/\s+/)
    .filter((w) => w && !HONORIFICS.test(w))
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
