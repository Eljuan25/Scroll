import React, { useEffect, useState } from "react";

const InfiniteScroll = () => { 

    const [items,setItems] = useState([]);
    const [hasMore,setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadMoreItems();
        window.addEventListener('scroll',handleScroll);
        return () => window.removeEventListener ('scroll',handleScroll)

    }, [] );

    const loadMoreItems = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
            .then(response => response.json())
            .then(data => {
                setItems(prevItemes => [...prevItemes, ...data]);
                if (data.length === 0 || data.length < 10) {
                    setHasMore(false);

                }
                setPage(prevPage => prevPage + 1);   

            })
            .catch(error => console.error ('Error loading items:', error));

   };

   const handleScroll= () => {
    if(window.innerHeight +  document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore){
        return;
    }
    loadMoreItems();
   };
   return (
    <div>
      <h1> Scroll</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      {hasMore && <p>Loading more items...</p>}
    </div>
  );
};


export default InfiniteScroll;