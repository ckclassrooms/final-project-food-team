# Homework F.1 - Final Project Tech Stack and MVP Proposal

We have deployed our web application using Netlify. The link to that has been provided in the Readme file.

Tech Stack- For the front-end, we are going to use React, HTML, and CSS. We aren't going to have a back-end for now, but we might consider using Express if needed in the future. Similarly, for the database, we aren't going to use one initially as it is not required for our fully Client-side application, but we might use Supabase if required. The third party APIs in our application are the Recipes API and the Kroger (or Instacart) API.

MVP- As a starting point, we would be creating a web application that combines the Recipes API and the Kroger API in a very fundamental way to display the the search results (recipes) returned from the Recipes API extracted using any recipe query. Then, we will list all the incredients and the quantities required for a particular recipe, and call the Kroger API to provide a way to list the stores that are offering a particular ingredient to purchase it. We still don't know what access levels these APIs provide in their free tiers, so our initial design would be very dependent on that, but the basic idea is that any user would be able to search for a recipe, get the results and then see the ingredients needed for that particular recipe and the stores which are offering them, as shown in the image below.


<img width="1189" alt="Screen Shot 2022-11-07 at 4 45 26 PM" src="https://user-images.githubusercontent.com/97759670/200431388-db509eec-6bf4-424a-9336-f2c311d7e4c6.png">
