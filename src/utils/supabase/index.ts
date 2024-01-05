'use client';

import { getRandom } from '..';
import { createBrowserClient } from './client';

const cacheControl = '300';

export const getPublicUrl = (bucket: string, path: string) => {
  return createBrowserClient().storage.from(bucket).getPublicUrl(path).data
    .publicUrl;
};

export const uploadImage = (bucket: string, path: string, avatar: File) => {
  return createBrowserClient().storage.from(bucket).upload(path, avatar, {
    cacheControl: cacheControl,
    upsert: false,
  });
};

export const removeImage = (bucket: string, paths: string[]) => {
  return createBrowserClient().storage.from(bucket).remove(paths);
};

export const updateImage = async (
  bucket: string,
  newAvatar?: File,
  editPhotoURL?: string,
) => {
  let photoURL: string | undefined = editPhotoURL;

  // If no new avatar but there is an existing photoURL, remove the existing image
  if (!newAvatar) {
    if (editPhotoURL) {
      const parts = editPhotoURL.split('/');
      await removeImage(bucket, [parts[parts.length - 1]]);
    }
    return undefined;
  }

  // If there's an existing editPhotoURL, update the image with the new avatar
  if (editPhotoURL) {
    const parts = editPhotoURL.split('/');
    await createBrowserClient()
      .storage.from(bucket)
      .update(`${parts[parts.length - 1]}`, newAvatar, {
        cacheControl: cacheControl, // Assuming cacheControl is defined somewhere
        upsert: true,
      });
  } else {
    // If there's no existing editPhotoURL, upload a new image and get the public URL
    const { data: res } = await uploadImage(bucket, getRandom(), newAvatar);

    if (res) {
      photoURL = getPublicUrl(bucket, res.path);
    }
  }

  return photoURL;
};
