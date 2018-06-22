import React from 'react';
import { createClient } from 'contentful';

import '../styles/App.css';
import MyCommentBox from './MyCommentBox.jsx';

const fakeBlogPostId = 'my-blog-post';

const postData = (url, data) => {

    return fetch(`.netlify/functions${url}`, {
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        //mode: 'cors' // if your endpoints are on a different domain
    }).then(response => response.json());
};

const contentfulClient = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID || 'ssm01dvlvmav',
  accessToken:
      process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN || 'c7db192089f4a038b7b0a018be644efa631f32c3068f10f1fdb00ac9f0bf3907',
    host: process.env.REACT_APP_CONTENTFUL_HOST || 'preview.contentful.com'
});

const App = props => (
    <div>
        <h3>Authless Comments Example</h3>
        <div>
            <MyCommentBox
                subjectId={fakeBlogPostId}
                postData={postData}
                contentfulClient={contentfulClient}
            />
        </div>
    </div>
);


export default App;
