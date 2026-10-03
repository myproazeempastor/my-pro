<?php
declare(strict_types=1);

namespace App\Models;

use PDO;

class Donation
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function createPending(array $data): string
    {
        $reference = $data['reference'];
        $stmt = $this->db->prepare("
            INSERT INTO donations (
                reference, donor_name, donor_email, donor_phone, donor_country,
                amount, currency, project_id, payment_method, payment_status,
                transaction_id, is_anonymous, notes, ip_address
            ) VALUES (
                :reference, :donor_name, :donor_email, :donor_phone, :donor_country,
                :amount, :currency, :project_id, :payment_method, :payment_status,
                :transaction_id, :is_anonymous, :notes, :ip_address
            )
        ");

        $stmt->execute([
            ':reference' => $reference,
            ':donor_name' => $data['donor_name'],
            ':donor_email' => $data['donor_email'],
            ':donor_phone' => $data['donor_phone'] ?? null,
            ':donor_country' => $data['donor_country'] ?? 'United States',
            ':amount' => $data['amount'],
            ':currency' => $data['currency'] ?? 'USD',
            ':project_id' => !empty($data['project_id']) ? (int)$data['project_id'] : null,
            ':payment_method' => $data['payment_method'],
            ':payment_status' => $data['payment_status'] ?? 'pending',
            ':transaction_id' => $data['transaction_id'] ?? null,
            ':is_anonymous' => !empty($data['is_anonymous']) ? 1 : 0,
            ':notes' => $data['notes'] ?? null,
            ':ip_address' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'
        ]);

        return $reference;
    }

    public function markConfirmed(string $reference, string $transactionId, bool $isAdminAdjustment = false): bool
    {
        $stmt = $this->db->prepare("
            UPDATE donations
            SET payment_status = 'confirmed',
                transaction_id = :transaction_id,
                admin_adjusted = :admin_adjusted,
                confirmed_at = NOW()
            WHERE reference = :reference AND payment_status != 'confirmed'
        ");
        return $stmt->execute([
            ':reference' => $reference,
            ':transaction_id' => $transactionId,
            ':admin_adjusted' => $isAdminAdjustment ? 1 : 0
        ]);
    }

    public function findByReference(string $reference): ?array
    {
        $stmt = $this->db->prepare("
            SELECT d.*, p.title AS project_title
            FROM donations d
            LEFT JOIN projects p ON d.project_id = p.id
            WHERE d.reference = :reference
            LIMIT 1
        ");
        $stmt->execute([':reference' => $reference]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function getRecentConfirmed(int $limit = 10): array
    {
        $stmt = $this->db->prepare("
            SELECT d.reference, d.amount, d.currency, d.created_at, d.is_anonymous,
                   CASE WHEN d.is_anonymous = 1 THEN 'Faithful Supporter' ELSE d.donor_name END AS display_name,
                   p.title AS project_title
            FROM donations d
            LEFT JOIN projects p ON d.project_id = p.id
            WHERE d.payment_status = 'confirmed'
            ORDER BY d.id DESC
            LIMIT :limit
        ");
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function getAllForAdmin(?string $status = null, int $limit = 100): array
    {
        $sql = "
            SELECT d.*, p.title AS project_title
            FROM donations d
            LEFT JOIN projects p ON d.project_id = p.id
        ";
        $params = [];
        if ($status) {
            $sql .= " WHERE d.payment_status = :status";
            $params[':status'] = $status;
        }
        $sql .= " ORDER BY d.id DESC LIMIT " . (int)$limit;

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }
}
