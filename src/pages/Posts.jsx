import axios from 'axios';
import React, {useState, useRef, useMemo, useEffect} from 'react';
import Counter from '.././components/Counter';
import PostFilter from '.././components/PostFilter';
import PostForm from '.././components/PostForm';
import PostItem from '.././components/PostItem';
import PostList from '.././components/PostList';
import MyButton from '.././components/UI/button/MyButton';
import MyInput from '.././components/UI/input/MyInput';
import MyModal from '.././components/UI/MyModal/MyModal';
import MySelect from '.././components/UI/select/MySelect';
import { usePosts } from '.././hooks/usePosts';
import PostService from '.././API/PostService.js';
import MyLoader from '.././components/UI/Loader/MyLoader';
import { useFetching } from '.././hooks/useFetching';
import { getPagesCount, getPagesArray } from '.././utils/page.js';
import { useObserver } from '../hooks/useObserver';

import '.././styles/App.css';
import Pagination from '.././components/pagination/Pagination';

function Posts() {

    const lastElement = useRef();
    const [posts, setPosts] = useState([])
    const[filter, setFiter] = useState({sort: '', query: ''});
    const[modal, setModal] = useState(false);
    const[totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const[page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);


    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPagesCount(totalCount, limit));
      
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
      setPage(page + 1);
    })

    useEffect(() => {
      fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost) => {
      setPosts([...posts, newPost]);
      setModal(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
      setPage(page);
    }

    return (
      <div className='App'>
        <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
          Создать пост
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost}/>
        </MyModal>
        <hr style={{margin: '15px 0'}}/>
        <PostFilter
          filter={filter}
          setFilter={setFiter}
        />
        <MySelect
          value={limit}
          onChange={value => setLimit(value)}
          defaultValue={'quantity of elements on page'}
          options={[
            {value: 5, name: "5"},
            {value: 10, name: "10"},
            {value: 25, name: "25"},  
            {value: -1, name: "show all"}
          ]}
        />
        {postError &&
          <h1>Произошла ощибка{postError}</h1>
        }
        
        {isPostsLoading &&
         <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
            <MyLoader />
          </div>
        }
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title='first list'/>
        <div ref={lastElement} style={{height: 20, background: 'red'}}/>
        
        <Pagination 
          page={page} 
          changePage={changePage} 
          totalPages={totalPages}
        />
      </div>
    );
}

export default Posts;