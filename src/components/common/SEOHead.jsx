import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SEOHead({ title, description, keywords, image, type = "website", schema }) {
  const location = useLocation();
  const canonicalUrl = `https://bookflow-saas.com${location.pathname}`;

  useEffect(() => {
    // 1. Update Document Title
    const baseTitle = "BookFlow — Premier Online Bookstore & SaaS Commerce";
    document.title = title ? `${title} | BookFlow` : baseTitle;

    // Helper to set or create meta tag
    const setMeta = (nameAttr, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(nameAttr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 2. Standard Meta Tags
    setMeta("name", "description", description || "Discover thousands of bestsellers, literature, and digital book commerce management.");
    if (keywords) setMeta("name", "keywords", keywords);

    // 3. Open Graph Tags
    setMeta("property", "og:title", title ? `${title} | BookFlow` : baseTitle);
    setMeta("property", "og:description", description || "Discover thousands of bestsellers on BookFlow.");
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", type);
    if (image) setMeta("property", "og:image", image);

    // 4. Twitter Tags
    setMeta("name", "twitter:title", title ? `${title} | BookFlow` : baseTitle);
    setMeta("name", "twitter:description", description || "Discover thousands of bestsellers on BookFlow.");
    if (image) setMeta("name", "twitter:image", image);

    // 5. Update Canonical link
    let canonical = document.querySelector("link[rel='canonical']");
    if (canonical) {
      canonical.setAttribute("href", canonicalUrl);
    }

    // 6. Custom JSON-LD Schema if provided
    let scriptTag = document.getElementById("page-dynamic-schema");
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "page-dynamic-schema";
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, keywords, image, type, canonicalUrl, schema]);

  return null;
}

