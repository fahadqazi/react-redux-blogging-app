import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostIndex from './components/posts_index';
import PostsNew from './components/post_new';
import PostsShow from './components/posts_show'

const Greeting = () => {
    return <div>Hello there!!!</div>
}

export default(
    <Route path="/" component={App}>
        <IndexRoute component={PostIndex} />
        <Route path="greet" component={Greeting} />
        <Route path="posts/new" component={PostsNew} />
        <Route path="posts/:id" component={PostsShow} />
    </Route>
);