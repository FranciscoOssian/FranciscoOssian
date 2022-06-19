import Head from 'next/head'
import { TyperWriter } from '../src/Components/TyperWriter'
import { Title } from '../src/Components/Title'
import { Card } from '../src/Components/Card'
import styles from '../styles/Home.module.css'

import { useEffect } from 'react'

import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue} from "firebase/database"

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
  let links = []
  let description = '';
  onValue( linksRef, (snapshot) => {
    const data = snapshot.val()
    links = data
  })
  onValue( descriptionRef, (snapshot) => {
    const data = snapshot.val()
    description = data
  })
  return {
    props: {
      links,
      description: description
    },
    revalidate: 100000,
  }
}