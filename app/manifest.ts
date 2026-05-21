import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             'SVH Review Request',
    short_name:       'SVH Review',
    description:      'Send a Google Review request to a patient',
    start_url:        '/send',
    display:          'standalone',
    background_color: '#ffffff',
    theme_color:      '#f47216',
    icons: [
      {
        src:     '/icon',
        sizes:   '192x192',
        type:    'image/png',
      },
      {
        src:     '/icon',
        sizes:   '512x512',
        type:    'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
