import siteData from '../../content/site.json';
import type { SiteContent } from '../types/site';

export function useSiteContent(): SiteContent {
  return siteData as SiteContent;
}
