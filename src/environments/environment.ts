export const config = {
	production: false,
    
    apiKey: '',                                         // WooCommerce REST API Key.
    apiSecret: '',                                      // WooCommerce REST API Secret
    
    baseUrl: '{TU URL DE WORDPRESS}/wp-json/',          // Tu URL de Wordpress
    cc: 'cocart/v2',
    jwt: 'jwt-auth/v1',
    wp: 'wp/v2',
    wc: 'wc/v3',
    
    gmApiKey: '',                                       // Google Maps API Key
    gmUrl: '',                                          // Google Maps URL
    
    ourUser: '',                                        // Wordpress Admin User
    ourPassword: '',                                    // Wordpress Application Password for that admin

    mercadoPagoUrl: '',                                 // URL de Mercado Pago para acceder a las API
    mercadoPagoToken: '',                               // Access Token de Mercado Pago para un usuario vendedor
};