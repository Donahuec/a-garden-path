import type { Picture } from '@sveltejs/enhanced-img';

export interface ImageMetadata {
  fileName: string;
  title: string;
  alt: string;
  description?: string;
  location?: string;
  date?: string;
  tags?: string[];
}

export interface ImageMetadataImport {
  images: Record<string, ImageMetadata>;
}

export class ImageData {
  public image: Picture;
  public metadata: ImageMetadata;

  constructor(image: Picture, metadata: ImageMetadata) {
    this.image = image;
    this.metadata = metadata;
  }

  public get alt(): string {
    return this.metadata.alt || '';
  }

  public get title(): string {
    return this.metadata.title || 'Untitled';
  }

  public get description(): string {
    return this.metadata.description || this.alt;
  }
}
