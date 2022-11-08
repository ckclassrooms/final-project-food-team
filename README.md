# final-project-proposal-food-team
final-project-proposal-food-team created by GitHub Classroom

This application will allow users to get food recipes and then give them information about the recipe such as the price of the recipe/price of each individual ingredient, then allow the user to order the ingredients for delivery or pick up. It is something like a hello fresh alternative. We also will allow users to input ingredients that they already own so they can find recipes that include these ingredients instead of searching for recipes.
The flow of the application is as follows, first we allow users to create an account to save their recipes, then we allow the user to search for a recipe, then we get the recipe from this API: https://developer.edamam.com/edamam-recipe-api
Then, we get the information about the ingredients using Kroger (grocery store chain) such as their prices and quantity from this API: https://developer.kroger.com/documentation/api-products/public/products/overview and display the prices to the user.
Then we will allow users to order the ingredients for delivery or pickup from this API: https://docs.instacart.com/connect/

Apart from this flow we will also allow users to search for recipes that include ingredients that they already own or have purchased before in another flow which is as follows: First we allow users to search for ingredients they own or include them if they have ordered them in the past, then allow them to add the ingredients to their owned list, then provide the user recipes that include the ingredients.
And optionally give users information about nutrition about the recipe from these sources/ APIs’: FoodData Central (usda.gov) Nutrition API by Nutritionix
Other optional feature is to embed youtube videos for detailed instrucions or give some sort of personalized recommendations using data from from other users and current user's ordering patterns.

This app will be different from a CRUD app because we will give users the ability to see recipes through an API and then order ingredients using the Instacart API, this functionality is not provided in a standard CRUD app. We will also use the user’s location to provide this functionality while ordering items.

The security concerns that would be expected in this application would be SQL injections because we would have an input form so the users can search for recipes/create logins, and this would be a vulnerability to SQL injection, so we must protect against that. Another security concern is protecting against XSS attacks because an attacker might want to include malicious code in the domain/links so we must protect against this. A privacy concern for this app is that we also would need to make users create a secure login so we must make users provide a strong password and then we would have to securely store these credentials in a database. Another privacy/security concern is the dependance on the API’s so if one of the API’s is not working then our app will not work properly. Also, giving users the ability to order items online involves a huge risk as they will be doing financial transactions.


Link to deployed app: https://starlit-twilight-fde55f.netlify.app/
