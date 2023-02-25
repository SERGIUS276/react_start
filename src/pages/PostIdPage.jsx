import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import MyLoader from '../components/UI/Loader/MyLoader';
import { useFetching } from '../hooks/useFetching';


const PostIdPage = () => {
    const params = useParams();
    const[post, setPost] = useState({});
    const[comments, setComments] = useState([]);
    const[fetchPostById, isLoading, error] = useFetching( async (id) => {
        const response = await PostService.getById(params.id);
        setPost(response.data);
    })
    const[fetchCommentsById, isComLoading, comError] = useFetching( async (id) => {
        const response = await PostService.getCommentsById(params.id);
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostById(params.id);
        fetchCommentsById(params.id);
    }, [])
    return (
        <div>
            <h1>
                Страница поста с ID {params.id}
            </h1>
            {isLoading
                ? <MyLoader/>
                : <div>{post.id}. {post.title}</div>
            }
            <h1>
                Comments
            </h1>
            {isComLoading
            ? <MyLoader/>
            : <div>
                {comments.map(comm => 
                    <div style={{marginTop: 15}}>
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>
                )}
              </div>
            }
        </div>
    );
};

export default PostIdPage;