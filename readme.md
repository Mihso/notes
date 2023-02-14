To start the development server, go to the frontend3 directory in the command line and do "npm start".

The mulitple frontends are me trying out sst and realizing that I need certain formats in order for some functionalities to work, thus having to build new frontends. 
-frontend is a react prebuilt page. 
-frontend2 is a webpack page built ground up since prebuilt React pages don't allow references to functions outside of the src directory within the frontend.
-frontend3 is a vite page used for sst-env.d.ts to work properly.

I kept in some code that isn't being used mainly for future reference, or even future implemntation, such as the update functionality.

Sinc I was using a guide for building an sst site, the rds table and most of the backend functions refer to the tasks as articles, but since the frontend doesn't see this, I just relabeled the inputs as Task and description.

It took quite a bit of time to figure out TRPC and SST, especially with understanding the prebuilt functions and figuring out what inputs are expected and general formatting. 