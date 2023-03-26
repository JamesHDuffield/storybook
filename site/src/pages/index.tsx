import { Story } from '@/models/story'
import { stringify } from 'querystring';
import styles from '../styles/index.module.css'
import Image from 'next/image'
import cloud_1 from '../../public/cloud_1.svg'
import cloud_left_1 from '../../public/cloud_left_1.png'
import cloud_left_2 from '../../public/cloud_left_2.png'
import cloud_right_1 from '../../public/cloud_right_1.png'
import cloud_right_2 from '../../public/cloud_right_2.png'

interface IProps {
  story: Story | null,
}

export default function Home({ story }: IProps) {

  if (!story) {
    return <div className={styles.container}><h3>Sorry, no story available. Check back later.</h3></div>
  }

  const pages = story.content.split('\n');

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
    <div className={styles.container}>
      <h1 className={styles.title}>{story.title}</h1>
      {pages.map((page, i) => (
        <p key={i} className={styles.page}>{page}</p>
      ))}
    </div>
    </>
  )
}

export async function getServerSideProps(): Promise<{ props: IProps }> {
  const query = stringify({ sort: '-createdAt', page: 1, limit: 1, 'where[status][equals]': 'approved' })
  const res = await fetch(`${process.env.API_URL}/stories?${query}`);
  const data: { docs: Story[] } = await res.json();
  return { props: { story: data.docs[0] ?? null } }
}
