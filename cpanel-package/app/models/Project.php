<?php
declare(strict_types=1);

namespace App\Models;

use PDO;

class Project
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function getFeatured(int $limit = 6): array
    {
        $stmt = $this->db->prepare("
            SELECT p.*, 
                   COALESCE(SUM(d.amount), 0) AS verified_raised,
                   COUNT(DISTINCT d.id) AS verified_donors
            FROM projects p
            LEFT JOIN donations d ON p.id = d.project_id AND d.payment_status = 'confirmed'
            WHERE p.status = 'active' AND p.is_featured = 1
            GROUP BY p.id
            ORDER BY p.id DESC
            LIMIT :limit
        ");
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function getAllActive(): array
    {
        $stmt = $this->db->query("
            SELECT p.*, 
                   COALESCE(SUM(d.amount), 0) AS verified_raised,
                   COUNT(DISTINCT d.id) AS verified_donors
            FROM projects p
            LEFT JOIN donations d ON p.id = d.project_id AND d.payment_status = 'confirmed'
            WHERE p.status != 'archived'
            GROUP BY p.id
            ORDER BY p.is_featured DESC, p.id DESC
        ");
        return $stmt->fetchAll();
    }

    public function findBySlug(string $slug): ?array
    {
        $stmt = $this->db->prepare("
            SELECT p.*, 
                   COALESCE(SUM(d.amount), 0) AS verified_raised,
                   COUNT(DISTINCT d.id) AS verified_donors
            FROM projects p
            LEFT JOIN donations d ON p.id = d.project_id AND d.payment_status = 'confirmed'
            WHERE p.slug = :slug
            GROUP BY p.id
            LIMIT 1
        ");
        $stmt->execute([':slug' => $slug]);
        $res = $stmt->fetch();
        return $res ?: null;
    }

    public function findById(int $id): ?array
    {
        $stmt = $this->db->prepare("
            SELECT p.*, 
                   COALESCE(SUM(d.amount), 0) AS verified_raised,
                   COUNT(DISTINCT d.id) AS verified_donors
            FROM projects p
            LEFT JOIN donations d ON p.id = d.project_id AND d.payment_status = 'confirmed'
            WHERE p.id = :id
            GROUP BY p.id
            LIMIT 1
        ");
        $stmt->execute([':id' => $id]);
        $res = $stmt->fetch();
        return $res ?: null;
    }

    public function create(array $data): int
    {
        $stmt = $this->db->prepare("
            INSERT INTO projects (slug, title, category, location, summary, description, image_url, goal_amount, currency, is_featured, status, start_date, seo_title, seo_description)
            VALUES (:slug, :title, :category, :location, :summary, :description, :image_url, :goal_amount, :currency, :is_featured, :status, :start_date, :seo_title, :seo_description)
        ");
        $stmt->execute([
            ':slug' => $data['slug'],
            ':title' => $data['title'],
            ':category' => $data['category'],
            ':location' => $data['location'],
            ':summary' => $data['summary'],
            ':description' => $data['description'],
            ':image_url' => $data['image_url'],
            ':goal_amount' => $data['goal_amount'],
            ':currency' => $data['currency'] ?? 'USD',
            ':is_featured' => $data['is_featured'] ? 1 : 0,
            ':status' => $data['status'] ?? 'active',
            ':start_date' => $data['start_date'] ?? date('Y-m-d'),
            ':seo_title' => $data['seo_title'] ?? null,
            ':seo_description' => $data['seo_description'] ?? null
        ]);
        return (int)$this->db->lastInsertId();
    }

    public function update(int $id, array $data): bool
    {
        $stmt = $this->db->prepare("
            UPDATE projects 
            SET slug = :slug, title = :title, category = :category, location = :location,
                summary = :summary, description = :description, image_url = :image_url,
                goal_amount = :goal_amount, currency = :currency, is_featured = :is_featured,
                status = :status, seo_title = :seo_title, seo_description = :seo_description
            WHERE id = :id
        ");
        return $stmt->execute([
            ':id' => $id,
            ':slug' => $data['slug'],
            ':title' => $data['title'],
            ':category' => $data['category'],
            ':location' => $data['location'],
            ':summary' => $data['summary'],
            ':description' => $data['description'],
            ':image_url' => $data['image_url'],
            ':goal_amount' => $data['goal_amount'],
            ':currency' => $data['currency'],
            ':is_featured' => $data['is_featured'] ? 1 : 0,
            ':status' => $data['status'],
            ':seo_title' => $data['seo_title'] ?? null,
            ':seo_description' => $data['seo_description'] ?? null
        ]);
    }
}
