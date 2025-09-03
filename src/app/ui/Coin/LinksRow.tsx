import { FaLink } from 'react-icons/fa';
import { CopyButton } from './CopyButton';

export const LinksRow = ({ coin }) => {
  return (
    <div className="content-center">
      {coin.links.blockchain_site.slice(0, 3).map((link, idx) => (
        <div
          key={idx}
          className="mt-8 flex items-center justify-between gap-2 rounded-sm bg-[var(--card)] p-4 first:mt-2"
        >
          <a target="_blank" rel="noopener   noreferrer" href={link} title={link}>
            <FaLink />
          </a>
          <div className="truncate">{link}</div>
          <CopyButton textToCopy={link} />
        </div>
      ))}
    </div>
  );
};
