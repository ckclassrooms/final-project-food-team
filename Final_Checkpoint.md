# final-project-proposal-food-team

In checkpoint 0, we had planned that this application will "allow users to get food recipes and then give them information about the recipe such as the price of the recipe/price of each individual ingredient, then allow the user to order the ingredients for delivery or pick up. Apart from this flow we will also allow users to search for recipes that include ingredients that they already own or have purchased before in another flow which is as follows: First we allow users to search for ingredients they own or include them if they have ordered them in the past, then allow them to add the ingredients to their owned list, then provide the user recipes that include the ingredients.
And optionally give users information about nutrition about the recipe from these sources/ APIs’: FoodData Central (usda.gov) Nutrition API by Nutritionix"

As our Final Checkpoint, we have come very close to implementating most of the features that we sought to, even though haven't been able to provide the 'extra' functionality like recommendations due to time constraints.
Our app can be used to search for recipes (resulting list will be displayed), view an individual recipes's ingredients, search for and select a store via the Kroger Api using the zip code, and add some or all of those ingredients to the Kroger cart using the Kroger cart api.

How to Navigate through the website-
1) This is the landing page of our app, first the user must search for a Kroger store using your zipcode.
<img width="1438" alt="Screen Shot 2022-12-03 at 7 17 24 PM" src="https://user-images.githubusercontent.com/97759670/205469359-e9a6c879-cf40-4f92-ae7a-7e6d777e9e42.png">

2) After searching your zipcode, this page show the Store names and addresses clostest and the option to view the location in Google Maps. To proceed, the user has to click a row to select a store, we save that information to display the prices of the items from that location in later pages.
<img width="1440" alt="Screen Shot 2022-12-03 at 7 18 16 PM" src="https://user-images.githubusercontent.com/97759670/205469382-92fb1fbb-2da0-486b-8284-ab18c7fe8292.png">

3) Next, the user can search for Recipes using the search bar and also click on some of the listed common recipes.
<img width="1439" alt="Screen Shot 2022-12-03 at 7 10 00 PM" src="https://user-images.githubusercontent.com/97759670/205469165-9b6d9322-8636-4a1b-9cac-aaace7b7734b.png">

3.1) Also, the user can give us permission to add items to their kroger.com cart by clicking on the red button if they want to add ingredients to their Kroger.com cart.

<img width="648" alt="Screenshot 2022-12-03 at 9 04 47 PM" src="https://user-images.githubusercontent.com/57426824/205472216-dedd9a9e-bea7-4384-8734-8f9cf124a614.png">

3.2) If they would like to add items to their cart they have to sign in to their kroger.com account using oauth

<img width="542" alt="Screenshot 2022-12-03 at 9 05 47 PM" src="https://user-images.githubusercontent.com/57426824/205472247-6e4cc1cb-0888-4813-bb88-2639c08b4ce0.png">

3.2) After logging in they will be redirect back, and have to find their store again but now they have confirmation they are verified with the green button

<img width="880" alt="Screenshot 2022-12-03 at 9 06 54 PM" src="https://user-images.githubusercontent.com/57426824/205472287-fa0990c0-8ae1-48cb-a54f-083d0684bf33.png">

4) If we search for "pizza", this is the results page shown. Any individual recipe can be clicked here.
<img width="1436" alt="Screen Shot 2022-12-03 at 7 13 19 PM" src="https://user-images.githubusercontent.com/97759670/205469245-bc4de88b-7a88-459a-89b8-dc15965402dd.png">

4.1) This is the page that comes up when a recipe is clicked on. It has the link to the recipe instructions
<img width="1436" alt="Screen Shot 2022-12-03 at 7 14 04 PM" src="https://user-images.githubusercontent.com/97759670/205469259-02484bb4-447e-4e38-b359-3d6c3dee6229.png">

4.2) In the same page, the ingredients are also listed
<img width="748" alt="Screen Shot 2022-12-03 at 7 20 17 PM" src="https://user-images.githubusercontent.com/97759670/205469446-eea21452-17ef-4afe-b61e-c16502357c64.png">

4.3) Also, the option to select and buy the ingredients is given and the prices from the store that they previously selected are displayed.
If the user is authenticated, he/she will have the option to add items to cart

<img width="1435" alt="Screen Shot 2022-12-03 at 7 15 46 PM" src="https://user-images.githubusercontent.com/97759670/205469320-da9d2335-286c-4be9-9584-69eeda7830ae.png">

5) On this page, If the user is authenticated, he/she will have the option to add items to cart

<img width="1129" alt="Screenshot 2022-12-03 at 9 09 01 PM" src="https://user-images.githubusercontent.com/57426824/205472331-d4c470ec-cd51-4fbc-b795-7ffea2ad09ad.png">

6) If they click the button, we call the kroger API to add the items to their kroger.com cart and it will be added for them on https://www.kroger.com/cart

<img width="1453" alt="Screenshot 2022-12-03 at 9 11 09 PM" src="https://user-images.githubusercontent.com/57426824/205472384-4368e0f0-0835-44c8-bd43-870c913088ee.png">



