import { FaLink } from 'react-icons/fa';
import { CopyButton } from './CopyButton';

export const LinksRow = ({ coin }) => {
  return (
    <div className=" content-center">
      {coin.links.blockchain_site.slice(0, 3).map((link, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center gap-2 p-4 bg-[var(--card)] rounded-sm mt-8 first:mt-2"
        >
          <a target="_blank" rel="noopener noreferrer" href={link} title={link}>
            <FaLink />
          </a>
          <div className="truncate">{link}</div>
          <CopyButton textToCopy={link} />
        </div>
      ))}
    </div>
  );
};
