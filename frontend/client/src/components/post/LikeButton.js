import React, { useState, useEffect, useContext } from "react";
import { UidContext } from './../AppContext';
import { useDispatch } from 'react-redux';
import { likePost, dislikePost } from './../../actions/post.actions';

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likePost(post._id, uid))
        setLiked(true);
    };

    const dislike = () => {
        dispatch(dislikePost(post._id, uid))
        setLiked(false);
    };

    useEffect(() => {
        if (post.likers.includes(uid)) setLiked(true)
        else setLiked(false);
    }, [uid, post.likers, liked]);

    return (
        <div className="like-container">
            {uid && liked === false && (
                <img src="./img/icons/heart.svg" onClick={like} alt="like" />
            )}
            {uid && liked && (
                <img src="./img/icons/heart-filled.svg" onClick={dislike} alt="dislike" />
            )}
            <span>{post.likers.length}</span>
        </div>
    );
};

export default LikeButton;