/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PostFormState } from "@/lib/types/formState";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

type Props = {
  state: PostFormState;
  formAction: (payload: FormData) => void;
};
const UpsertPostForm = ({ state, formAction }: Props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); // Référence pour le champ fichier
  const router = useRouter(); // Initialiser le router

  useEffect(() => {
    if (state?.message && state?.redirectTo) {
      toast.success(state.message);
      setIsRedirecting(true);

      // Réinitialiser le champ image avant la redirection
      setImageUrl("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Rediriger après un léger délai pour laisser le toast s'afficher
      setTimeout(() => {
        router.push(state.redirectTo!);
      }, 100);
    } else if (state?.message && !state?.redirectTo) {
      // Gérer les messages sans redirection (pour create par exemple)
      toast.success(state.message);

      // Réinitialiser seulement les champs sans rediriger
      setImageUrl("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [state, router]);

    // Si une redirection est en cours, afficher un indicateur de chargement
    if (isRedirecting) {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-slate-600">Redirection en cours...</p>
          </div>
        </div>
      );
    }
  
  // useEffect(() => {
  //   if (state?.message) {
  //     toast.success(state.message);
  //     // Réinitialiser le champ image après succès
  //     setTimeout(() => {
  //       setImageUrl("");
  //       if (fileInputRef.current) {
  //         fileInputRef.current.value = "";
  //       }
  //     }, 0);
  //   }
  // }, [state]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 [&>div>label]:text-slate-500 [&>div>input]:transition [&>div>textarea]:transition"
    >
      <input hidden name="postId" defaultValue={state?.data?.postId} />
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          name="title"
          placeholder="Enter The Title of Your Post"
          defaultValue={state?.data?.title}
        />
      </div>
      {!!state?.errors?.title && (
        <p className="text-red-500 animate-shake">{state.errors.title}</p>
      )}

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          name="content"
          placeholder="Write Your Post Content Here"
          rows={6}
          defaultValue={state?.data?.content}
        />
      </div>
      {!!state?.errors?.content && (
        <p className="text-red-500 animate-shake">{state.errors.content}</p>
      )}
      <div>
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          type="file"
          name="thumbnail"
          accept="image/*"
          ref={fileInputRef} // Ajout de la référence
          onChange={(e) => {
            if (e.target.files)
              setImageUrl(URL.createObjectURL(e.target.files[0]));
          }}
        />
        {!!state?.errors?.thumbnail && (
          <p className="text-red-500 animate-shake">{state.errors.thumbnail}</p>
        )}
        {(!!imageUrl || !!state?.data?.previousThumbnailUrl) && (
          <Image
            src={(imageUrl || state?.data?.previousThumbnailUrl) ?? ""}
            alt="post thumbnail"
            width={200}
            height={150}
          />
        )}
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          name="tags"
          placeholder="Enter tags (comma-separated)"
          defaultValue={state?.data?.tags}
        />
      </div>
      {!!state?.errors?.tags && (
        <p className="text-red-500 animate-shake">{state.errors.tags}</p>
      )}
      <div className="flex items-center">
        <input
          className="mx-2 w-4 h-4"
          type="checkbox"
          name="published"
          defaultChecked={state?.data?.published === "on" ? true : false}
        />
        <Label htmlFor="published">Published Now</Label>
      </div>
      {!!state?.errors?.isPublished && (
        <p className="text-red-500 animate-shake">{state.errors.isPublished}</p>
      )}

      <SubmitButton>Save</SubmitButton>
    </form>
  );
};

export default UpsertPostForm;
