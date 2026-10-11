import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z, type ZodType } from "astro/zod";

export type Image = {
  src: string;
  alt?: string;
  size?: "small" | "medium" | "large" | "full";
  crop?: "natural" | "landscape" | "square" | "portrait";
};

export type Button = {
  href: string;
  title: string;
  variant?: "primary" | "secondary";
};

export type Embed = {
  provider: "calendar" | "youtube";
  src: string;
  title: string;
  size?: "small" | "medium" | "large" | "full";
  height?: "short" | "medium" | "tall";
};

export type GalleryImage = {
  src: string;
  alt?: string;
};

export type Gallery = {
  images: GalleryImage[];
  size?: "small" | "medium" | "large" | "full";
  crop?: "natural" | "landscape" | "square" | "portrait";
  controls?: boolean;
  indicators?: boolean;
  autoScroll?: boolean;
  autoScrollInterval?: number;
  pauseOnHover?: boolean;
};

export type ContentBlock =
  | {
      type: "text";
      text: string;
    }
  | (Image & {
      type: "image";
    })
  | (Button & {
      type: "button";
    })
  | (Embed & {
      type: "embed";
    })
  | (Gallery & {
      type: "gallery";
    })
  | {
      type: "block";
      color?: "navy" | "cream" | "white" | "transparent";
      variant?: "default" | "card";
      blocks?: ContentBlock[];
    }
  | {
      type: "timeline";
      timeline?: Timeline[];
    };

export type Timeline = {
  year: number | string;
  blocks?: Array<Extract<ContentBlock, { type: "block" }>>;
};

export type ContentSection = {
  color: "navy" | "cream" | "white" | "home-hero";
  heading?: string;
  layout?: "auto" | "1col" | "2cols" | "3cols" | "4cols" | "5cols";
  blocks?: ContentBlock[];
};

export type PageFrontmatter = {
  title: string;
  sections?: ContentSection[];
};

const imageSchema = z.object({
  src: z.string(),
  alt: z.string().optional(),
  size: z.enum(["small", "medium", "large", "full"]).optional(),
  crop: z.enum(["natural", "landscape", "square", "portrait"]).optional(),
});

const galleryImageSchema = z.object({
  src: z.string(),
  alt: z.string().optional(),
});

const gallerySchema = z.object({
    images: z.array(galleryImageSchema),
    size: z.enum(["small", "medium", "large", "full"]).optional(),
    crop: z.enum(["natural", "landscape", "square", "portrait"]).optional(),
    controls: z.boolean().optional(),
    indicators: z.boolean().optional(),
    autoScroll: z.boolean().optional(),
    autoScrollInterval: z.number().optional(),
    pauseOnHover: z.boolean().optional(),
});

const timelineYearsSchema = () =>
  z.array(
    z.object({
      year: z.union([z.string(), z.number()]),
      blocks: z.array(timelineBlockSchema).optional(),
    }),
  );

const contentBlockSchema: ZodType<ContentBlock> = z.lazy(
  (): ZodType<ContentBlock> =>
    z.discriminatedUnion("type", [
      z.object({
        type: z.literal("text"),
        text: z.string(),
      }),
      z.object({
        type: z.literal("image"),
        ...imageSchema.shape,
      }),
      z.object({
        type: z.literal("button"),
        href: z.string(),
        title: z.string(),
        variant: z.enum(["primary", "secondary"]).optional(),
      }),
      z.object({
        type: z.literal("embed"),
        provider: z.enum(["calendar", "youtube"]),
        src: z.string(),
        title: z.string(),
        size: z.enum(["small", "medium", "large", "full"]).optional(),
        height: z.enum(["short", "medium", "tall"]).optional(),
      }),
      z.object({
        type: z.literal("gallery"),
        ...gallerySchema.shape,
      }),
      z.object({
        type: z.literal("block"),
        color: z
          .enum(["navy", "cream", "white", "transparent"])
          .optional(),
        variant: z.enum(["default", "card"]).optional(),
        blocks: z.array(contentBlockSchema).optional(),
      }),
      z.object({
        type: z.literal("timeline"),
        timeline: timelineYearsSchema().optional(),
      }),
    ]),
);

const timelineBlockSchema = z.lazy(() =>
  contentBlockSchema.refine(
    (block): block is Extract<ContentBlock, { type: "block" }> =>
      block.type === "block",
    "Timeline entries must use type: block.",
  ),
);

const contentSectionSchema = z.object({
  color: z.enum(["navy", "cream", "white", "home-hero"]),
  heading: z.string().optional(),
  layout: z.enum(["auto", "1col", "2cols", "3cols", "4cols", "5cols"]).optional(),
  blocks: z.array(contentBlockSchema).optional(),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    sections: z.array(contentSectionSchema).optional(),
  }),
});

export const collections = {
  pages,
};
