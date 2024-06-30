type Props = {
  url: string;
  title: string;
};

export default function ImageCard({ url, title }: Props) {
  return (
    <div>
      <img src={url} alt={title} width="300" height="300" />
    </div>
  );
}
