import styles from "@/styles/Index.module.css";
import Link from "next/link";
const Index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1>Welcome to our Website</h1>
        <p>This Website aims for a clean user experience, straight forward to the point and providing nice user experience,   </p>
        
        <h2>Who We Are</h2>
        <p>Our team consists of two college students, each bringing unique perspectives and skills to the table. We are dedicated to staying up-to-date with the latest trends and technologies in our field, and are committed to delivering high-quality work that exceeds our clients and teachers expectations. Whether you need a custom website, a mobile app, or help with your digital marketing strategy, we&apos;ve got you covered. Let us help you bring your ideas to life!</p>
      
        <h2>Join Us!</h2>
        <Link href="/register">
          <button className={styles.btn}>Register!</button>
        </Link>
        or  <Link href="/login">
          <button className={styles.btn}>Login!</button>
        </Link>

        <h2>Our Team</h2>
        <p> Roberto Nieves / College Student</p>
        <p> Nicolas Vergara / College Student</p>
      </div>
    </div>
  );
};

export default Index;
