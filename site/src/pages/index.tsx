import { Story } from '@/models/story'
import { stringify } from 'querystring';
import styles from '../styles/index.module.css'

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
    <div className={styles.container}>
      <h1 className={styles.title}>{story.title}</h1>
      {pages.map((page, i) => (
        <p key={i}>{page}</p>
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
