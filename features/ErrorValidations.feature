Feature: Ecommerce error validations

    @Validation
    @foo
    Scenario Outline: Placing the Order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username | password |
            | xxx      | xxx      |
            | xxx      | xxx      |