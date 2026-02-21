import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = [], 
  image = 'https://astrai.tech/og-image.jpg', // Default OG image
  url = 'https://astrai.tech', 
  type = 'website' 
}) => {
  const { language } = useLanguage();
  
  const siteTitle = 'Astrai.tech // Silicon Genesis';
  const defaultDescription = 'A Logic-Driven, Data-Fed Silicon Genesis. Astrai Tech incubates digital universes through autonomous logic and biomimetic directing systems.';
  
  const metaTitle = title ? `${title} | Astrai.tech` : siteTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = ['AI', 'Generative AI', 'Filmmaking', 'Automation', 'Astrai', 'Loom', 'Shorts', ...keywords].join(', ');

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="Astrai Tech" />
      <html lang={language === 'zh-TW' ? 'zh-Hant' : 'en'} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Astrai.tech" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
