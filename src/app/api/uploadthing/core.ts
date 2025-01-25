// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { currentUser } from '@clerk/nextjs/server';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

// Middleware to authenticate the user
const authenticateUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new UploadThingError('Unauthorized');
  }
  return { userId: user.id };
};

// Define your FileRouter
export const ourFileRouter = {
  subaccountLogo: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete(({ metadata }) => {
      console.log('Upload complete for user:', metadata.userId);
    }),
  avatar: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete(({ metadata }) => {
      console.log('Upload complete for user:', metadata.userId);
    }),
  agencyLogo: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete(({ metadata }) => {
      console.log('Upload complete for user:', metadata.userId);
    }),
  media: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete(({ metadata }) => {
      console.log('Upload complete for user:', metadata.userId);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
