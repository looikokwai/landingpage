<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PageController extends Controller
{
    public function home()
    {
        return Inertia::render('Home', [
            'seo' => [
                'title' => 'Leading Digital Marketing Agency | ONE TEAM SOLUTION',
                'description' => 'ONE TEAM SOLUTION is a One-Stop Solutions Marketing Agency founded in Kuala Lumpur, Malaysia. We provide top-notch digital marketing services.',
                'keywords' => 'digital marketing agency malaysia, seo company in malaysia, digital marketing solutions, one-stop marketing',
                'image' => '/images/logo.png',
                'url' => url('/'),
            ],
        ]);
    }
}
