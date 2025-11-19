/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { authFetchGraphQL } from "../fetchGraphQL";
import { print } from "graphql";
import {
  LIKE_POST_MUTATION,
  POST_LIKES,
  POST_LIKES_COUNT,
  UNLIKE_POST_MUTATION,
} from "../gqlQueries";
import { SessionUser } from "../session";

// Pour les utilisateurs non connectés
export async function getPublicPostLikeData(postId: number) {
  const data = await authFetchGraphQL(print(POST_LIKES_COUNT), { postId });

  return {
    likeCount: data.postLikesCount as number,
    userLikedPost: false, // Toujours false pour les non-connectés
  };
}

// Pour les utilisateurs connectés
export async function getAuthenticatedPostLikeData(postId: number) {
  const data = await authFetchGraphQL(print(POST_LIKES), { postId });

  return {
    likeCount: data.postLikesCount as number,
    userLikedPost: data.userLikedPost as boolean,
  };
}

// Fonction intelligente qui choisit la bonne selon le contexte
export async function getPostLikeData(postId: number, user?: SessionUser) {
  if (user) {
    // Utilisateur connecté - utiliser la query complète
    return await getAuthenticatedPostLikeData(postId);
  } else {
    // Utilisateur non connecté - utiliser seulement les données publiques
    return await getPublicPostLikeData(postId);
  }
}

export async function likePost(postId: number) {
  const data = await authFetchGraphQL(print(LIKE_POST_MUTATION), {
    postId,
  });
}

export async function unLikePost(postId: number) {
  const data = await authFetchGraphQL(print(UNLIKE_POST_MUTATION), {
    postId,
  });
}
