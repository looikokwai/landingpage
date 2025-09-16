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
    'default_title' => 'ONE TEAM SOLUTION Digital Marketing Agency',
    'default_description' => 'One-Stop Solutions Marketing Agency based in Kuala Lumpur, Malaysia.',
    'default_keywords' => 'digital marketing, seo, web design, malaysia',
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
        'name' => 'ONE TEAM SOLUTION Digital Marketing Agency',
        'url' => env('APP_URL', 'http://localhost'),
        'logo' => env('APP_URL', 'http://localhost') . '/images/logo.png',
        'description' => 'One-Stop Solutions Marketing Agency based in Kuala Lumpur, Malaysia.',
        'address' => [
            '@type' => 'PostalAddress',
            'streetAddress' => 'Suite A, Level 15, Menara TH Perdana, 1004 Jalan Sultan Ismail',
            'addressLocality' => 'Kuala Lumpur',
            'postalCode' => '50250',
            'addressCountry' => 'MY',
        ],
        'contactPoint' => [
            '@type' => 'ContactPoint',
            'telephone' => '+60-3-1234-5678',
            'contactType' => 'customer service',
            'email' => 'hello@oneteamsolution.com',
        ],
        'sameAs' => [
            'https://www.facebook.com/oneteamsolution',
            'https://www.linkedin.com/company/oneteamsolution',
            'https://www.instagram.com/oneteamsolution',
        ],
        'foundingDate' => '2008',
        'numberOfEmployees' => '70+',
        'serviceArea' => [
            '@type' => 'Place',
            'name' => 'Malaysia',
        ],
    ],
];
