<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default SEO
    |--------------------------------------------------------------------------
    |
    | These values are used by default for all pages that don't specify their
    | own SEO settings.
    |
    */
    'default_title' => 'SQUEEN VIP - Trusted Online Casino in Malaysia',
    'default_description' => 'SQUEEN VIP is Malaysia\'s most trusted online casino since 2012. Enjoy sports betting, live casino, online slots, fishing games, lottery, and esports with free credit no deposit offers.',
    'default_keywords' => 'SQUEEN VIP, online casino Malaysia, sports betting, live casino, online slots, fishing games, lottery, esports, free credit no deposit, trusted casino',
    'logo' => '/images/logo.png',

    /*
    |--------------------------------------------------------------------------
    | JSON-LD Structured Data
    |--------------------------------------------------------------------------
    |
    | This data is used to generate the JSON-LD script for search engines.
    | It represents the organization's information.
    |
    */
    'json_ld' => [
        '@context' => 'https://schema.org',
        '@type' => 'Organization',
        'name' => 'SQUEEN VIP',
        'url' => env('APP_URL', 'http://localhost'),
        'logo' => env('APP_URL', 'http://localhost') . '/images/logo.png',
        'description' => 'SQUEEN VIP is Malaysia\'s most trusted online casino since 2012, offering sports betting, live casino, online slots, fishing games, lottery, and esports with free credit no deposit offers.',
        'address' => [
            '@type' => 'PostalAddress',
            'addressLocality' => 'Malaysia',
            'addressCountry' => 'MY',
        ],
        'contactPoint' => [
            '@type' => 'ContactPoint',
            'contactType' => 'customer service',
            'email' => 'support@squeenvip.com',
        ],
        'sameAs' => [
            'https://www.facebook.com/squeenvip',
            'https://www.instagram.com/squeenvip',
            'https://www.twitter.com/squeenvip',
        ],
        'foundingDate' => '2012',
        'serviceArea' => [
            '@type' => 'Place',
            'name' => 'Malaysia',
        ],
        'offers' => [
            '@type' => 'Offer',
            'name' => 'Free Credit No Deposit Casino Games',
            'description' => 'Enjoy top casino games with free credit no deposit offers',
            'category' => 'Online Casino Games',
        ],
    ],
];
