Feature: Ecommerce validations

    Feature Description

    @Regression
    Scenario: Placing the Order
        Given a login to Ecommerce application with "xxx" and "xxx"
        When Add "zara coat 3" to Cart
        Then  Verify "zara coat 44" is present in the Cart
        When Enter valid details and Place the Order
        Then Verify order is present in the OrderHistory


    @Validation
    Scenario Outline: Placing the Order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username          | password    |
            | xxx | xxx |
            | xxx     | xxx |