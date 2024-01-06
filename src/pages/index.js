import Link from "next/link";

export async function getServerSideProps() {
  const resp = await fetch(`https://jsonplaceholder.typicode.com/albums`);
  const listAlbum = await resp.json();
  return { props: { listAlbum } };
}

export default function Home({ listAlbum }) {
  const albums = listAlbum.map((album) => (
    <Link href={`/${album.id}`} className="block max-w-sm p-6 text-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      {album.title}
    </Link>
  ));
  return <div className="grid grid-cols-4 gap-3">{albums}</div>;
}
