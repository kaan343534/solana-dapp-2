// pages/_app.js
import { SessionProvider } from "next-auth/react"
import Layout from "../components/Layout"
import { MainProvider } from "../context/mainContext"
import "../styles/globals.css"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <MainProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </MainProvider>
    </SessionProvider>
  )
}