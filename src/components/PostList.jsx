import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
import PostItem from './PostItem';
import {
    CSSTransition,
  } from 'react-transition-group';

const PostList = ({posts, title, remove}) => {
        
    if(!posts.length){
        return(
            <h1>
                Посты не найдены!
            </h1>
        );
    }

    return (
            <div>
                <h1 style={{textAlign: 'center'}}>
                    {title}
                </h1>
                <TransitionGroup>
                    {posts.map((post, index) =>
                        <CSSTransition
                            key={post.id}
                            timeout={500}
                            classNames="post"
                        >
                        
                            <PostItem remove={remove} number={index + 1} post={post} key={post.id}/>
                        
                        </CSSTransition>
                    )}
                </TransitionGroup>
                
            </div>
    );
}
export default PostList;