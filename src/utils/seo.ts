// SEO Utilities

export const setMetaTag = (name: string, content: string) => {
  let meta = document.querySelector(`meta[name="${name}"]`);
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
};

export const setOpenGraphTag = (property: string, content: string) => {
  let meta = document.querySelector(`meta[property="${property}"]`);
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
};

export const setTitle = (title: string) => {
  document.title = title;
};

export const setDescription = (description: string) => {
  setMetaTag('description', description);
  setOpenGraphTag('og:description', description);
};

export const setImage = (imageUrl: string) => {
  setOpenGraphTag('og:image', imageUrl);
  setMetaTag('image', imageUrl);
};

export const initializeSEO = () => {
  setMetaTag('viewport', 'width=device-width, initial-scale=1.0');
  setMetaTag('theme-color', '#6366f1');
  setMetaTag('author', 'RepairHub Pro');
  setMetaTag('robots', 'index, follow');
  
  // Open Graph
  setOpenGraphTag('og:type', 'website');
  setOpenGraphTag('og:site_name', 'RepairHub Pro');
  setOpenGraphTag('og:locale', 'uk_UA');
  
  // Twitter Card
  setMetaTag('twitter:card', 'summary_large_image');
  setMetaTag('twitter:site', '@repairhubpro');
  
  // App-specific
  setMetaTag('application-name', 'RepairHub Pro');
  setMetaTag('mobile-web-app-capable', 'yes');
};

// Structured data for SEO
export const generateStructuredData = (data: {
  name: string;
  description: string;
  url: string;
  logo?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: data.name,
    description: data.description,
    url: data.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'UAH',
    },
    ...(data.logo && {
      logo: data.logo,
    }),
  };
};
