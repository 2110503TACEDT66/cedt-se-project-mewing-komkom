import { request } from "http"

// describe('loginAndStoreToken', () => {
//   it('Should login', () => {
//     cy.request({
//       method: 'POST',
//       url: 'https://cedt-se-project-mewing-komkom-nq7g.vercel.app/api/v1/auth/login',
//       body: {
//         email: 'torrak@gmail.com',
//         password: '123456',
//       },
//     }).then((response) => {
//       // Store the session token in localStorage
//       localStorage.setItem('sessionToken', response.body.sessionToken);
//     });
//   })
// })

describe('Make reservation page', () => {
  beforeEach(() => {
    // Visit the login page and login
    // cy.visit('/space/6621e0dd0ca3b59b54586983');
    cy.visit('/login');
    cy.get('input[name="email"]').type('torrak@gmail.com');
    cy.wait(2000);
    cy.get('input[name="password"]').type('123456');
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.visit('/space/6621e0dd0ca3b59b54586983');
  });

  it('No date provided', () => {
    cy.contains('button', 'Reserve').click();
    cy.contains('Please provide date').should('be.visible');
  });

  it('No date provided', () => {
    // cy.contains('date-picker-input').type('01/05/2024')
    cy.get('DatePicker').should('exist')
    // cy.contains('button', 'Reserve').click();
    // cy.contains('Please provide date').should('be.visible');
  });

  // it('successfully makes a reservation with valid data', () => {
    
  // });
})