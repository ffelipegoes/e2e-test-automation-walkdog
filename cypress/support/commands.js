// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { faker } from "@faker-js/faker/locale/pt_BR"
import gerarCPF from "../fixtures/geraCPF"

Cypress.Commands.add('acccsessSignupPage', () => {
    cy.visit('https://walkdog.vercel.app/')
    cy.get('main > h1').should('have.text', 'Cuidado e diversão em cada passo')
    cy.get('a').click()
    cy.get('h1').should('be.visible')
})

Cypress.Commands.add('fillPersonalData', () => {
  cy.get('input[placeholder="Nome completo"]').type(faker.person.firstName())
    cy.get('input[placeholder="E-mail"]').type(faker.internet.email())
    cy.get('input[placeholder="CPF somente números"]').type(gerarCPF())
})

Cypress.Commands.add('fillAddress', () => {
  cy.get('input[placeholder="CEP"]').type("06733232")
  cy.get('input[value="Buscar CEP"]').click()
  cy.get('input[name="addressNumber"]').type("30")
})

Cypress.Commands.add('selectActivity', () => {
  cy.contains('span','Cuidar').click()
  cy.contains('span','Adestrar').click()
})

Cypress.Commands.add('sendImage', () => {
  cy.get('.dropzone > input').selectFile('./image/corinthians.jpg',{force:true})
  cy.get('.button-register').click()
})

Cypress.Commands.add('confirmForm', () => {
  cy.contains('.swal2-title', 'Obrigado!')
})

Cypress.Commands.add('incorrectDataFormMessages', ()=>{
    cy.get('.button-register').click()
    cy.fixture('errorMessages.json').then((messages)=>{
    cy.get('input[name="name"] ~ span').should('have.text', messages.nome)
    cy.get('input[name="email"] ~ span').should('have.text', messages.email)
    cy.get('input[name="cpf"] ~ span').should('have.text', messages.cpf)
    cy.get('input[name="cep"] ~ span').should('have.text', messages.cep)
    cy.get('input[name="addressNumber"] ~ span').should('have.text', messages.numero)
    cy.get('.button-register').prev().should('have.text', messages.foto)
    })
  })

