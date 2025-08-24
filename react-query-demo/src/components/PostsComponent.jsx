import { useQuery } from 'react-query';
import { useState } from 'react';

function fetchPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());
}

export default function PostsComponent() {
  const { data, isError, isLoading, refetch, isFetching } = useQuery('posts', fetchPosts);
  const [lastFetched, setLastFetched] = useState(null);

  const handleRefetch = async () => {
    await refetch();
    setLastFetched(new Date().toLocaleTimeString());
  };

  if (isLoading) return <div>Loading posts...</div>;
  if (isError) return <div>Error fetching posts: {isError.message}</div>;

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
