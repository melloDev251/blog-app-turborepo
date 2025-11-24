"use server";
import { print } from "graphql";
import { authFetchGraphQL, fetchGraphQL } from "../fetchGraphQL";
import {
  CREATE_POST_MUTATION,
  GET_POST_BY_ID,
  GET_POSTS,
  GET_USER_POSTS,
  UPDATE_POST_MUTATION,
} from "../gqlQueries";
import { Post } from "../types/modelTypes";
import { transformTakeSkip } from "../helpers";
import { PostFormState } from "../types/formState";
import { PostFormSchema } from "../zodSchemas/postFormSchema";
import { uploadThumbnail } from "../upload";

export const fetchPosts = async ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { skip, take } = transformTakeSkip({ page, pageSize });
  const data = await fetchGraphQL(print(GET_POSTS), { skip, take });
  //   console.log({ data });
  return { posts: data.posts as Post[], totalPosts: data.postsCount as number };
};

export const fetchPostById = async (id: number) => {
  const data = await fetchGraphQL(print(GET_POST_BY_ID), { id });

  return data.getPostById as Post;
};

export async function fetchUserPosts({
  page,
  pageSize,
}: {
  page?: number;
  pageSize: number;
}) {
  const { take, skip } = transformTakeSkip({ page, pageSize });
  const data = await authFetchGraphQL(print(GET_USER_POSTS), {
    take,
    skip,
  });

  return {
    posts: data.getUserPosts as Post[],
    totalPosts: data.userPostCount as number,
  };
}

export async function saveNewPost(
  state: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  // Récupérer published directement depuis FormData
  const published = formData.get("published") === "on";

  const validatedFields = PostFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  // Todo:Upload Thumbnail to supabase
  let thumbnailUrl = "";
  if (validatedFields.data.thumbnail) {
    thumbnailUrl = await uploadThumbnail(validatedFields.data.thumbnail);
  }

  // Extraire seulement les champs nécessaires pour GraphQL
  const { postId, ...graphQLInput } = validatedFields.data;

  // Todo: call garphql api
  const data = await authFetchGraphQL(print(CREATE_POST_MUTATION), {
    input: {
      // ...validatedFields.data,
      ...graphQLInput, // Sans postId
      thumbnail: thumbnailUrl,
      published: published, // Utiliser la valeur récupérée directement
    },
  });

  if (data) return { message: "Success! New Post Saved", ok: true };
  return {
    message: "Oops, Something Went Wrong",
    data: Object.fromEntries(formData.entries()),
  };
}

export async function updatePost(
  state: PostFormState,
  formData: FormData
  // currentPage: number = 1 // ← Ajouter le paramètre page actuelle
): Promise<PostFormState> {
  // Récupérer published directement depuis FormData
  const published = formData.get("published") === "on";

  // Convertir FormData en objet et gérer les checkbox
  const formDataObj = Object.fromEntries(formData.entries());

  const validatedFields = PostFormSchema.safeParse(formDataObj);

  if (!validatedFields.success)
    return {
      data: formDataObj,
      errors: validatedFields.error.flatten().fieldErrors,
    };

  // Todo: check if thumbnail has been changed
  const { thumbnail, ...inputs } = validatedFields.data;

  let thumbnailUrl = "";
  // Todo:Upload Thumbnail to supabase
  if (thumbnail && thumbnail.size > 0)
    thumbnailUrl = await uploadThumbnail(thumbnail);

  // Extraire seulement les champs nécessaires pour GraphQL
  // const { postId, ...graphQLInput } = validatedFields.data;

  // Ajouter explicitement updatedAt

  // Todo: call garphql api
  const data = await authFetchGraphQL(print(UPDATE_POST_MUTATION), {
    input: {
      ...inputs,
      ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
      published: published,
    },
  });

  if (data) {
    // const redirectTo = `/user/posts?page=${currentPage}`;
    return {
      message: "Success! The Post Updated",
      ok: true,
      redirectTo: "/user/posts", // Ajouter la redirection ici
    };
  }
  return {
    message: "Oops, Something Went Wrong",
    data: formDataObj,
  };
}
