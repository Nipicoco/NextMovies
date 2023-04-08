export type Movie = {
    id: number;
    title: string;
    year: number;
    rating: number;
    description_full: string;
    medium_cover_image: string;
    torrents: Torrent[];
    
  };
  
  export type Torrent = {
    url: string;
    hash: string;
    quality: string;
    type: string;
    seeds: number;
    peers: number;
    size: string;
    size_bytes: number;
    date_uploaded: string;
    date_uploaded_unix: number;
  };
  