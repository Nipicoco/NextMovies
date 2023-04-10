import { Movie } from "@/utils/types";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import router, { useRouter } from 'next/router';
import { useEffect, useState } from "react";

const signOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  if (!localStorage.getItem('token')) {
    console.log('Token removed');
  }
  router.push('/login');
};


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
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const isAdmin = username === "admin";
  
  const { searchTerm, setSearchTerm, handleSearch, quality, setQuality } =
    props;

  return (
    <div className={styles.topbar}>
      <div>
        <Image
          src="https://i.imgur.com/ptYntKr.png"
          alt="Logo"
          width={140}
          height={46}
          onClick={handleClick}
          style={{cursor: 'pointer'}} 
        />
      </div>
      <div>
        <input className={styles.input}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button className={styles.searchbutton}
          onClick={handleSearch}
          title="Este boton buscara la pelicula escrita"
        >
          Search
        </button>
      </div>
      
      

      <div className={styles.qualitybox}>
        <button
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
      
      <div className={styles.signinbox}>
          <p >{username}</p>
          {isAdmin && (
            
            <button className={styles.adminbutton}
              title="Apretar para ver los usuarios"
              onClick={() => router.push("/admin")}
            >
              Users
            </button>
          
        )}
        <button
          title="Apretar para cerrar sesion"
          onClick={signOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Topbar;