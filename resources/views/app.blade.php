<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- SEO Meta Tags --}}
    @php
        // 获取页面级 SEO 数据
        $pageSeo = $page['props']['seo'] ?? [];
        // 获取全局 SEO 配置
        $globalSeo = $page['props']['shared_seo'] ?? [];

        // 合并 SEO 数据，页面级优先
        $seoTitle = $pageSeo['title'] ?? $globalSeo['default_title'] ?? 'ONE TEAM SOLUTION Digital Marketing Agency';
        $seoDescription = $pageSeo['description'] ?? $globalSeo['default_description'] ?? 'One-Stop Solutions Marketing Agency based in Kuala Lumpur, Malaysia.';
        $seoKeywords = $pageSeo['keywords'] ?? $globalSeo['default_keywords'] ?? 'digital marketing, seo, web design, malaysia';
        $seoImage = $pageSeo['image'] ?? $globalSeo['logo'] ?? '/images/logo.png';
        $seoUrl = $pageSeo['url'] ?? url()->current();
    @endphp

    <title>{{ $seoTitle }}</title>
    <meta name="description" content="{{ $seoDescription }}">
    <meta name="keywords" content="{{ $seoKeywords }}">
    <meta name="robots" content="noindex, nofollow">
    {{-- Open Graph --}}
    <meta property="og:title" content="{{ $seoTitle }}">
    <meta property="og:description" content="{{ $seoDescription }}">
    <meta property="og:image" content="{{ url($seoImage) }}">
    <meta property="og:url" content="{{ $seoUrl }}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="{{ $globalSeo['json_ld']['name'] ?? config('app.name') }}">

    {{-- Twitter Cards --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $seoTitle }}">
    <meta name="twitter:description" content="{{ $seoDescription }}">
    <meta name="twitter:image" content="{{ url($seoImage) }}">

    {{-- Additional SEO --}}
    <link rel="canonical" href="{{ $seoUrl }}">

    {{-- JSON-LD Structured Data --}}
    @if(isset($globalSeo['json_ld']))
        <script type="application/ld+json">
        {!! json_encode($globalSeo['json_ld'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}
        </script>
    @endif

    <meta name="robots" content="index, follow">
    <meta name="author" content="ONE TEAM SOLUTION Digital Marketing Agency">

    @routes
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
    />
</head>
<body>
    @inertia
</body>
</html>
