import { Movie } from "@/utils/types";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const handleClick = () => {
  window.location.reload();
};

function TopbarRegister() {


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
      
      <div className={styles.signinbox}>
        
        <Link href="/login">
              <button>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default TopbarRegister;
