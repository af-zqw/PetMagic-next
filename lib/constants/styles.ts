import { StylePreset } from '@/types/api';

export interface StyleOption {
  value: StylePreset;
  label: string;
  icon: string;
}

export const STYLE_PRESETS: StyleOption[] = [
  {
    value: 'superhero',
    label: 'Superhero',
    icon: '🦸',
  },
  {
    value: 'anime',
    label: 'Healing Anime',
    icon: '🎌',
  },
  {
    value: 'cyberpunk',
    label: 'Cyberpunk',
    icon: '�',
  },
  {
    value: 'pixel-art',
    label: 'Pixel Art',
    icon: '�',
  },
  {
    value: 'custom',
    label: 'Custom',
    icon: '✨',
  },
];
