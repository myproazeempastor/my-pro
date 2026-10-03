<?php
declare(strict_types=1);
use App\Helpers\Security;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? Security::e($pageTitle) : 'Agape Light Network — Spreading Light, Living Love'; ?></title>
    <meta name="description" content="<?php echo isset($metaDescription) ? Security::e($metaDescription) : 'Agape Light Network: International Christian outreach led by Rev. Azeem Tariq. Guided by John 8:12.'; ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-navy: #0f172a;
            --accent-gold: #d97706;
            --gold-hover: #b45309;
            --gold-light: #fef3c7;
            --text-dark: #1e293b;
            --bg-light: #f8fafc;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: var(--bg-light); color: var(--text-dark); line-height: 1.6; }
        h1, h2, h3, .heading-serif { font-family: 'Cinzel', serif; }
        .top-scripture-bar { background: #020617; color: #fbbf24; text-align: center; font-size: 13px; padding: 8px 16px; border-bottom: 1px solid rgba(217, 119, 6, 0.3); }
        .navbar { background: #ffffff; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 1000; box-shadow: 0 2px 4px rgba(0,0,0,0.03); }
        .nav-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; }
        .brand-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--primary-navy); }
        .brand-title { font-weight: 800; font-size: 19px; letter-spacing: -0.5px; }
        .brand-tagline { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }
        .nav-links { display: flex; align-items: center; gap: 20px; list-style: none; }
        .nav-links a { text-decoration: none; color: #334155; font-weight: 500; font-size: 14px; transition: color 0.2s; }
        .nav-links a:hover { color: var(--accent-gold); }
        .dropdown { position: relative; display: inline-block; }
        .dropdown-content { display: none; position: absolute; top: 100%; left: 0; background-color: #ffffff; min-width: 180px; box-shadow: 0 8px 16px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 0; z-index: 1001; }
        .dropdown:hover .dropdown-content { display: block; }
        .dropdown-content a { display: block; padding: 8px 16px; font-size: 13px; color: #334155; text-decoration: none; }
        .dropdown-content a:hover { background-color: #f8fafc; color: var(--accent-gold); }
        .btn-gold { background: var(--accent-gold); color: white !important; padding: 10px 22px; border-radius: 6px; font-weight: 600; text-decoration: none; transition: background 0.2s; box-shadow: 0 2px 6px rgba(217,119,6,0.3); }
        .btn-gold:hover { background: var(--gold-hover); }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        @media (max-width: 900px) {
            .nav-links { display: none; }
        }
    </style>
</head>
<body>
    <div class="top-scripture-bar">
        <span>✝ &ldquo;I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.&rdquo; &mdash; <strong>John 8:12</strong></span>
    </div>

    <header class="navbar">
        <div class="nav-container">
            <a href="/" class="brand-logo">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.2"><path d="M12 2v20M7 8h10"/><circle cx="12" cy="5" r="1.5" fill="#d97706"/><path d="M4 14l2-2 3 3 5-5 6 6"/></svg>
                <div>
                    <div class="brand-title">AGAPE LIGHT NETWORK</div>
                    <div class="brand-tagline">Rev. Azeem Tariq &bull; International Ministry</div>
                </div>
            </a>

            <nav>
                <ul class="nav-links">
                    <li><a href="/">Home</a></li>
                    
                    <li class="dropdown">
                        <a href="/the-mission" style="cursor: pointer;">Mission & Vision ▾</a>
                        <div class="dropdown-content">
                            <a href="/the-mission">The Mission</a>
                            <a href="/the-john-812-mandate">The John 8:12 Mandate</a>
                            <a href="/strategic-blueprint" style="font-weight: 600; color: #d97706;">Strategic Blueprint (5-Year)</a>
                            <a href="/explore-church-vision">Explore Church Vision</a>
                            <a href="/frontline-leadership-origins">Frontline Leadership Origins</a>
                            <a href="/uncompromised-theology">Uncompromised Theology</a>
                        </div>
                    </li>

                    <li class="dropdown">
                        <a href="/direct-debt-rescue" style="cursor: pointer;">Frontline Rescue ▾</a>
                        <div class="dropdown-content">
                            <a href="/direct-debt-rescue">Direct Debt Rescue</a>
                            <a href="/post-rescue-protocol">Post-Rescue Protocol</a>
                            <a href="/next-gen-rescue-discipleship">Next-Gen Rescue Discipleship</a>
                            <a href="/womens-liberation-covering">Women's Liberation Covering</a>
                            <a href="/healing-crusades">Healing Crusades</a>
                            <a href="/pastors-training">Pastors Training</a>
                            <a href="/sponsor-a-project" style="font-weight: 600; color: #d97706;">Sponsor a Project</a>
                        </div>
                    </li>

                    <li class="dropdown">
                        <a href="/bible-translation-projects" style="cursor: pointer;">Scriptures ▾</a>
                        <div class="dropdown-content">
                            <a href="/bible-translation-projects">Bible Translation Projects</a>
                            <a href="/view-translation-projects">View Translation Projects</a>
                        </div>
                    </li>

                    <li class="dropdown">
                        <a href="/field-evidence" style="cursor: pointer;">Evidence ▾</a>
                        <div class="dropdown-content">
                            <a href="/field-evidence">Field Evidence</a>
                            <a href="/see-our-ground-impact">See Our Ground Impact</a>
                            <a href="/photo-gallery">Photo Gallery</a>
                            <a href="/video-evidence">Video Evidence</a>
                            <a href="/ministry-reports-stories">Ministry Reports & Stories</a>
                            <a href="/frontline-accountability" style="font-weight: 600; color: #059669;">Frontline Accountability</a>
                        </div>
                    </li>

                    <li class="dropdown">
                        <a href="/initiate-strategic-alliance" style="cursor: pointer;">Connect ▾</a>
                        <div class="dropdown-content">
                            <a href="/initiate-strategic-alliance">Initiate Strategic Alliance</a>
                            <a href="/shop">Ministry Resource Store</a>
                            <a href="/contact-us">Contact Us</a>
                        </div>
                    </li>

                    <li><a href="/donate" class="btn-gold">Donate Now</a></li>
                </ul>
            </nav>
        </div>
    </header>
