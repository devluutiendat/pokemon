import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    "name": "pokemon",
    "short_name": "pokemon",
    "icons": [
      {
        "src": "/apple-icon.png",
        "sizes": "96x96",
        "type": "image/png"
      },
    ],
    "start_url": "/",
    "display": "standalone",
    "background_color": "#00ffff",
    "theme_color": "#00ffff",
    "prefer_related_applications": true,
    "related_applications": [
      {
        "platform": "play",
        "url":"http:/localhost:3000",
        "id": "com.pokemon.vn"
      }
    ]
  }
}