import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z, type ZodType } from "astro/zod";

export type ImageData = {
  src: string;
  alt?: string;
  size?: "small" | "medium" | "large" | "full";
  crop?: "natural" | "landscape" | "square" | "portrait";
};

export type ButtonData = {
  href: string;
  title: string;
  type?: string;
};

export type EmbedData = {
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

export type GalleryData =
  | GalleryImage[]
  | {
      images?: GalleryImage[];
    };

export type BlockGroupData = {
  color?: "navy" | "cream" | "white" | "transparent";
  blocks?: ContentBlockData[];
};

export type ContentBlockData = {
  type?: "text" | "image" | "button" | "embed" | "gallery" | "timeline" | "block";
  text?: string;
  image?: ImageData;
  button?: ButtonData;
  embed?: EmbedData;
  gallery?: GalleryData;
  block?: BlockGroupData;
  years?: TimelineYear[];
};

export type TimelineYear = {
  year: number | string;
  blocks?: Array<{
    block?: BlockGroupData;
  }>;
};

export type Section = {
  color: "navy" | "cream" | "white" | "home-hero";
  heading?: string;
  layout?: "auto" | "1col" | "2cols" | "3cols" | "4cols" | "5cols";
  blocks?: ContentBlockData[];
};

export type PageFrontmatter = {
  title: string;
  sections?: Section[];
};

const imageSchema = z.object({
  src: z.string(),
  alt: z.string().optional(),
  size: z.enum(["small", "medium", "large", "full"]).optional(),
  crop: z.enum(["natural", "landscape", "square", "portrait"]).optional(),
});

const buttonSchema = z.object({
  href: z.string(),
  title: z.string(),
  type: z.string().optional(),
});

const embedSchema = z.object({
  provider: z.enum(["calendar", "youtube"]),
  src: z.string(),
  title: z.string(),
  size: z.enum(["small", "medium", "large", "full"]).optional(),
  height: z.enum(["short", "medium", "tall"]).optional(),
});

const galleryImageSchema = z.object({
  src: z.string(),
  alt: z.string().optional(),
});

const gallerySchema = z.union([
  z.array(galleryImageSchema),
  z.object({
    images: z.array(galleryImageSchema).optional(),
  }),
]);

const timelineYearsSchema = () =>
  z.array(
    z.object({
      year: z.union([z.string(), z.number()]),
      blocks: z
        .array(
          z.object({
            block: z
              .lazy(
                (): ZodType<BlockGroupData> =>
                  z.object({
                    color: z
                      .enum(["navy", "cream", "white", "transparent"])
                      .optional(),
                    blocks: z.array(contentBlockSchema).optional(),
                  }),
              )
              .optional(),
          }),
        )
        .optional(),
    }),
  );

const contentBlockSchema: ZodType<ContentBlockData> = z.lazy(
  (): ZodType<ContentBlockData> =>
  z.object({
    type: z
      .enum(["text", "image", "button", "embed", "gallery", "timeline", "block"])
      .optional(),
    text: z.string().optional(),
    image: imageSchema.optional(),
    button: buttonSchema.optional(),
    embed: embedSchema.optional(),
    gallery: gallerySchema.optional(),
    block: z
      .object({
        color: z.enum(["navy", "cream", "white", "transparent"]).optional(),
        blocks: z.array(contentBlockSchema).optional(),
      })
      .optional(),
    years: timelineYearsSchema().optional(),
  }),
);

const sectionSchema = z.object({
  color: z.enum(["navy", "cream", "white", "home-hero"]),
  heading: z.string().optional(),
  layout: z.enum(["auto", "1col", "2cols", "3cols", "4cols", "5cols"]).optional(),
  blocks: z.array(contentBlockSchema).optional(),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    sections: z.array(sectionSchema).optional(),
  }),
});

export const collections = {
  pages,
};
