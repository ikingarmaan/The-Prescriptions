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
  html += `<p><small><em>Medical Disclaimer: ${disclaimer} Originally published on <a href="https://www.theprescription.in/#blog/${article.slug}">Theprescription</a>.</em></small></p>\n`;

  return html;
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
  md += `---\n\n*Medical Disclaimer: ${disclaimer} Originally published on [Theprescription](https://www.theprescription.in/#blog/${article.slug}).*\n`;

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

  let postId = 100;
  for (const article of articles) {
    postId++;
    const postDate = '2026-09-13 12:00:00';
    const postDateGmt = '2026-09-13 12:00:00';
    const postUrl = `https://www.theprescription.in/#blog/${article.slug}`;
    const htmlContent = articleToHtml(article);

    xml += `
  <item>
    <title><![CDATA[${article.title}]]></title>
    <link>${postUrl}</link>
    <pubDate>Sun, 13 Sep 2026 12:00:00 +0000</pubDate>
    <dc:creator><![CDATA[${article.author?.name || 'Mohd Armaan'}]]></dc:creator>
    <guid isPermaLink="false">${postUrl}</guid>
    <description><![CDATA[${article.excerpt}]]></description>
    <content:encoded><![CDATA[${htmlContent}]]></content:encoded>
    <excerpt:encoded><![CDATA[${article.excerpt}]]></excerpt:encoded>
    <wp:post_id>${postId}</wp:post_id>
    <wp:post_date><![CDATA[${postDate}]]></wp:post_date>
    <wp:post_date_gmt><![CDATA[${postDateGmt}]]></wp:post_date_gmt>
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
  }

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
  <lastBuildDate>Sun, 13 Sep 2026 12:00:00 +0000</lastBuildDate>
  <atom:link href="https://www.theprescription.in/feed.xml" rel="self" type="application/rss+xml"/>
`;

  for (const article of articles) {
    const postUrl = `https://www.theprescription.in/#blog/${article.slug}`;
    const coverImageUrl = article.heroImage.startsWith('http')
      ? article.heroImage
      : `https://www.theprescription.in${article.heroImage}`;
    const htmlContent = articleToHtml(article);

    xml += `  <item>
    <title><![CDATA[${article.title}]]></title>
    <link>${postUrl}</link>
    <guid>${postUrl}</guid>
    <pubDate>Sun, 13 Sep 2026 12:00:00 +0000</pubDate>
    <author>theprescriptionn@gmail.com (${article.author?.name || 'Mohd Armaan'})</author>
    <category><![CDATA[${article.categoryLabel}]]></category>
    <description><![CDATA[${article.excerpt}]]></description>
    <content:encoded><![CDATA[${htmlContent}]]></content:encoded>
    <enclosure url="${coverImageUrl}" type="image/png" length="100000"/>
  </item>
`;
  }

  xml += `</channel>
</rss>`;
  return xml;
}

async function main() {
  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, 'public');
  const markdownDir = path.join(rootDir, 'articles_for_substack');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (!fs.existsSync(markdownDir)) {
    fs.mkdirSync(markdownDir, { recursive: true });
  }

  console.log(`Processing ${ALL_ARTICLES.length} articles for Substack...`);

  // 1. Generate WordPress WXR XML for 1-Click Substack Import
  const wxrXml = generateWordPressWxr(ALL_ARTICLES);
  const wxrPath = path.join(publicDir, 'theprescription-substack-export.xml');
  fs.writeFileSync(wxrPath, wxrXml, 'utf-8');
  console.log(`✅ Generated Substack Import XML: ${wxrPath}`);

  // 2. Generate Standard RSS Feed XML
  const rssXml = generateRssFeed(ALL_ARTICLES);
  const rssPath = path.join(publicDir, 'feed.xml');
  fs.writeFileSync(rssPath, rssXml, 'utf-8');
  console.log(`✅ Generated RSS Feed: ${rssPath}`);

  // 3. Generate Standalone Markdown Files
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
