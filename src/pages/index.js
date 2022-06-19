import Head from 'next/head'
import { Title } from '../Components/pages/index/Title'
import { Description } from '../Components/pages/index/Description'
import { Page } from '../Components/common/Page'
import { Links } from '../Components/pages/index/Links'
import styles from '../../styles/Home.module.css'

import { initializeApp } from "firebase/app"
import { getDatabase, ref, get} from "firebase/database"

export default function Home({links, description}) {

  return (
    <Page>

      <Head>
        <title>Francisco Ossian</title>
        <meta name="description" content="Francisco Ossian website, portifólio, links" />
        <link rel="icon" href="/faon.ico" />
      </Head>

      <main>

        <Title>
          Welcome to {' '}
          <a
            href="https://github.com/FranciscoOssian/FranciscoOssian"
          >Francisco.Ossian</a>
        </Title>

        <Description text={description}/>

        <div className={styles.linkTitle}>Get started seeing my links</div>

        <Links links={links} />

      </main>

      <footer className={styles.footer}>
      </footer>
    </Page>
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