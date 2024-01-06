import Image from "next/image";

export async function getStaticPaths() {
  const resp = await fetch(`https://jsonplaceholder.typicode.com/photos`);
  const albums = await resp.json();
  const albumId = albums.map((album) => ({ params: { albumId: String(album.id) } }));
  return { paths: albumId, fallback: false };
}

export async function getStaticProps(router) {
  const resp = await fetch(` https://jsonplaceholder.typicode.com/photos?albumId=${router.params.albumId}`);
  const albumSelect = await resp.json();
  return { props: { albumSelect } };
}

export default function HomePage({ albumSelect }) {
  //   console.log(typeof albumSelect[0].url);
  const selectedAlbum = albumSelect.map((item) => (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image src={`${item.url}`} width={500} height={500} alt="Picture of the author" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{item.title}</div>
        <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
      </div>
    </div>
  ));
  return <div className="grid grid-cols-2 gap-3 ml-px">{selectedAlbum}</div>;
}
