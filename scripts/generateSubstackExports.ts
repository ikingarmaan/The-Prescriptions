import fs from 'fs';
import path from 'path';
import { ALL_ARTICLES } from '../src/data/blog/articlesIndex';
import { BlogArticle } from '../src/data/blog/types';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function articleToHtml(article: BlogArticle): string {
  let html = '';

  if (article.subtitle) {
    html += `<p class="lead"><em>${article.subtitle}</em></p>\n\n`;
  }

  const coverImageUrl = article.heroImage.startsWith('http')
    ? article.heroImage
    : `https://www.theprescription.in${article.heroImage}`;
  html += `<figure><img src="${coverImageUrl}" alt="${escapeXml(article.heroImageAlt || article.title)}" /><figcaption>${escapeXml(article.heroImageAlt || article.title)}</figcaption></figure>\n\n`;

  for (const section of article.sections) {
    html += `<h2>${section.heading}</h2>\n`;

    for (const paragraph of section.content) {
      html += `<p>${paragraph}</p>\n`;
    }

    if (section.callout) {
      html += `<blockquote><strong>${section.callout.title}</strong><br/>${section.callout.text}</blockquote>\n`;
    }

    if (section.quote) {
      html += `<blockquote><p>“${section.quote.text}”</p><cite>— ${section.quote.author}</cite></blockquote>\n`;
    }

    if (section.table) {
      html += `<table>\n<thead>\n<tr>`;
      for (const h of section.table.headers) {
        html += `<th>${escapeXml(h)}</th>`;
      }
      html += `</tr>\n</thead>\n<tbody>\n`;
      for (const row of section.table.rows) {
        html += `<tr>`;
        for (const cell of row) {
          html += `<td>${escapeXml(cell)}</td>`;
        }
        html += `</tr>\n`;
      }
      html += `</tbody>\n</table>\n`;
    }

    html += `\n`;
  }

  if (article.keyTakeaways && article.keyTakeaways.length > 0) {
    html += `<h2>Key Clinical Takeaways for Patients</h2>\n<ul>\n`;
    for (const takeaway of article.keyTakeaways) {
      html += `  <li>${takeaway}</li>\n`;
    }
    html += `</ul>\n\n`;
  }

  const disclaimer = article.medicalDisclaimer || 'This guide is published for educational health literacy purposes only and does not replace individualized clinical judgment from a licensed physician or pharmacist.';
  html += `<hr />\n`;
  html += `<p><small><em>Medical Disclaimer: ${disclaimer} Originally published on <a href="https://www.theprescription.in/article/${article.slug}">Theprescription</a>.</em></small></p>\n`;

  return html;
}

function articleToFullWebPage(article: BlogArticle): string {
  const coverImageUrl = article.heroImage.startsWith('http')
    ? article.heroImage
    : `https://www.theprescription.in${article.heroImage}`;
  const articleHtml = articleToHtml(article);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeXml(article.title)} | Theprescription</title>
  <meta name="description" content="${escapeXml(article.excerpt)}">
  <link rel="canonical" href="https://www.theprescription.in/article/${article.slug}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeXml(article.title)}">
  <meta property="og:description" content="${escapeXml(article.excerpt)}">
  <meta property="og:image" content="${coverImageUrl}">
  <meta property="og:url" content="https://www.theprescription.in/article/${article.slug}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeXml(article.title)}">
  <meta name="twitter:description" content="${escapeXml(article.excerpt)}">
  <meta name="twitter:image" content="${coverImageUrl}">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.75; color: #1e293b; max-width: 820px; margin: 0 auto; padding: 24px 16px; background-color: #f8fafc; }
    article { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 36px 32px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    h1 { font-size: 2.25rem; font-weight: 800; line-height: 1.25; color: #0f172a; margin-top: 0; margin-bottom: 12px; }
    .lead { font-size: 1.15rem; color: #475569; font-style: italic; margin-bottom: 20px; }
    .meta-bar { display: flex; flex-wrap: wrap; gap: 16px; font-size: 0.875rem; color: #64748b; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; }
    .meta-bar strong { color: #0f172a; }
    img { max-width: 100%; height: auto; border-radius: 12px; margin: 24px 0; border: 1px solid #e2e8f0; }
    figcaption { font-size: 0.85rem; color: #64748b; text-align: center; margin-top: -16px; margin-bottom: 24px; font-style: italic; }
    h2 { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-top: 36px; margin-bottom: 14px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
    p { margin-bottom: 16px; font-size: 1.05rem; }
    blockquote { border-left: 4px solid #10b981; background: #ecfdf5; padding: 16px 20px; border-radius: 8px; margin: 24px 0; color: #065f46; }
    table { width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 0.95rem; }
    th, td { border: 1px solid #cbd5e1; padding: 10px 14px; text-align: left; }
    th { background: #f1f5f9; font-weight: 700; color: #0f172a; }
    tr:nth-child(even) { background-color: #f8fafc; }
    .app-cta { background: linear-gradient(135deg, #064e3b 0%, #0f172a 100%); color: white; padding: 20px 24px; border-radius: 14px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; gap: 16px; }
    .app-cta a { background: #34d399; color: #064e3b; padding: 10px 20px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block; white-space: nowrap; }
    .app-cta a:hover { background: #6ee7b7; }
    ul, ol { padding-left: 24px; margin-bottom: 20px; font-size: 1.05rem; }
    li { margin-bottom: 8px; }
  </style>
</head>
<body>
  <div class="app-cta">
    <div>
      <div style="font-weight: 800; font-size: 1.1rem; margin-bottom: 2px;">Theprescription.in</div>
      <div style="font-size: 0.85rem; opacity: 0.9;">AI Prescription Deciphering &amp; Medication Literacy Platform</div>
    </div>
    <a href="https://www.theprescription.in/#blog/${article.slug}">Open in Interactive App &rarr;</a>
  </div>
  <article>
    <h1>${escapeXml(article.title)}</h1>
    <p class="lead">${escapeXml(article.subtitle)}</p>
    <div class="meta-bar">
      <span>By <strong>${article.author.name}</strong> (${article.author.role})</span>
      <span>• Category: <strong>${article.categoryLabel}</strong></span>
      <span>• Reading Time: <strong>${article.readTime}</strong></span>
      <span>• Words: <strong>${article.wordCount}</strong></span>
    </div>
    ${articleHtml}
  </article>
</body>
</html>`;
}

function articleToMarkdown(article: BlogArticle): string {
  let md = `# ${article.title}\n\n`;
  if (article.subtitle) {
    md += `> *${article.subtitle}*\n\n`;
  }
  md += `**Author:** ${article.author.name} (${article.author.role})  \n`;
  md += `**Category:** ${article.categoryLabel} | **Read Time:** ${article.readTime} | **Word Count:** ${article.wordCount} words\n\n`;

  const coverImageUrl = article.heroImage.startsWith('http')
    ? article.heroImage
    : `https://www.theprescription.in${article.heroImage}`;
  md += `![${article.heroImageAlt || article.title}](${coverImageUrl})\n\n`;

  for (const section of article.sections) {
    md += `## ${section.heading}\n\n`;
    for (const paragraph of section.content) {
      md += `${paragraph}\n\n`;
    }
    if (section.callout) {
      md += `> 💡 **${section.callout.title}**\n> ${section.callout.text}\n\n`;
    }
    if (section.quote) {
      md += `> “${section.quote.text}”\n> — *${section.quote.author}*\n\n`;
    }
    if (section.table) {
      md += `| ${section.table.headers.join(' | ')} |\n`;
      md += `| ${section.table.headers.map(() => '---').join(' | ')} |\n`;
      for (const row of section.table.rows) {
        md += `| ${row.join(' | ')} |\n`;
      }
      md += `\n`;
    }
  }

  if (article.keyTakeaways && article.keyTakeaways.length > 0) {
    md += `## Key Clinical Takeaways for Patients\n\n`;
    for (const takeaway of article.keyTakeaways) {
      md += `- ${takeaway}\n`;
    }
    md += `\n`;
  }

  const disclaimer = article.medicalDisclaimer || 'This guide is published for educational health literacy purposes only and does not replace individualized clinical judgment from a licensed physician or pharmacist.';
  md += `---\n\n*Medical Disclaimer: ${disclaimer} Originally published on [Theprescription](https://www.theprescription.in/article/${article.slug}).*\n`;

  return md;
}

function generateWordPressWxr(articles: BlogArticle[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/"
>
<channel>
  <title>Theprescription Clinical Health Articles</title>
  <link>https://www.theprescription.in</link>
  <description>Medical Literacy, Prescription Abbreviations, and Doctor Handwriting Deciphering</description>
  <pubDate>Sun, 13 Sep 2026 12:00:00 +0000</pubDate>
  <language>en-US</language>
  <wp:wxr_version>1.2</wp:wxr_version>
  <wp:base_site_url>https://www.theprescription.in</wp:base_site_url>
  <wp:base_blog_url>https://www.theprescription.in</wp:base_blog_url>

  <wp:author>
    <wp:author_id>1</wp:author_id>
    <wp:author_login><![CDATA[theprescription]]></wp:author_login>
    <wp:author_email><![CDATA[theprescriptionn@gmail.com]]></wp:author_email>
    <wp:author_display_name><![CDATA[Mohd Armaan]]></wp:author_display_name>
    <wp:author_first_name><![CDATA[Mohd]]></wp:author_first_name>
    <wp:author_last_name><![CDATA[Armaan]]></wp:author_last_name>
  </wp:author>
`;

  const baseTimestamp = Date.now();
  let postId = 100;

  articles.forEach((article, index) => {
    postId++;
    // Space out articles by 1 day so Substack detects 17 distinct posts without duplicates
    const itemDate = new Date(baseTimestamp - (articles.length - index) * 86400000);
    const rfcDate = itemDate.toUTCString();
    const formattedIso = itemDate.toISOString().replace('T', ' ').substring(0, 19);
    const postUrl = `https://www.theprescription.in/article/${article.slug}`;
    const htmlContent = articleToHtml(article);

    xml += `
  <item>
    <title><![CDATA[${article.title}]]></title>
    <link>${postUrl}</link>
    <pubDate>${rfcDate}</pubDate>
    <dc:creator><![CDATA[${article.author?.name || 'Mohd Armaan'}]]></dc:creator>
    <guid isPermaLink="true">${postUrl}</guid>
    <description><![CDATA[${article.excerpt}]]></description>
    <content:encoded><![CDATA[${htmlContent}]]></content:encoded>
    <excerpt:encoded><![CDATA[${article.excerpt}]]></excerpt:encoded>
    <wp:post_id>${postId}</wp:post_id>
    <wp:post_date><![CDATA[${formattedIso}]]></wp:post_date>
    <wp:post_date_gmt><![CDATA[${formattedIso}]]></wp:post_date_gmt>
    <wp:comment_status><![CDATA[open]]></wp:comment_status>
    <wp:ping_status><![CDATA[open]]></wp:ping_status>
    <wp:post_name><![CDATA[${article.slug}]]></wp:post_name>
    <wp:status><![CDATA[publish]]></wp:status>
    <wp:post_parent>0</wp:post_parent>
    <wp:menu_order>0</wp:menu_order>
    <wp:post_type><![CDATA[post]]></wp:post_type>
    <wp:post_password><![CDATA[]]></wp:post_password>
    <wp:is_sticky>0</wp:is_sticky>
    <category domain="category" nicename="${article.category}"><![CDATA[${article.categoryLabel}]]></category>
  </item>`;
  });

  xml += `
</channel>
</rss>`;

  return xml;
}

function generateRssFeed(articles: BlogArticle[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
  <title>Theprescription Health &amp; Clinical Guides</title>
  <link>https://www.theprescription.in</link>
  <description>Comprehensive guides to doctor handwriting deciphering, prescription codes, generic pharmacology, and patient safety.</description>
  <language>en-US</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="https://www.theprescription.in/feed.xml" rel="self" type="application/rss+xml"/>
`;

  const baseTimestamp = Date.now();

  articles.forEach((article, index) => {
    // Unique sequential timestamps 1 day apart
    const itemDate = new Date(baseTimestamp - (articles.length - index) * 86400000);
    const rfcDate = itemDate.toUTCString();
    const postUrl = `https://www.theprescription.in/article/${article.slug}`;
    const coverImageUrl = article.heroImage.startsWith('http')
      ? article.heroImage
      : `https://www.theprescription.in${article.heroImage}`;
    const htmlContent = articleToHtml(article);

    xml += `  <item>
    <title><![CDATA[${article.title}]]></title>
    <link>${postUrl}</link>
    <guid isPermaLink="true">${postUrl}</guid>
    <pubDate>${rfcDate}</pubDate>
    <author>theprescriptionn@gmail.com (${article.author?.name || 'Mohd Armaan'})</author>
    <category><![CDATA[${article.categoryLabel}]]></category>
    <description><![CDATA[${article.excerpt}]]></description>
    <content:encoded><![CDATA[${htmlContent}]]></content:encoded>
    <enclosure url="${coverImageUrl}" type="image/png" length="150000"/>
  </item>
`;
  });

  xml += `</channel>
</rss>`;
  return xml;
}

async function main() {
  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, 'public');
  const markdownDir = path.join(rootDir, 'articles_for_substack');
  const articlesHtmlDir = path.join(publicDir, 'article');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (!fs.existsSync(markdownDir)) {
    fs.mkdirSync(markdownDir, { recursive: true });
  }
  if (!fs.existsSync(articlesHtmlDir)) {
    fs.mkdirSync(articlesHtmlDir, { recursive: true });
  }

  console.log(`Processing ${ALL_ARTICLES.length} articles for Substack...`);

  // 1. Pre-render 17 static HTML web pages for crawler / bot / Substack direct scraper access
  ALL_ARTICLES.forEach((article) => {
    const articleFolder = path.join(articlesHtmlDir, article.slug);
    if (!fs.existsSync(articleFolder)) {
      fs.mkdirSync(articleFolder, { recursive: true });
    }
    const htmlPage = articleToFullWebPage(article);
    fs.writeFileSync(path.join(articleFolder, 'index.html'), htmlPage, 'utf-8');
  });
  console.log(`✅ Pre-rendered 17 static HTML articles under /public/article/*/index.html`);

  // 2. Generate WordPress WXR XML for Substack Import
  const wxrXml = generateWordPressWxr(ALL_ARTICLES);
  const wxrPath = path.join(publicDir, 'theprescription-substack-export.xml');
  fs.writeFileSync(wxrPath, wxrXml, 'utf-8');
  console.log(`✅ Generated Substack Import XML: ${wxrPath}`);

  // 3. Generate Standard RSS Feed XML with clean URLs and distinct dates
  const rssXml = generateRssFeed(ALL_ARTICLES);
  const rssPath = path.join(publicDir, 'feed.xml');
  fs.writeFileSync(rssPath, rssXml, 'utf-8');
  console.log(`✅ Generated RSS Feed: ${rssPath}`);

  // 4. Generate Standalone Markdown Files
  let indexReadme = `# Theprescription Articles Collection (Substack Ready)\n\nThis directory contains all 17 articles formatted in clean Markdown, ready to import or copy into Substack.\n\n`;
  indexReadme += `| # | Article Title | Category | Words | Markdown File |\n|---|---|---|---|---|\n`;

  ALL_ARTICLES.forEach((article, index) => {
    const numStr = String(index + 1).padStart(2, '0');
    const filename = `${numStr}_${article.slug}.md`;
    const filepath = path.join(markdownDir, filename);
    const mdContent = articleToMarkdown(article);

    fs.writeFileSync(filepath, mdContent, 'utf-8');
    indexReadme += `| ${index + 1} | [${article.title}](${filename}) | ${article.categoryLabel} | ${article.wordCount} | \`${filename}\` |\n`;
  });

  fs.writeFileSync(path.join(markdownDir, 'README.md'), indexReadme, 'utf-8');
  console.log(`✅ Generated 17 Standalone Markdown Articles in ${markdownDir}`);
  console.log(`All Substack exports generated successfully!`);
}

main().catch(err => {
  console.error('Export error:', err);
  process.exit(1);
});
