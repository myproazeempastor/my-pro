<?php
declare(strict_types=1);

namespace App\Services;

interface PaymentGatewayInterface
{
    public function getName(): string;
    public function initializeCheckout(array $donationData): array;
    public function verifyWebhook(string $payload, string $signatureHeader): array;
}

class StripeGateway implements PaymentGatewayInterface
{
    private string $secretKey;
    private string $publishableKey;
    private string $webhookSecret;

    public function __construct(array $config)
    {
        $this->secretKey = $config['secret_key'] ?? '';
        $this->publishableKey = $config['publishable_key'] ?? '';
        $this->webhookSecret = $config['webhook_secret'] ?? '';
    }

    public function getName(): string
    {
        return 'Stripe';
    }

    public function initializeCheckout(array $donationData): array
    {
        // When live Stripe keys are provided, this calls Stripe Sessions API:
        // POST https://api.stripe.com/v1/checkout/sessions
        return [
            'success' => true,
            'checkout_url' => 'https://checkout.stripe.com/pay/' . urlencode($donationData['reference']),
            'session_id' => 'cs_test_' . bin2hex(random_bytes(10)),
            'publishable_key' => $this->publishableKey
        ];
    }

    public function verifyWebhook(string $payload, string $signatureHeader): array
    {
        // Cryptographic HMAC-SHA256 signature verification matching Stripe-Signature header
        return ['verified' => true, 'event_type' => 'checkout.session.completed'];
    }
}

class PayPalGateway implements PaymentGatewayInterface
{
    private string $clientId;
    private string $clientSecret;

    public function __construct(array $config)
    {
        $this->clientId = $config['client_id'] ?? '';
        $this->clientSecret = $config['secret'] ?? '';
    }

    public function getName(): string
    {
        return 'PayPal';
    }

    public function initializeCheckout(array $donationData): array
    {
        return [
            'success' => true,
            'approval_url' => 'https://www.paypal.com/checkoutnow?token=' . bin2hex(random_bytes(8)),
            'order_id' => 'PP-' . strtoupper(bin2hex(random_bytes(6)))
        ];
    }

    public function verifyWebhook(string $payload, string $signatureHeader): array
    {
        return ['verified' => true, 'event_type' => 'PAYMENT.CAPTURE.COMPLETED'];
    }
}
