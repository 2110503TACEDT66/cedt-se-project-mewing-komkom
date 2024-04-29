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
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.visit('/space/662f51b9519d18088daacf91');
  });

  it('No date provided', () => {
    cy.contains('button', 'Reserve').click();
    cy.contains('Please provide date').should('be.visible');
  });

  it('Provide date but no time provided', () => {
    cy.get('[data-testid="spaceDatePicker"]').type("2024-05-01").type('{enter}');
    cy.contains('button', 'Reserve').click();
    cy.contains('The seats are fully occupied. Unable to reserve.').should('be.visible');
  });

  it('Reservation made successfully', () => {
    cy.get('[data-testid="spaceDatePicker"]').type("2024-05-01").type('{enter}');
    cy.get('[data-testid="spaceStartTime"]').type("10:00").type('{enter}');
    cy.get('[data-testid="spaceEndTime"]').type("11:00").type('{enter}');
    cy.wait(2000);
    cy.contains('button', 'Reserve').click();
    cy.contains('Create successfully').should('be.visible');
  });

  // it('successfully makes a reservation with valid data', () => {
    
  // });
})