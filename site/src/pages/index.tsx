import { BackgroundClouds } from '@/components/background-clouds';
import { Story } from '@/models/story';
import { stringify } from 'querystring';
import styles from '../styles/index.module.css';
import useSWR from 'swr'

const storyFetcher = async ({ page }: { page: number}) => {
  const query = stringify({
    sort: '-createdAt',
    page,
    limit: 1,
    'where[status][equals]': 'approved',
  });
  const res = await fetch(`${process.env.apiUrl}/stories?${query}`);
  const data: { docs: Story[] } = await res.json();
  return data.docs[0] ?? null;
}

export default function Home() {
  const { data, error, isLoading } = useSWR({ page: 1}, storyFetcher)
  if (error) return <center className={styles.container}>Something went wrong fetching a story.</center>
  if (isLoading) return <center className={styles.container}>Loading story...</center>
  
  const story = data;

  if (!story) {
    return (
      <div className={styles.container}>
        <h3>Sorry, no story available. Check back later.</h3>
      </div>
    );
  }

  const pages = story.content.split('\n');

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>{story.title}</h1>
        {pages.map((page, i) => (
          <p key={i} className={styles.page}>
            {page}
          </p>
        ))}
      </div>
      <BackgroundClouds/>
    </>
  );
}
