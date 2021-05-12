# Exercise 7

## Switch to a dynamic database

We've be using a static `movies.json` file up to this point. Any changes made in the UI are forgotten when the page reloads. Not a very good app yet. It's time to switch over to a simple CRUD server so we can persist our changes.

We will use [`json-server`](https://www.npmjs.com/package/json-server), which makes it easy to spin up a simple server for CRUD operations. Start up the server from the project root:

```bash
# inside /projects/rmdb
$ yarn db
```

You can view collections as a RESTful API, such as the `movies` that are stored. Visit a link like http://localhost:3001/movies in your browser and you'll see the movies currently stored. 

The server reads from a file on disk, `db.json`. We will read directly from the file in our App so we have initial data to load. (We haven't covered how to make network calls when the app first loads, so this is a temporary measure.)

We've already been reading from this file, so we should see it get updated by server actions.

## Connect "Add Movie" to server

When adding a new movie from the UI, we should save these changes to the database! Make a POST request to `http://localhost:3001/movies` with the movie payload.

## Connect "Edit Movie" to server

Make a PUT request to `http://localhost:3001/movies/[imdbID]` to edit the movie for that `imdbID`. 

## Connect "Delete Movie" to server

Make a DELETE request to `http://localhost:3001/movies/[imdbID]` to delete that movie.
