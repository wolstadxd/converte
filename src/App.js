import React, {useEffect, useState} from 'react';
import Collection from "./Collection";
import './index.scss';

const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
]

function App() {
    const [categoryId, setCategoryId] = useState(0)
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [collection, setCollection] = useState([])

    useEffect(() => {
        setIsLoading(true)

        const category = categoryId ? `category=${categoryId}` : ''

        fetch(`https://635c2bbafc2595be26422339.mockapi.io/photos?page=${page}&limit=3&${category}`)
            .then((res) => res.json())
            .then((json) => {
                setCollection(json)
            })
            .catch(err => {
                console.warn(err)
                alert('Something went wrong')
            }).finally(() => setIsLoading(false))
    }, [categoryId, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
            {
                cats.map((obj, index) => (
                    <li
                        onClick={() => setCategoryId(index)}
                        className={categoryId === index ? 'active' : ''}
                        key={obj.name}>{obj.name}</li>
                ))
            }
        </ul>
        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
          {isLoading ? (<h2>Loading...</h2>) : (
              collection.filter(obj => {
              return obj.name.toLowerCase().includes(searchValue.toLowerCase())
          }).map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
          )))
          }
      </div>
      <ul className="pagination">
          {
              [...Array(3)].map((_, index) => <li onClick={() => setPage(index + 1)} className={page === index + 1 ? 'active' : ''}>{index + 1}</li>)
          }
      </ul>
    </div>
  );
}

export default App;
