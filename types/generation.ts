// Generation Data Types

import { StylePreset } from './api';

export interface GeneratedImage {
  id: string;
  url: string;
  style: StylePreset;
  prompt?: string;
  createdAt: Date;
  thumbnailUrl?: string;
}

export interface GeneratedVideo {
  id: string;
  url: string;
  style: StylePreset;
  prompt?: string;
  duration: number;
  createdAt: Date;
  thumbnailUrl?: string;
}

export interface GenerationHistory {
  images: GeneratedImage[];
  videos: GeneratedVideo[];
}
