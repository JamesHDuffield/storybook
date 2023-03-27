import Image from 'next/image';
import cloud_1 from '../../public/cloud_1.svg';
import cloud_left_1 from '../../public/cloud_left_1.png';
import cloud_left_2 from '../../public/cloud_left_2.png';
import cloud_right_1 from '../../public/cloud_right_1.png';
import cloud_right_2 from '../../public/cloud_right_2.png';
import styles from '../styles/background.module.css';

export function BackgroundClouds() {
  return (
    <>
      <Image
        className={styles.cloud}
        src={cloud_1}
        style={{ top: '30vh', left: '20vw' }}
        alt="cloud"
      ></Image>
      <Image
        className={styles.cloud}
        src={cloud_left_1}
        style={{ top: '50vh', left: 0 }}
        alt="cloud"
      ></Image>
      <Image
        className={styles.cloud}
        src={cloud_left_2}
        style={{ top: '10vh', left: 0 }}
        alt="cloud"
      ></Image>
      <Image
        className={styles.cloud}
        src={cloud_right_1}
        style={{ top: '60vh', right: 0 }}
        alt="cloud"
      ></Image>
      <Image
        className={styles.cloud}
        src={cloud_right_2}
        style={{ top: '20vh', right: 0 }}
        alt="cloud"
      ></Image>
    </>
  );
}
