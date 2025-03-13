/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        // Adicionando produto ao carrinho
        cy.get('[class="product-block grid"]')
            .contains('Abominable Hoodie').click()
        cy.get('.button-variable-item-M').click()
        cy.get('.button-variable-item-Green').click()
        cy.get('.input-text').clear().type(2)
        cy.get('.single_add_to_cart_button').click()
        
        // Verificando o carrinho e prosseguindo para o checkout
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', 2)
        cy.get('.woocommerce-message').should('contain', '2 × "Abominable Hoodie" foram adicionados no seu carrinho.')
        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .view-cart').click()
        
        // Prosseguindo para o checkout
        cy.get('.checkout-button').click()
        
        // Preenchendo os detalhes de faturamento
        cy.get('#billing_first_name').clear().type('Test')
        cy.get('#billing_last_name').clear().type('User')
        cy.get('#billing_company').clear().type('EBAC')
        cy.get('#select2-billing_country-container').click().type('Brasil{enter}')
        cy.get('#billing_address_1').clear().type('Test Street')
        cy.get('#billing_address_2').clear().type('123')
        cy.get('#billing_city').clear().type('Test City')
        cy.get('#select2-billing_state-container').click().type('São Paulo{enter}')
        cy.get('#billing_postcode').clear().type('12345678')
        cy.get('#billing_phone').clear().type('11999999999')
        cy.get('#billing_email').clear().type('test@test.com')
        
        // Selecionando método de pagamento e finalizando pedido
        cy.get('#payment_method_bacs').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()
        
        // Confirmando o sucesso do pedido
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
});
