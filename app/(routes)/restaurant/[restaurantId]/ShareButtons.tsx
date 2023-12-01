"use client";
import { usePathname } from 'next/navigation';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, RedditIcon, RedditShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';

export default function ShareButtons() {

  const pathname = usePathname();
  const url = `${process.env.NEXT_PUBLIC_HOST_URL}${pathname}`
  const title = 'Check out this restaurant!';

  return (
    <div className="flex justify-center items-center gap-2">
      <EmailShareButton url={url} title={title}>
        <EmailIcon size={30} round />
      </EmailShareButton>

      <RedditShareButton url={url}>
        <RedditIcon size={30} round />
      </RedditShareButton>

      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={30} round />
      </TwitterShareButton>

      <WhatsappShareButton url={url}>
        <WhatsappIcon size={30} round />
      </WhatsappShareButton>
    </div>
  );
}