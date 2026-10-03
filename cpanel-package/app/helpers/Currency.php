<?php
declare(strict_types=1);

namespace App\Helpers;

class Currency
{
    private static array $symbols = [
        'USD' => '$',
        'GBP' => '£',
        'CAD' => 'CA$',
        'AUD' => 'A$',
        'EUR' => '€'
    ];

    public static function format(float|string $amount, string $currency = 'USD'): string
    {
        $symbol = self::$symbols[$currency] ?? $currency . ' ';
        $num = (float)$amount;
        return $symbol . number_format($num, 2);
    }

    public static function symbol(string $currency = 'USD'): string
    {
        return self::$symbols[$currency] ?? '$';
    }

    /**
     * Converts major currency units to integer cents/minor units (for Stripe)
     */
    public static function toMinorUnits(float|string $amount): int
    {
        return (int)round(((float)$amount) * 100);
    }
}
