Feature: Login Test

  Background: 
    Given The user is on login page
  
  @debug
  Scenario: Login should be success
    When he do the login with user "standard_user" and password "secret_sauce"
    Then he should see the inventario page

  Scenario Outline: Login should be success with examples
    When he do the login with user <user> and password <password>
    Then he should see the inventario page
   Examples:
      | user            | password           |
      | "standard_user" | "secret_sauce"     |
      | "standard_user" | "secret_sauce"     |

  

  
