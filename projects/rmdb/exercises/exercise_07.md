# Exercise 7

## Switch to a dynamic database

We've be using a static `db.json` file up to this point. Any changes made in the UI are forgotten when the page reloads. Not a very good app yet. It's time to switch over to a simple CRUD server so we can persist our changes.

We will use [`json-server`](https://www.npmjs.com/package/json-server), which makes it easy to spin up a simple server for CRUD operations. Start up the server from the project root:

```bash
# inside /projects/rmdb
$ yarn db
```

The `json-server` will read the `db.json` file and make simple CRUD updates to the file. E.g. if you made a POST request to `/users`:

```
$ curl -H "Content-Type: application/json" \
    --request POST \
    --data '{ "username": "foo", "password": "bar" }' \
    http://localhost:3001/users
```

It'll create a new user object for you and add it to `db.users`:

```
{
  "username": "foo",
  "password": "bar",
  "id": 2
}
```

You can view collections as a RESTful API, such as the `movies` that are stored. Visit a link like http://localhost:3001/movies in your browser and you'll see the movies currently stored. 

The server reads from a file on disk, `db.json`. We will read directly from the file in our App so we have initial data to load. (We haven't covered how to make network calls when the app first loads, so this is a temporary measure.) So in your `App.js` you will still have:


```
import db from './db.json'

// use db.movies somewhere in state initialization
```

Since this file is now being updated by the `json-server`, we will see new updates loaded from the file when the browser refreshes.

## Connect "Edit Movie" to server

Make a PUT request to `http://localhost:3001/movies/[id]` to edit the movie for that `id`. Not to be confused with the `imdbID`, the `id` is what the `json-server` is using to track unique database identifiers. In a real app with a more advanced backend, it would be reasonable to use `imdbID` as the primary key for that table.

You should use `axios`, so you'll need to add it to your packages:

```
$ yarn add axios
```

Make sure you don't close the edit form in the UI until the server responds with a `200 OK`, just in case something goes wrong on the server!

That's it! This exercise is shorter as a chance to take a breather if you need it, catch up on old exercises, or dig into some of the challenges you may have skipped over. See below to keep going.

## Challenges

### Connect "Add Movie" to server

When adding a new movie from the UI, we should save these changes to the database! Make a POST request to `http://localhost:3001/movies` with the movie payload.

If you haven't already implemented an "Add Movie" feature, do that first in the [challenges section of exercise 5](https://github.com/AndrewSouthpaw/webdev/blob/master/projects/rmdb/exercises/exercise_05.md#create-an-add-movie-section).

Bonus challenge: find a way to not close the "Add Movie" form until the server responds with a 200 OK. You can add latency to the server by running `$ yarn db-slow` instead of `$ yarn db` to help with debugging.

### Connect "Delete Movie" to server

Make a DELETE request to `http://localhost:3001/movies/[id]` to delete that movie.

Make sure you don't remove the movie from the UI until the server responds with a `200 OK`, just in case something goes wrong on the server!

If you haven't already implemented an "Delete Movie" feature, do that first in the [challenges section of exercise 6](https://github.com/AndrewSouthpaw/webdev/blob/master/projects/rmdb/exercises/exercise_06.md#allow-a-movie-to-be-deleted).

### Handle error cases

Right now we've only managed the happy path, but things are bound to go wrong. Gracefully handle errors when they come back from the server. An easy way to trigger errors is to turn off your `json-server` once you've loaded your app.
