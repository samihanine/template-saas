import Image from 'next/image';

import image from 'public/images/logo.png';

export const LogoText: React.FC<{ className: string }> = (props) => (
  <Image src={image} alt="Logo with text" {...props} />
);
