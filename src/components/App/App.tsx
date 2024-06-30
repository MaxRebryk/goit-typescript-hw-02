import React, { useState, useEffect } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { Toaster, toast } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SearchBar from "../SearchBar/SearchBar";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import "./App.css";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";

export type Photo = {
  id: string;
  slug: string;
  urls: {
    full: string;
    small: string;
  };
};

function App() {
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleSearch = (query: string | null): void => {
    if (query === null) {
      toast.error("Please enter a search word");
    } else {
      setPage(1);
      setSearchText(query);
      setPhotos([]);
    }
  };

  const openModal = (image: Photo): void => {
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
