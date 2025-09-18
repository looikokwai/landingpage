<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BannerImage;
use App\Models\GameSection;
use App\Models\MarqueeText;
use App\Models\WinnersLeaderboard;

class ContentDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 清空现有数据
        BannerImage::truncate();
        GameSection::truncate();
        MarqueeText::truncate();
        WinnersLeaderboard::truncate();

        // 1. 创建横幅图片数据
        $this->seedBannerImages();

        // 2. 创建游戏分类数据
        $this->seedGameSections();

        // 3. 创建滚动文字数据
        $this->seedMarqueeTexts();

        // 4. 创建获奖者排行榜数据
        $this->seedWinnersLeaderboard();
    }

    /**
     * 创建横幅图片数据
     */
    private function seedBannerImages(): void
    {
        $bannerImages = [
            [
                'title' => 'banner1',
                'image_path' => 'banners/tmD9FOzUyb8oRlSUy8AN6FFMq4i3mGT8U9ieyItE.jpg',
                'link_url' => null,
                'is_active' => true,
                'order' => 0,
            ],
        ];

        foreach ($bannerImages as $banner) {
            BannerImage::create($banner);
        }
    }

    /**
     * 创建游戏分类数据
     */
    private function seedGameSections(): void
    {
        $gameSections = [
            [
                'section_name' => 'PopularGames',
                'section_type' => 'popular_games',
                'games_data' => [
                    [
                        'rtp' => '96.5%',
                        'name' => 'Gates Of Olympus',
                        'image' => 'games/quE5xNeWX1FoQj4ZiA58TSdHzdoCcIGxJzITT88V.jpg',
                        'status' => 'new',
                        'provider' => 'pp',
                    ],
                    [
                        'rtp' => '222',
                        'name' => '2222',
                        'image' => 'games/xC1RFtZZK3LOqcQxt3hz0mDtYkhZfz4PLRRqNi2e.png',
                        'status' => 'hot',
                        'provider' => '222',
                    ],
                ],
                'is_active' => true,
                'order' => 1,
            ],
            [
                'section_name' => 'JackpotGames',
                'section_type' => 'jackpot_games',
                'games_data' => [
                    [
                        'rtp' => '11',
                        'name' => 'Gates Of Olympus',
                        'image' => 'games/tN1LbCjMu1QqibXWXf6tJ9NfzCxf5fossyXYS8MZ.png',
                        'status' => 'new',
                        'provider' => '11',
                    ],
                ],
                'is_active' => true,
                'order' => 2,
            ],
            [
                'section_name' => 'LiveCasino',
                'section_type' => 'live_casino',
                'games_data' => [
                    [
                        'rtp' => '96.5%',
                        'name' => 'Gates Of Olympus',
                        'image' => 'games/DdZjiOUwDtznIwU6ByuEBpK4UGT9Cv33SKvCxfpK.jpg',
                        'status' => 'new',
                        'provider' => 'pp',
                    ],
                ],
                'is_active' => true,
                'order' => 3,
            ],
            [
                'section_name' => 'Payment Gateway',
                'section_type' => 'payment_gateway',
                'games_data' => [
                    [
                        'rtp' => 'ShopeePay',
                        'name' => 'ShopeePay',
                        'image' => 'games/T6wPEkmNQ0Sp0kd5FHmcSn4XIYHhANaddI2pltmw.png',
                        'status' => 'none',
                        'provider' => 'ShopeePay',
                    ],
                ],
                'is_active' => true,
                'order' => 4,
            ],
            [
                'section_name' => 'GameProvider',
                'section_type' => 'gaming_provider',
                'games_data' => [
                    [
                        'rtp' => '0',
                        'name' => 'pp',
                        'image' => 'games/Vzg3LZ6zY0OJwEjJtWMY3zSVWcKvoUqHub0wQz6K.png',
                        'status' => 'hot',
                        'provider' => 'pp',
                    ],
                ],
                'is_active' => true,
                'order' => 5,
            ],
        ];

        foreach ($gameSections as $section) {
            GameSection::create($section);
        }
    }

    /**
     * 创建滚动文字数据
     */
    private function seedMarqueeTexts(): void
    {
        $marqueeTexts = [
            [
                'text' => '欢迎来到 SqueenVIP xxx xxx xxx xxx xxx',
                'is_active' => true,
                'order' => 0,
            ],
        ];

        foreach ($marqueeTexts as $marquee) {
            MarqueeText::create($marquee);
        }
    }

    /**
     * 创建获奖者排行榜数据
     */
    private function seedWinnersLeaderboard(): void
    {
        $winners = [
            [
                'game_name' => 'ABC',
                'player_name' => 'helloworld',
                'bet_amount' => 100.00,
                'multiplier' => '100x',
                'winning_amount' => 1000.00,
                'category' => 'latest_winner',
                'background_color' => '#f5f5f5',
                'is_active' => true,
                'order' => 0,
            ],
            [
                'game_name' => 'test2',
                'player_name' => 'helloworld22',
                'bet_amount' => 200.00,
                'multiplier' => '100x',
                'winning_amount' => 2000.00,
                'category' => 'latest_winner',
                'background_color' => '#ebebeb',
                'is_active' => true,
                'order' => 0,
            ],
        ];

        foreach ($winners as $winner) {
            WinnersLeaderboard::create($winner);
        }
    }
}
