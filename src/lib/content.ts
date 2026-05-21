import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

/* -----------------------------------------------------------------------------
 * Schemas (CLAUDE.md §7) — strictly no `price` field anywhere.
 * Note: every image is a placeholder for now (curated Unsplash editorial), and
 * `credit` records the photographer for swap-out before launch.
 * -------------------------------------------------------------------------- */

const ImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  credit: z.string().optional(),
});

const SeoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const DestinationSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  region: z.enum([
    "GCC",
    "South Asia",
    "Southeast Asia",
    "East Asia",
    "Europe",
    "Americas",
    "Africa",
    "Saudi (Umrah)",
    "Pakistan (Domestic)",
  ]),
  heroImage: ImageSchema,
  gallery: z.array(ImageSchema).default([]),
  whenToGo: z.string(),
  relatedPackages: z.array(z.string()).default([]),
  visaCountry: z.string().optional(),
  seo: SeoSchema,
});
export type Destination = z.infer<typeof DestinationSchema> & { body: string };

export const PackageSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  category: z.enum(["Outbound", "Umrah", "Northern Areas"]),
  destinations: z.array(z.string()).default([]),
  departureCities: z.array(z.enum(["Karachi", "Lahore", "Islamabad"])).default([]),
  durationNights: z.number().int().positive(),
  heroImage: ImageSchema,
  summary: z.string(),
  whoItsFor: z.string(),
  itinerary: z
    .array(
      z.object({
        day: z.number().int().positive(),
        title: z.string(),
        body: z.string(),
      }),
    )
    .default([]),
  inclusions: z.array(z.string()).default([]),
  exclusions: z.array(z.string()).default([]),
  stays: z
    .array(
      z.object({
        name: z.string(),
        city: z.string(),
        tier: z.enum(["3-star", "4-star", "5-star"]),
      }),
    )
    .default([]),
  featured: z.boolean().default(false),
  seo: SeoSchema,
});
export type Package = z.infer<typeof PackageSchema> & { body: string };

export const VisaCountrySchema = z.object({
  slug: z.string().min(1),
  country: z.string().min(1),
  embassy: z.string(),
  requiredDocuments: z
    .array(z.object({ name: z.string(), notes: z.string().optional() }))
    .default([]),
  processingTimeDays: z.object({ min: z.number().int(), max: z.number().int() }),
  commonRejectionReasons: z.array(z.string()).default([]),
  seo: SeoSchema,
});
export type VisaCountry = z.infer<typeof VisaCountrySchema> & { body: string };

/* -----------------------------------------------------------------------------
 * Loaders — sync, build-time. Fail loud on bad frontmatter.
 * -------------------------------------------------------------------------- */

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

function readDir(subdir: string): { slug: string; raw: string }[] {
  const dir = path.join(CONTENT_ROOT, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({
      slug: f.replace(/\.mdx$/, ""),
      raw: fs.readFileSync(path.join(dir, f), "utf8"),
    }));
}

function load<T extends z.ZodTypeAny>(
  subdir: string,
  schema: T,
): (z.infer<T> & { body: string })[] {
  return readDir(subdir).map(({ slug, raw }) => {
    const { data, content } = matter(raw);
    const parsed = schema.safeParse({ ...data, slug: data.slug ?? slug });
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in ${subdir}/${slug}.mdx:\n${parsed.error.message}`,
      );
    }
    return { ...parsed.data, body: content } as z.infer<T> & { body: string };
  });
}

export const getDestinations = (): Destination[] => load("destinations", DestinationSchema);
export const getDestination = (slug: string): Destination | undefined =>
  getDestinations().find((d) => d.slug === slug);

export const getPackages = (): Package[] => load("packages", PackageSchema);
export const getPackage = (slug: string): Package | undefined =>
  getPackages().find((p) => p.slug === slug);
export const getFeaturedPackages = (): Package[] =>
  getPackages().filter((p) => p.featured);

export const getVisaCountries = (): VisaCountry[] => load("visa", VisaCountrySchema);
export const getVisaCountry = (slug: string): VisaCountry | undefined =>
  getVisaCountries().find((v) => v.slug === slug);
