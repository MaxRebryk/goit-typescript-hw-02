import { useState, useEffect } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { Toaster, toast } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SearchBar from "../SearchBar/SearchBar";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import "./App.css";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Modal from "react-modal";

function App() {
  const [searchText, setSearchText] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [photos, setPhotos] = useState([]);

  const [page, setPage] = useState(1);

  const [modalIsOpen, setIsOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleSearch = (query) => {
    if (query === null) {
      toast.error("Please enter a search word");
    } else {
      setPage(1);
      setSearchText(query);
      setPhotos([]);
      console.log(`Searching for: ${query}1`);
      console.log(`Searching for: ${searchText}2`);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  useEffect(() => {
    if (searchText === "") {
      return;
    }
    async function fetchArticles() {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              client_id: "H4HNrmFXhNjnQNh92mNQ0TbGH0bI6bMeyU7qVrSHo-U",
              query: searchText,
              page: page,
              per_page: 8,
            },
          }
        );

        setPhotos((prevState) => [...prevState, ...response.data.results]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [searchText, page]);

  useEffect(() => {
    // Встановлюємо елемент програми для react-modal
    Modal.setAppElement("#root");

    return () => {
      // Забираємо елемент програми при видаленні компонента
      Modal.setAppElement(null);
    };
  }, []);

  return (
    <>
      <div>
        <SearchBar onSearch={handleSearch} />
        {loading && (
          <RotatingLines
            visible={true}
            height="50"
            width="50"
            color="grey"
            strokeColor="black"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        )}

        {error && <ErrorMessage />}
        <Toaster position="top-left" reverseOrder={false} />
        <ImageModal
          modalIsOpen={modalIsOpen}
          selectedImage={selectedImage}
          isOpen={setIsOpen}
        />
        <ImageGallery photos={photos} openModal={openModal} />
        {photos.length > 0 && !loading && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
      </div>
    </>
  );
}

export default App;
