import { Helmet } from 'react-helmet-async';
import { useAppSettings } from '../context/SettingsContext';
import { generateMetaTags, generateFaviconLink } from '../utils/metaService';

/**
 * Custom hook for setting dynamic meta tags and favicon
 * @param {Object} metaData - Meta data object
 * @returns {JSX.Element} - Helmet component with meta tags
 */
export const useMeta = (metaData = {}) => {
  const { generalSettings } = useAppSettings();

  // Get favicon from general settings or use default
  const faviconUrl = generalSettings?.favicon || '/favicon.png';
  const metaTags = generateMetaTags(metaData);
  // const faviconLink = generateFaviconLink(faviconUrl);

  return (
    <Helmet>
      <title>{metaData.title || 'TIPTOPHUT'}</title>
      {metaTags.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}
      {/* <link {...faviconLink} /> */}
    </Helmet>
  );
};

export default useMeta;
