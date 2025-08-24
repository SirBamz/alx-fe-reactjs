import { useQuery } from 'react-query';

function fetchPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());
}

export default function PostsComponent() {
  const { data, error, isLoading } = useQuery('posts', fetchPosts);

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error fetching posts: {error.message}</div>;

  return (
    <div>
      <h2>Posts</h2>
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