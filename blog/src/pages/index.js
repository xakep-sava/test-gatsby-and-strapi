import React from 'react'
// import { Link } from 'gatsby'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => (  
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <ul>
      {data.allStrapiArticles.edges.map(document => (
        <li key={document.node.id}>
          <h2><font color="#3AC1EF">
            <Link to={`/${document.node.id}`}>{document.node.title}</Link>
          </font></h2>
          <p>{document.node.content}</p>
        </li>
      ))}
    </ul>
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)
export default IndexPage
export const pageQuery = graphql`  
  query IndexQuery {
    allStrapiArticles {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`

// import Layout from '../components/layout'
// import Image from '../components/image'
// import SEO from '../components/seo'

// const IndexPage = () => (
//   <Layout>
//     <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
//     <h1>Hi people</h1>
//     <p>Welcome to your new Gatsby site.</p>
//     <p>Now go build something great.</p>
//     <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//       <Image />
//     </div>
//     <Link to="/page-2/">Go to page 2</Link>
//   </Layout>
// )

// export default IndexPage
