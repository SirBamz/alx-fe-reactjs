import { useParams } from 'react-router-dom';

function BlogPost() {
  const { postId } = useParams();
  return <div>Viewing Blog Post ID: {postId}</div>;
}

export default BlogPost;