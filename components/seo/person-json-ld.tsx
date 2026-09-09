import { education, profile, roles, socialLinks } from "@/content";
import { siteConfig } from "@/lib/site";

/**
 * schema.org Person markup so search engines and AI crawlers can read the
 * résumé without executing the page's JavaScript.
 */
export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    url: siteConfig.url,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    sameAs: socialLinks.filter((link) => link.href.startsWith("http")).map((link) => link.href),
    alumniOf: education.map((entry) => ({
      "@type": "CollegeOrUniversity",
      name: entry.institution,
    })),
    worksFor: {
      "@type": "Organization",
      name: roles[0]?.company,
    },
    knowsAbout: [
      "Retrieval-Augmented Generation",
      "Multi-Agent AI Systems",
      "LLM Inference Optimization",
      "MLOps",
      "Cloud Architecture",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
