import { request } from "http"

describe('US2-1 User should make a reservation with valid time', () => {
  beforeEach(() => {
    // Visit the login page and login
    cy.visit('/login');
    cy.get('input[name="email"]').type('torrak@gmail.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    // Visit one space page
    cy.visit('/space/662f51b9519d18088daacf91');
    cy.wait(3000)
  });

  it('No date and time provided', () => {
    cy.contains('button', 'Reserve').click();
    cy.contains('Please provide date').should('be.visible');
  });

  it('Provide date but no time provided', () => {
    cy.get('[data-testid="spaceDatePicker"]').type("2024-06-01").type('{enter}');
    cy.contains('button', 'Reserve').click();
    cy.contains('Please provide time').should('be.visible');
  });

  it('Provide date and time which endDate is less than startDate', () => {
    cy.get('[data-testid="spaceDatePicker"]').type("2024-05-01").type('{enter}');
    cy.get('[data-testid="spaceStartTime"]').type("10:00").type('{enter}');
    cy.get('[data-testid="spaceEndTime"]').type("9:00").type('{enter}');
    cy.wait(2000);
    cy.contains('button', 'Reserve').click();
    cy.contains('Invalid end time').should('be.visible');
  });

  it('Provide date and time which endDate is equal to startDate', () => {
    cy.get('[data-testid="spaceDatePicker"]').type("2024-05-01").type('{enter}');
    cy.get('[data-testid="spaceStartTime"]').type("10:00").type('{enter}');
    cy.get('[data-testid="spaceEndTime"]').type("10:00").type('{enter}');
    cy.wait(2000);
    cy.contains('button', 'Reserve').click();
    cy.contains('Invalid end time').should('be.visible');
  });

  it('Provide date and time which endDate is greater than startDate', () => {
    cy.get('[data-testid="spaceDatePicker"]').type("2024-05-01").type('{enter}');
    cy.get('[data-testid="spaceStartTime"]').type("10:00").type('{enter}');
    cy.get('[data-testid="spaceEndTime"]').type("11:00").type('{enter}');
    cy.wait(2000);
    cy.contains
    cy.contains('button', 'Reserve').click();
    cy.contains('Create successfully').should('be.visible');
  });
})

describe('US2-2 User can view amount of available seats of selected time', () => {
  beforeEach(() => {
    // Visit the login page and login
    cy.visit('/login');
    cy.get('input[name="email"]').type('torrak@gmail.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    // Visit one space page
    cy.visit('/space/662f51b9519d18088daacf91');
    cy.wait(3000)
  });

  it('TC45 logged in user can see the available time', () => {
    cy.get('[data-testid="spaceStartTime"]').should('exist');
    cy.get('[data-testid="spaceStartTime"]').should('exist');
    cy.get('[data-testid="availableSeat"]').should('not.exist');
  })
  it('TC46 logged in user with time provided can see the amount of available seat', () => {
    cy.get('[data-testid="spaceDatePicker"]').type("2024-05-01").type('{enter}');
    cy.get('[data-testid="spaceStartTime"]').type("10:00").type('{enter}');
    cy.get('[data-testid="spaceEndTime"]').type("11:00").type('{enter}');
    cy.wait(3000);
    cy.get('[data-testid="availableSeat"]').should('exist');
  })
})

describe('US2-3 User should edit a reservation with valid time', () => {
  beforeEach(() => {
    // Visit the login page and login
    // cy.visit('/space/6621e0dd0ca3b59b54586983');
    cy.visit('/login');
    cy.get('input[name="email"]').type('torrak@gmail.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.visit('/booking/manage');
    cy.wait(1000)
    cy.get('[data-testid="reservationtest"]').last().contains('Edit').click();
    cy.wait(5000)
  });


  it('Provide valid time', () => {
    cy.get('[data-testid="spaceDatePicker"]').clear().type("2024-05-03").type('{enter}');
    cy.get('[data-testid="spaceStartTime"]').clear().type("10:30").type('{enter}');
    cy.get('[data-testid="spaceEndTime"]').clear().type("11:30").type('{enter}');
    cy.wait(2000)
    cy.contains('button', 'Save Change').click();
    cy.contains('Update successfully').should('be.visible');
  });

  it('Provide invalid time', () => {
    cy.get('[data-testid="spaceDatePicker"]').clear().type("2024-05-03").type('{enter}');
    cy.get('[data-testid="spaceStartTime"]').clear().type("11:30").type('{enter}');
    cy.get('[data-testid="spaceEndTime"]').get(".ant-picker-clear").last().click();
    cy.wait(2000)
    cy.contains('button', 'Save Change').click();
    cy.contains('Cannot update Reservation').should('be.visible');
  });
})