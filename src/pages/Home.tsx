import { useEffect, useState } from "react";
import ArticleData from "../Data/ArticleData";
import { retrieve_articles_success_msg } from "../components/messages";
import '../styles/Home.css';

function Home() {
    const [articles, setArticles] = useState<ArticleData[]>([]);

    useEffect(() => {
        fetch('http://localhost:5223/api/articles')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          
          return response.text();
        })
        .then((text) => {
          const body = JSON.parse(text);

          if (body.Message !== retrieve_articles_success_msg) {
            throw new Error(`Error: ${body.Message}`);
          }

          return body.Articles;
        })
        .then((data) => {
          setArticles(data)
        })
        .catch((error) => console.error('Error fetching articles:', error));
    }, []);

    return (
      <div className="App-background App">
        <header className="App-header">Articles</header>
        <small>{articles.length} ARTICLE{articles.length === 1 ? '' : 'S'} FOUND</small>
        <div className="Articles-section">
          {articles.length > 0 ? (
              <div>
              {articles.map((article) => {
                  return <Article data={article}/>
              })}
              </div>
          ) : (
              <p>No articles found...</p>
          )}
          </div>
      </div>
    );
}

function Article ({ data }: { data: ArticleData }) {
  const summarySplit = data.summary.split("\n");

  return (
    <article key={data.id} className="Article">
      <footer>
        <small>Published on {data.date}<br/>By {data.publisher}</small>
        {/* // TOOD: add delete and update functionality 
        <button className="delete" onClick={handleDelete}>Delete</button> */}
      </footer>
      <h2>{data.title}</h2>
      <div className="border"></div>
      <div>
        { summarySplit.map((line) => {
          return <p>{line}</p>
        })}
      </div>
    </article>
  );
}

// TODO: add delete and update functionality
/*
const handleDelete = (id) => {

}
*/

export default Home;