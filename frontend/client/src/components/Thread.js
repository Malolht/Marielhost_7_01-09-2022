import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { getPosts } from "../actions/post.actions";
import { useSelector } from 'react-redux';
import { isEmpty } from "./Utils";
import Card from './post/Card';

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(5);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadPost(true);
        }
    };

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts(count));
            setLoadPost(false);
            setCount(count + 5);
        }

        window.addEventListener("scroll", loadMore);
        return () => window.removeEventListener("scroll", loadMore);
        // eslint-disable-next-line
    }, [loadPost, dispatch, count]);

    return (
        <div className="thread-container">
            <ul>
                {!isEmpty(posts[0]) &&
                    posts.map((post) => {
                        return <Card post={post} key={post._id} />;
                    })
                }
            </ul>
        </div>
    );
};

export default Thread;