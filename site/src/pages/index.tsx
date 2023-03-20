import { Story } from '@/models/story'
import { stringify } from 'querystring';

interface IProps {
  story?: Story,
}

export default function Home({ story }: IProps) {
  if (!story) {
    return <div>No story available</div>
  }
  return (
    <>
    <div>
      <h1>{story.title}</h1>
      <p>{story.content}</p>
    </div>
    </>
  )
}

export async function getServerSideProps(): Promise<{ props: IProps }> {
  const query = stringify({ sort: '-createdAt', limit: 1, where: '[status][equals]=approved' })
  const res = await fetch(`${process.env.API_URL}/stories?${query}`);
  const data: { docs: Story[] } = await res.json();
  return { props: { story: data.docs[0] } }
}
