
class SearchPage {
    elements = {
      searchInput: () => cy.get('input[name="q"]'),
      results: () => cy.get('[data-testid="result"]'),
      resultTitle: (index) => this.elements.results().eq(index).find('h2 span'),
      resultLink: (index) => this.elements.results().eq(index),
      denyAllCookiesButton: () => cy.get('button[class=" osano-cm-denyAll osano-cm-buttons__button osano-cm-button osano-cm-button--type_denyAll "]'),
      logo: () => cy.get('.navbar__logo'),
      nav: () => cy.get('nav')
    };
  
    visit(url) {
      cy.visit(url);
    }
  
    enterSearchQuery(query) {
      this.elements.searchInput().type(query);
    }
  
    submitSearch() {
      this.elements.searchInput().type('{enter}');
    }
  
    verifySearchResults() {
      this.elements.results().should('have.length.greaterThan', 1);
      this.elements.results().each(($el) => {
        cy.wrap($el).invoke('text').should('match', /cypress/i);
      });
    }
  
    removeFirstResult() {
      cy.wait(1000);
      this.elements.results().eq(0).invoke('remove');
      cy.wait(2000);
    }
  
    saveSecondResultTitleAsAlias() {
      this.elements.resultTitle(0).invoke('text').as('savedTitle');
    }
  
    clickSecondResult() {
      this.elements.resultLink(0).click();
    }
  
    verifyRedirectionAndPage(thisContext) {
      cy.url().should('include', 'cypress.io');
      cy.title().then((pageTitle) => {
        expect(pageTitle.trim()).to.eq(thisContext.savedTitle.trim());
      });
      cy.wait(2000)
      this.elements.denyAllCookiesButton().then((btn) => {
          if (Cypress.dom.isVisible(btn)) {
          cy.wrap(btn).click();
        }
      });;
      this.elements.logo().should('be.visible');
      this.elements.nav().should('be.visible');
    }
  }
  
  export const searchPage = new SearchPage();
  