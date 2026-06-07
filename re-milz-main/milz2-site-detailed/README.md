# Milz2 Return Support Site - Detailed Version

米国から日本への帰国サポートサイトの静的HTML一式です。
Cloudflare Pages / GitHub Pages にそのままアップできます。

## ページ構成

- `index.html` トップ
- `jobs.html` 求人一覧
- `job-detail.html` 求人詳細
- `moving.html` 引越し・手続き
- `moving-detail.html` 手続き詳細
- `moving-checklist.html` 帰国チェックリスト
- `insurance.html` 保険
- `insurance-detail.html` 保険詳細
- `housing.html` 住まい
- `housing-detail.html` 住まい詳細
- `articles.html` お役立ち記事一覧
- `article-detail.html` 記事詳細
- `support-companies.html` サポート企業一覧
- `company-detail.html` サポート企業詳細
- `company.html` 法人の方へ
- `faq.html` よくある質問
- `dashboard.html` マイページ風
- `login.html` ログイン
- `signup.html` 無料会員登録
- `css/style.css` 共通CSS

## Cloudflare Pages 設定

- Framework preset: None
- Build command: 空欄
- Build output directory: `/` または `.`
- Root directory: 空欄
- Production branch: main

`index.html` がリポジトリ直下にある状態でアップしてください。


## Admin pages

静的モックの管理画面を `admin/` 以下に追加しています。

- `admin/index.html` ダッシュボード
- `admin/inquiries.html` お問い合わせ管理
- `admin/inquiry-detail.html` お問い合わせ詳細
- `admin/articles.html` 記事管理
- `admin/article-edit.html` 記事追加・編集
- `admin/users.html` 登録者管理
- `admin/user-detail.html` 登録者詳細
- `admin/emails.html` 一括メール配信
- `admin/jobs.html` 求人管理
- `admin/job-edit.html` 求人追加・編集
- `admin/companies.html` 企業管理
- `admin/company-edit.html` 企業追加・編集
- `admin/checklists.html` チェックリスト管理
- `admin/analytics.html` 分析
- `admin/settings.html` 設定
- `admin/audit-log.html` 操作ログ
- `admin/login.html` 管理者ログイン

現在はフロント側UIのみです。実運用では認証、DB、メール配信API、権限管理を接続してください。
