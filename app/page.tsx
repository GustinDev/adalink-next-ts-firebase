export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <h1>Holaaa, soy Home</h1>
      <h2>{process.env.FIREBASE_API_KEY}</h2>
    </main>
  );
}
