<?php

namespace App\Http\Controllers;

use App\Models\MarqueeText;
use App\Models\BannerImage;
use App\Models\WinnersLeaderboard;
use App\Models\GameSection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // 获取滚动文字数据
        $marqueeTexts = MarqueeText::active()
            ->ordered()
            ->get(['text']);

        // 获取横幅图片数据
        $bannerImages = BannerImage::active()
            ->ordered()
            ->get(['title', 'image_path', 'link_url'])
            ->map(function ($banner) {
                $banner->image_path = $banner->image_path ? '/storage/' . $banner->image_path : null;
                return $banner;
            });

        // 获取获奖者排行榜数据
        $winnersData = [
            'latest_winner' => WinnersLeaderboard::active()
                ->byCategory('latest_winner')
                ->ordered()
                ->get(['game_name', 'player_name', 'bet_amount', 'multiplier', 'winning_amount', 'background_color']),
            'high_roller' => WinnersLeaderboard::active()
                ->byCategory('high_roller')
                ->ordered()
                ->get(['game_name', 'player_name', 'bet_amount', 'multiplier', 'winning_amount', 'background_color']),
            'wager_contest' => WinnersLeaderboard::active()
                ->byCategory('wager_contest')
                ->ordered()
                ->get(['game_name', 'player_name', 'bet_amount', 'multiplier', 'winning_amount', 'background_color']),
        ];

        // 获取游戏分类数据
        $gameSections = GameSection::active()
            ->ordered()
            ->get(['section_name', 'section_type', 'games_data'])
            ->map(function ($section) {
                if ($section->games_data && is_array($section->games_data)) {
                    $section->games_data = array_map(function ($game) {
                        if (isset($game['image'])) {
                            $game['image'] = '/storage/' . $game['image'];
                        }
                        return $game;
                    }, $section->games_data);
                }
                return $section;
            });

        return Inertia::render('Home', [
            'seo' => [
                'title' => 'SQUEEN VIP - Trusted Online Casino in Malaysia',
                'description' => 'Welcome to SQUEEN VIP, the most trusted online casino in Malaysia since 2012.',
                'keywords' => 'SQUEEN VIP, online casino, Malaysia, trusted casino',
                'image' => '/images/logo.png',
                'url' => url('/'),
            ],
            'marqueeTexts' => $marqueeTexts,
            'bannerImages' => $bannerImages,
            'winnersData' => $winnersData,
            'gameSections' => $gameSections,
        ]);
    }
}
