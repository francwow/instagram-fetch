import Image from "next/image";

async function getData() {
 let url = `https://graph.instagram.com/me/media?fields=id,media_url&access_token=${process.env.INSTAGRAM_TOKEN}`;
 const res = await fetch(url);
 // The return value is *not* serialized
 // You can return Date, Map, Set, etc.

 if (!res.ok) {
  // This will activate the closest `error.js` Error Boundary
  throw new Error("Failed to fetch data");
 }

 return res.json();
}

export default async function Home() {
 const data = await getData();
 const feed = data.data;
 console.log(feed);

 return (
  <>
   {feed && (
    <div>
     <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      {feed.map((item: any) => {
       return (
        <div key={item.id}>
         <Image
          src={item.media_url}
          alt="caption"
          width={600}
          height={600}
          priority
         />
        </div>
       );
      })}
     </main>
    </div>
   )}
  </>
 );
}
