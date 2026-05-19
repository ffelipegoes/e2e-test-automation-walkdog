///<reference types="cypress"/>


describe('Walkdog testes', () => {

  beforeEach(()=>{
    cy.acccsessSignupPage()

  })

  it('Form Preenchido corretamente', () => {
    cy.intercept('**/json').as('ViaCepRequest')


    cy.fillPersonalData()
    cy.fillAddress()
    cy.selectActivity()
    cy.sendImage()
    cy.confirmForm()

    cy.wait('@ViaCepRequest').then((req) => {
      const response = req.response

      expect(response.statusCode).to.equal(200)
    })
  })

  it('Form preennchido incorretamente', ()=>{
    cy.incorrectDataFormMessages()
  })

  afterEach(()=>{
    cy.screenshot()
  })

})