import Head from 'next/head'
import HeroSection from '../components/HeroSection'
import ScheduleTable from '../components/ScheduleTable'

export default function Home() {
  return (
    <>
      <Head>
        <title>React Conference</title>
        <meta name="description" content="React Conference" />
      </Head>
      {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
      <HeroSection />
      <ScheduleTable />
    </>
  )
}
