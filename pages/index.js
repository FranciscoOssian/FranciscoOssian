import Head from 'next/head'
import { Title } from '../src/Components/Title'
import { Card } from '../src/Components/Card'
import styles from '../styles/Home.module.css'

import { initializeApp } from "firebase/app"
import { getDatabase, ref, get} from "firebase/database"

export default function Home({links, description}) {


  return (
    <div className={styles.container}>

      <Head>
        <title>Francisco Ossian</title>
        <meta name="description" content="Francisco Ossian website, portifólio, links" />
        <link rel="icon" href="/faon.ico" />
      </Head>

      <main className={styles.main}>

        <Title>
          Welcome to {' '}
          <a
            href="https://github.com/FranciscoOssian/FranciscoOssian"
          >Francisco.Ossian</a>
        </Title>

        <p className={styles.description}>
          {description}
        </p>

        Get started seeing my links

        <div className={styles.grid}>
          {
            links.map(
              link => <Card
                key={link.link}
                title={link.name}
                link={link.link}
                text=""
              />
            )
          }
        </div>

      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  
  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  }
  const app = initializeApp(firebaseConfig)
  const database = getDatabase(app)
  const linksRef = ref(database, 'links')
  const descriptionRef = ref(database, 'description')
  const links = (await get(linksRef)).val()
  const description = (await get(descriptionRef)).val()
  return {
    props: {
      links: links? links : [],
      description: description? description : ''
    },
    revalidate: 100000,
  }
}