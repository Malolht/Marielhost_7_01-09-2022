import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { isEmpty } from "../Utils";
import { dateParser } from './../Utils';
import LikeButton from './LikeButton';
import { useDispatch } from 'react-redux';
import { updatePost } from "../../actions/post.actions";
import DeletePost from './DeletePost';
import PostComment from './PostComment';

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const [file, setFile] = useState();
    const selectionUsers = useSelector((state) => state.usersReducer);
    const usersData = selectionUsers.users;
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const updateItem = (e) => {
        console.log(post._id);

        if (file && textUpdate) {
            const data = new FormData();
            data.append("message", textUpdate);
            data.append("picture", file);
            dispatch(updatePost(data, post._id));
        } else if (textUpdate && post.picture ===! null ) {
            const data = new FormData();
            data.append("message", textUpdate);
            data.append("picture", post.picture);
            dispatch(updatePost(data, post._id));
        } else if (textUpdate ) {
            const data = new FormData();
            data.append("message", textUpdate);
            dispatch(updatePost(data, post._id));
        } else if (file) {
            const data = new FormData();
            data.append("message", post.message);
            data.append("picture", file);
            dispatch(updatePost(data, post._id));
        }
        setIsUpdated(false);
        setTextUpdate(null);
        setFile("");

        function RedirectionJavascript() {
            document.location.href = "http://localhost:3000/";
        }
        RedirectionJavascript();
    };

    const handlePicture = (e) => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        if (!isEmpty(usersData[0])) {
            setIsLoading(false);
        }
    }, [usersData]);

    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    <div className="card-left">
                        {/* eslint-disable-next-line */}
                        <img
                            src={
                                !isEmpty(usersData[0]) &&
                                usersData.map((user) => {
                                    if (user._id === post.posterId) {
                                        return user.picture;
                                    } else {
                                        return null;
                                    }
                                }).join("")
                            }

                            alt="Photo de l'auteur du post"
                        />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                    {
                                        !isEmpty(usersData[0]) &&
                                        usersData.map((user) => {
                                            if (user._id === post.posterId) {
                                                return user.prenom;
                                            } else {
                                                return null;
                                            }
                                        })
                                    }
                                </h3>
                            </div>
                            <span> {dateParser(post.createdAt)} </span>
                        </div>
                        {isUpdated === false && <p> {post.message} </p>}
                        {isUpdated && (
                            <div className="update-post">
                                <textarea defaultValue={post.message} onChange={(e) => setTextUpdate(e.target.value)} />
                                <div className="button-container">
                                    <button className="btn" onClick={updateItem} >
                                        Modifier
                                    </button>
                                </div>
                                <div className="footer-form">
                                    <div className="icon">
                                        {/* eslint-disable-next-line  */}
                                        <img src="./img/icons/picture.svg" alt="Bouton pour ajouter une image" />
                                        <input
                                            type="file"
                                            id="file-upload"
                                            name="picture"
                                            accept=".jpg, .jpeg, .png, .gif"
                                            onChange={(e) => handlePicture(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {post.picture && <img src={post.picture} alt="card-pic" className="card-pic" />}
                        {userData._id === post.posterId && userData._id !== process.env.REACT_APP_ADMIN && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src="./img/icons/edit.svg" alt="Bouton de modification de post" />
                                </div>
                                <DeletePost id={post._id} />
                            </div>
                        )}
                        {userData._id === process.env.REACT_APP_ADMIN && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src="./img/icons/edit.svg" alt="Bouton de modification de post" />
                                </div>
                                <DeletePost id={post._id} />
                            </div>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img onClick={() => setShowComments(!showComments)} src="./img/icons/message1.svg" alt="Icone de commentaire" />
                                <span> {post.comments.length} </span>
                            </div>
                            <LikeButton post={post} />
                        </div>
                        {showComments && <PostComment post={post} />}
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;