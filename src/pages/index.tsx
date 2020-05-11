import * as React from 'react'
import { useEffect } from 'react'
import { navigate } from 'gatsby-link'
import Layout from '~/components/layout'
// import SEO from '~/components/seo' may build this later

const Index = () => {
  useEffect(() => {
    navigate("/blog/page/1").then(resolve => resolve)
  }, [])

  return (
      <Layout>
        <p>なんかここにくる</p>
      </Layout>
  )
}

export default Index
