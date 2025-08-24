import { useQuery } from 'react-query';
import { useState } from 'react';

function fetchPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());
}

export default function PostsComponent() {
  const [lastFetched, setLastFetched] = useState(null);

  const {
    data,
    error,
    isLoading,
    refetch,
    isFetching,
    isError,
  } = useQuery('posts', fetchPosts, {
    cacheTime: 1000 * 60 * 5, // cache data for 5 minutes
    staleTime: 1000 * 30,     // data is fresh for 30 seconds
    refetchOnWindowFocus: false, // don't refetch when window regains focus
    keepPreviousData: true,   // keep previous data while fetching new data
  });

  const handleRefetch = async () => {
    await refetch();
    setLastFetched(new Date().toLocaleTimeString());
  };

  if (isLoading) return <div>Loading posts...</div>;
  if (isError) return <div>Error fetching posts: {error.message}</div>;

  return (
    <div>
      <h2>Posts</h2>
      <button onClick={handleRefetch} disabled={isFetching}>
        {isFetching ? 'Refetching...' : 'Refetch Posts'}
      </button>
      {lastFetched && <div>Last fetched at: {lastFetched}</div>}
      <ul>
        {data.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
