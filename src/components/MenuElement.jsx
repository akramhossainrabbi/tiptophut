const MenuElement = ({ element }) => {
  const target = element.is_newtab ? "_blank" : "_self";

  switch (element.type) {
    case "link":
      return (
        <li>
          <a href={element.link ?? "#"} target={target}>
            {element.title?.en}
          </a>
        </li>
      );

    case "category":
      if (element.element_details?.status !== 1) return null;
      return (
        <li>
          <a
            href={`/category/${element.element_details.slug}`}
            target={target}
          >
            {element.title?.en}
          </a>
        </li>
      );

    case "product":
      return (
        <li>
          <a
            href={`/product/${element.product?.slug}`}
            target={target}
          >
            {element.title?.en}
          </a>
        </li>
      );

    case "brand":
      return (
        <li>
          <a href={`/brand/${element.brand?.slug}`} target={target}>
            {element.title?.en}
          </a>
        </li>
      );

    case "page":
      return (
        <li>
          <a href={`/${element.page?.slug}`} target={target}>
            {element.title?.en}
          </a>
        </li>
      );

    case "tag":
      return (
        <li>
          <a href={`/tag/${element.tag?.name}`} target={target}>
            {element.title?.en}
          </a>
        </li>
      );

    default:
      return null;
  }
};
export default MenuElement;