import { Movie } from "@/utils/types";
import Image from "next/image";
import styles from "@/styles/Home.module.css";


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
        
        <button >Login</button>
      </div>
    </div>
  );
}

export default TopbarRegister;
