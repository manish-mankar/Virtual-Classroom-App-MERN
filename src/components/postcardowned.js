import React from 'react';

const PostCard = ({ user, post, onDeletePost }) => {
  const { content, author, createdAt } = post;

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      onDeletePost(post._id);
      console.log(post._id);
    }
  };

  const isCurrentUserAuthor = true;

  return (
    <div className="post-card">
      <div className='postcard-header'>
        <h3>{author.firstName} {author.lastName}</h3>
        <div className="postcard-header-meta">
          <p className="created-at">{createdAt}</p>
          {isCurrentUserAuthor && (
            <button className="postcard-delete" onClick={handleDeleteClick}>X</button>
          )}
        </div>
      </div>
      <div className='postcard-content'>
        <p>{content}</p>
      </div>
      <div className='post-file-links'>
      {post.fileName && (
        <a href={`${process.env.REACT_APP_PATH_URL}/files/${post.fileName}`} target="_blank" rel="noopener noreferrer" className="attachment-link">
          View Attachment
        </a>
      )}
      </div>
    </div>
  );
};

export default PostCard;
