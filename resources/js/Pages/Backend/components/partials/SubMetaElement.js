import {useSelector} from 'react-redux';
import {Head, Link} from "@inertiajs/inertia-react";
import React, {useEffect} from 'react';

const SubMetaElement = ({
  title = null,
  image = null,
  description = null,
  address = null,
  mobile = null,
  whatsapp = null,
  email = null,
}) => {
  const {settings} = useSelector((state) => state);
  const router = useRouter();

  return (
    <Head>
      <meta
        http-equiv="Content-type"
        charSet="utf-8"
        content="text/html; charset=utf-8"
      />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <link href={settings.logo} rel="shortcut icon" type="image/png" />
      <meta name={settings.company} content="E-commerce" />
      <meta key="keywords" name="keywords" content={settings.company} />
      <meta key="author" name="author" content={settings.company} />
      <meta key="logo" name="logo" content={settings.logo} />
      <meta key="email" name="email" content={email} />
      <meta key="address" name="address" content={address} />
      <meta key="mobile" name="mobile" content={mobile} />
      <meta key="whatsapp" name="whatsapp" content={whatsapp} />
      <meta key="name" name="name" content={title} />
      <meta key="lang" name="lang" content={router.locale} />
      <meta name="description" key="description" content={`${description}`} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={`${description}`} />
      <meta itemProp="image" content={image ? image : settings.logo} />
      <meta property="og:type" content="website" key="ogtype" />
      <meta property="og:site_name" content={`${title}`} key="ogsitename" />
      <meta
        property="og:url"
        content={`${mainUrl}/${router.asPath}`}
        key="ogurl"
      />
      <meta property="og:title" content={`${title}`} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta
        property="og:image"
        content={image ? image : settings.logo}
        key="ogimage"
      />
    </Head>
  );
};

export default SubMetaElement;
