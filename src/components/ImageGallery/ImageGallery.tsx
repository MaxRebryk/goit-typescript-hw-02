import ImageCard from "../ImageCard/ImageCard";
import { Photo } from "../App/App";

type Props = {
  photos: Photo[];
  openModal: (image: { id: string; url: string; title: string }) => void;
};

export default function ImageGallery({ photos, openModal }: Props) {
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
