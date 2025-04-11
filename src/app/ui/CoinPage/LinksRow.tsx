import { FaLink } from 'react-icons/fa';
import { CopyButton } from './CopyButton';

export const LinksRow = ({ coin }) => {
  return (
    <>
      <div className="flex justify-between items-center gap-2 px-2 bg-[var(--card)] rounded-sm">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={coin.links.blockchain_site[0]}
          title={coin.links.blockchain_site[0]}
        >
          <FaLink />
        </a>
        <div className="truncate">{coin.links.blockchain_site[0]}</div>

        <CopyButton textToCopy={coin.links.blockchain_site[0]} />
      </div>
      <div className="flex justify-between items-center gap-2 px-2 bg-[var(--card)] rounded-sm">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={coin.links.blockchain_site[1]}
          title={coin.links.blockchain_site[1]}
        >
          <FaLink />
        </a>
        <div className="truncate">{coin.links.blockchain_site[1]}</div>
        <CopyButton textToCopy={coin.links.blockchain_site[1]} />
      </div>
      <div className="flex justify-between items-center gap-2 px-2 bg-[var(--card)] rounded-sm">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={coin.links.blockchain_site[2]}
          title={coin.links.blockchain_site[2]}
        >
          {' '}
          <FaLink />
        </a>
        <div className="truncate">{coin.links.blockchain_site[2]}</div>
        <CopyButton textToCopy={coin.links.blockchain_site[2]} />
      </div>
    </>
  );
};
