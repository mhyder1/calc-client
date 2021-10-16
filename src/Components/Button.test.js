const rewire = require("rewire")
const Button = rewire("./Button")
const isOperator = Button.__get__("isOperator")
// @ponicode
describe("isOperator", () => {
    test("0", () => {
        let callFunction = () => {
            isOperator(".")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            isOperator("=")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            isOperator("Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            isOperator("Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            isOperator(Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
