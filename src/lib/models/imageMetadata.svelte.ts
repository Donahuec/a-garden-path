import type { Picture } from '@sveltejs/enhanced-img';
import { SvelteMap } from 'svelte/reactivity';

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

export class ImageMap {
  imageData: SvelteMap<number, ImageData> = $state(new SvelteMap<number, ImageData>());
  get imageMetadata(): Record<string, ImageMetadata> {
    return this.imageMetadataImport.images;
  }

  public constructor(
    public imageModules: Record<string, Picture>,
    public imageMetadataImport: ImageMetadataImport,
    // By setting a start index, we allow more than one gallery on a page
    public startIndex: number = 0
  ) {
    Object.entries(imageModules).forEach(([_path, image], i) => {
      const meta = this.getImageMeta(_path);
      if (meta) {
        const index = i + startIndex;
        this.imageData.set(index, new ImageData(image, meta));
      }
    });
  }

  public getValue(key: number): ImageData {
    return this.imageData.get(key);
  }

  public get count(): number {
    return this.imageData.size;
  }

  public get maxIndex(): number {
    return this.startIndex + this.count - 1;
  }

  private getImageName(path: string): string {
    let split = path.split('/');
    let fileName = split[split.length - 1];
    return fileName.split('.')[0];
  }

  private getImageMeta(path: string): ImageMetadata {
    return this.imageMetadata[this.getImageName(path)];
  }
}
