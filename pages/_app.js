import React from "react"
import { Component } from "react";
import Head from "next/head"
import styles from "../styles/Home.module.css"

class App extends Component {
  componentDidMount(){
  const {url} = this.props
  if (url !== "/") Router.replace(`https://forever-love-animals.com${url}`);

  }

  static async getInitialProps({ctx}) {
    const url = ctx.asPath
    if (url === "/") return { url };

    const slug = url.replace(/\/\d{4}\/\d{2}\/\d{2}\//, '');
    const graphQlUrl = "https://forever-love-animals.com/backend"
    const query = `
    query MyQuery {
      postBy(slug: "${slug}") {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        seo{
          title
          canonical
          opengraphDescription
        }
      } 
    }
    `
    const res = await fetch(graphQlUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    })
    const {data} = await res.json()

  
    return {
      url,
      title: data.postBy.title,
      image: data.postBy.featuredImage?.node?.sourceUrl,
      description: data.postBy.seo.opengraphDescription,
      canonical: data.postBy.seo.canonical,
    };
  }

render() {

  const {title, image, description, canonical} = this.props

    return(
  <div className={styles.container}>
  <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title}</title>
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`"${title}"`} />
                <meta property="og:description" content={`"${description}"`} />
                <meta property="og:url" content= {`"${canonical}"`} />
                <meta property="og:site_name" content="Forever" />
                <meta property="article:section" content="Animal" />
                <meta property="og:image" content={`"${image}"`}/>
                <meta property="og:image:alt" content="" />
       
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n   img { width: 100%; height: auto; }\n          ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; background-color: #333; }\n                  li {float: left; }\n                  li a { display: block; color: white; text-align: center; padding: 14px 16px; text-decoration: none; }\n                  li a:hover:not(.active) { background-color: #111; }\n                  .active { background-color: #4CAF50; }\n       "
    }}
  />
      </Head>
      {this.props.children}
    <div>
 </div>
</div>
)
  }
}
export default App;