Feature: DuckDuckGo Search Functionality

  Scenario: User can get correct search result and can be redirected to the correct page
    Given a user in "https://duckduckgo.com"
    When the user enters "Cypress.io" into the search bar
    And the user submits the search
    Then the correct search results should be displayed
    When the user removes the first search result
    And the user clicks on the second search result
    Then the user should be redirected to the correct page