const base = require('@playwright/test');

exports.customtest =  base.test.extend(
    {
        testDataForOrder :     {
            username: "xxx",
            password: "xxx",
            productName: "zara coat 3"
        }
    }
)