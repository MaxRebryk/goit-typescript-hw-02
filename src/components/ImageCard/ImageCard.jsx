export default function ImageCard({ url, title }) {
  return (
    <div>
      <img src={url} alt={title} width="300" height="300" />
    </div>
  );
}
