import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ photos, openModal }) {
  return (
    <ul>
      {photos.map(({ id, slug, urls }) => (
        <li
          key={id}
          onClick={() => openModal({ id, url: urls.full, title: slug })}
        >
          <ImageCard url={urls.small} title={slug} />
        </li>
      ))}
    </ul>
  );
}
