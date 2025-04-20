import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { searchPage } from '../pages/searchPage';

Given('a user in {string}', (url) => {
  searchPage.visit(url);
});

When('the user enters {string} into the search bar', (query) => {
  searchPage.enterSearchQuery(query);
});

When('the user submits the search', () => {
  searchPage.submitSearch();
});

Then('the correct search results should be displayed', () => {
  searchPage.verifySearchResults();
});

When('the user removes the first search result', () => {
  searchPage.removeFirstResult();
});

When('the user clicks on the second search result', () => {
  searchPage.saveSecondResultTitleAsAlias();
  searchPage.clickSecondResult();
});

Then('the user should be redirected to the correct page', function () {
  searchPage.verifyRedirectionAndPage(this);
});