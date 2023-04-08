import { Movie } from "@/utils/types";
import Image from "next/image";

type TopbarProps = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  handleSearch: () => void;
  quality: string;
  setQuality: (quality: string) => void;
  displayedMovies?: Movie[];
};
const handleClick = () => {
  window.location.reload();
};

function Topbar(props: TopbarProps) {
  const { searchTerm, setSearchTerm, handleSearch, quality, setQuality } =
    props;

  return (
    <div className="topbar">
      <div>
        <Image
          src="https://i.imgur.com/ptYntKr.png"
          alt="Logo"
          width={140}
          height={40}
          onClick={handleClick}
          style={{cursor: 'pointer'}} 
        />
      </div>
      <div>
        <input className="input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button className="searchbutton"
          onClick={handleSearch}
          title="Este boton buscara la pelicula escrita"
        >
          Search
        </button>
      </div>
      <div className="qualitybox">
        <button className="qualitybutton button"
          title="Apretar para cambiar la calidad del torrent a 1080p o 2160p o 720p"
          onClick={() => {
            if (quality === "720p") {
              setQuality("1080p");
            } else if (quality === "1080p") {
              setQuality("2160p");
            } else {
              setQuality("720p");
            }
          }}
        >
          {quality}
        </button>
      </div>
      <div className="signinbox">
        <button >Sign In</button>
      </div>
    </div>
  );
}

export default Topbar;
