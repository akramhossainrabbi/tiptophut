export const getMenuLink = (element) => {
  if (!element) return '/';
  
  // Destructure for cleaner access
  const { type, category, brand, tag, product, link } = element;
  
  switch (type) {
    case 'category':
      return category?.slug ? `/category/${category.slug}` : '/shop';
    case 'brand':
      return brand?.slug ? `/brand/${brand.slug}` : '/shop';
    case 'tag':
      // Usually, tags have slugs too. If not, use the name sanitized.
      const tagSlug = tag?.slug || tag?.name?.toLowerCase().replace(/\s+/g, '-');
      return tagSlug ? `/tag/${tagSlug}` : '/shop';
    case 'product':
      return product?.slug ? `/product/${product.slug}` : '/';
    case 'custom':
    default:
      // Ensure custom links don't break if they are just strings like "https://..."
      return link || '/';
  }
};