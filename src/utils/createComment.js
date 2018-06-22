const contentful = require('contentful-management');
const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_CONTENT_MANAGEMENT_ACCESS_TOKEN || 'CFPAT - c4757de56bfae4feddae8acc0aeb01efffc16fae9ba8d6421ef3eb77b58ab429'
});

module.exports = function createComment(body, authorName, subjectId, parentCommentId = null) {

    return client
      .getSpace(process.env.REACT_APP_CONTENTFUL_SPACE_ID || 'ssm01dvlvmav')
      .then(space => space.getEnvironment('master'))
      .then(environment =>
        environment.createEntry('comment', {
          fields: {
            body: {
              'en-US': body
            },
            author: {
              'en-US': authorName
            },
            subject: {
              'en-US': subjectId
            },
            parentComment: {
              'en-US': {
                sys: {
                  type: 'Link',
                  linkType: 'Entry',
                  id: parentCommentId
                }
              }
            }
          }
        })
      )
      .then(entry => entry.publish());
};