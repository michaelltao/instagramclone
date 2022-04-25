import React from 'react';
import './Post.css';
import { Avatar } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from './firebase';
import firebase from "firebase/compat/app";

function Post({ postId, user, username, caption, imageUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const postComment = (event) => {
        event.preventDefault();

        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComment('');
    }

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }
        return () => {
            unsubscribe();
        };
    }, [postId]);
        
  return (
    <div className='post'>
        <div className='post_header'>
        <Avatar 
            className='post_avatar'
            alt='michaelltao'
            src = 'https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg'
        />
            <h3>{username}</h3>
        </div>
        <img className='post_image' src={imageUrl} />
        
        <h4 className='post_text'><strong>{username} </strong>{caption}</h4>

        <div className='post_comments'>
            {comments.map((comment)=> (
                <p>
                    <strong>{comment.username}</strong> {comment.text}
                </p>
            ))}
        </div>

        {user && (
         <form className='post_commentbox'> 
            <input 
                className='post_input'
                type='text'
                placeholder='Add a comment...'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button
                className='post_button'
                disabled={!comment}
                type='submit'
                onClick={postComment}
            >
                <strong>Post</strong>
            </button>
         </form>
        )}
        
    </div>
  )
}

export default Post;