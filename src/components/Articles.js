"use client"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/app/store/themeSlice';
import Search from './Search';

export default function Articles() {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const handleSearch = (query) => {
    setSearch(query);
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch) {
      fetchNews(debouncedSearch);
    }
  }, [debouncedSearch]);

  async function fetchNews(query) {
    const apiKey = 'NkDTwHVDdfCIdCsrTSEFMjAkD3lEAt0l';
    const begin_date = '20200101';
    const end_date = '20251231';
    const sort = 'newest';
    const facet = 'true';

    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&begin_date=${begin_date}&end_date=${end_date}&sort=${sort}&facet=${facet}&api-key=${apiKey}`;
    setIsLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      const data = await res.json();
      setNewsData(data.response.docs);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      setIsLoading(false);
    }
  }

  return (
    <div className="news-box">
      <Search onSearch={handleSearch} />
      <button
        onClick={() => dispatch(toggleTheme())}
        className="btn-black"
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>
      {isLoading ? (
        <p className="loading">Loading Data.....</p>
      ) : (
        <div>
          {newsData?.map((article, index) => (
         <div className="article-card" key={index}>
         { console.log(article)}
         <img
           src={
             article.multimedia && article.multimedia.length > 0
               ? `https://static01.nyt.com/${article.multimedia[0]?.url}`
               : '/path/to/default-image.jpg' 
           }
           alt={article.headline?.main || 'Article Image'}
         />
         <h3>{article.headline?.main}</h3>
         <p>{article.abstract}</p>
         <a
           href={article.web_url}
           target="_blank"
           rel="noopener noreferrer"
         >
           Read more
         </a>
       </div>
          ))}
        </div>
      )}
    </div>
  );
}
