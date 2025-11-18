import gql from "graphql-tag";

export const GET_POSTS = gql`
  query posts($skip: Float, $take: Float) {
    posts(skip: $skip, take: $take) {
      id
      title
      thumbnail
      content
      createdAt
      slug
    }
    postsCount
  }
`;

export const GET_POST_BY_ID = gql`
  query getPostById($id: Int!) {
    getPostById(id: $id) {
      id
      title
      thumbnail
      content
      createdAt
      published
      author {
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(signInInput: $input) {
      id
      name
      avatar
      accessToken
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query getPostComments($postId: Int!, $take: Int, $skip: Int) {
    getPostComments(postId: $postId, take: $take, skip: $skip) {
      id
      content
      createdAt
      author {
        name
        avatar
      }
    }

    postCommentCount(postId: $postId)
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(createCommentInput: $input) {
      id
    }
  }
`;

// Query pour le compteur seulement (toujours accessible)
export const POST_LIKES_COUNT = gql`
  query PostLikesCount($postId: Int!) {
    postLikesCount(postId: $postId)
  }
`;

// Votre query existante
export const POST_LIKES = gql`
  query PostLikeData($postId: Int!) {
    postLikesCount(postId: $postId)
    userLikedPost(postId: $postId)
  }
`;

// export const POST_LIKES = gql`
//   query PostLikeData($postId: Int!) {
//     postLikesCount(postId: $postId)
//     userLikedPost(postId: $postId)
//   }
// `;

// // Pour les données publiques (sans authentification)
// export const POST_LIKES_COUNT = gql`
//   query PostLikesCount($postId: Int!) {
//     postLikesCount(postId: $postId)
//   }
// `;

// // Pour les données utilisateur (avec authentification)
// export const USER_LIKED_POST = gql`
//   query UserLikedPost($postId: Int!) {
//     userLikedPost(postId: $postId)
//   }
// `;

export const LIKE_POST_MUTATION = gql`
  mutation LikePost($postId: Int!) {
    likePost(postId: $postId)
  }
`;

export const UNLIKE_POST_MUTATION = gql`
  mutation UnLikePost($postId: Int!) {
    unlikePost(postId: $postId)
  }
`;
