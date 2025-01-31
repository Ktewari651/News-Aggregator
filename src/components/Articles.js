"use client"
import { toggleTheme } from '@/app/store/themeSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Articles() {

  const [newsData, setNewsData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  console.log(darkMode, 'darkMode')

    useEffect(() => {
      fetchNews()
    }, [])

    async function fetchNews() {
      const apiKey = 'NkDTwHVDdfCIdCsrTSEFMjAkD3lEAt0l';
      const query = 'Tax';
      const begin_date = '20200101'; // Start date: January 1, 2022
      const end_date = '20251231';   // End date: December 31, 2023
      const sort = 'newest';         // Sort by newest
      const facet = 'true';          // Include facet counts
      
      const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&begin_date=${begin_date}&end_date=${end_date}&sort=${sort}&facet=${facet}&api-key=${apiKey}`;
      setIsLoading(true)
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        const data = await res.json();
        setNewsData(data.response.docs)
        setIsLoading(false)
        return data.response.docs;
      } catch (error) {
        console.error('Failed to fetch news:', error);
        setIsLoading(false)
      }
    }
    console.log(newsData,' newsData')

    return (
        <div className='news-box'>
          <button
            onClick={() => dispatch(toggleTheme())}
            className="btn-black"
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </button>
          {isLoading ? <p className='loading'>Loading Data.....</p> :
            <div>
              {newsData?.map((article, index) => {
                return (
                  <div className="article-card" key={index}>
                    <img src={article.multimedia && article.multimedia[0]?.url} alt={article.headline?.main} />
                    <h3>{article.headline?.main}</h3>
                    <p>{article.abstract}</p>
                    <a href={article.web_url} target="_blank" rel="noopener noreferrer">Read more</a>
                  </div>
                )
              })}
            </div>
          }
        </div>
      );
}
