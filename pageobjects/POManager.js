const {LoginPage} = require('./LoginPage')
const {DashBoardPage} = require('./DashBoardPage')

class POManager {
    constructor(page){
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.dashBoardPage = new DashBoardPage(this.page)
    }

getLoginPage(){
    return this.loginPage
}

getDashboardPage(){
    return this.dashBoardPage
}

}

module.exports = {POManager}