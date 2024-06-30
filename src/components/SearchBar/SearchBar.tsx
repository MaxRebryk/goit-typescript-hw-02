import React from "react";
import { Formik, Form, Field } from "formik";
import css from "./SearchBar.module.css";

type SearchBarProps = {
  onSearch: (query: string | null) => void;
};

type FormValues = {
  search: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const initialValues: FormValues = { search: "" };

  const handleSubmit = (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (values.search === "") {
      onSearch(null);
    } else {
      onSearch(values.search);
      resetForm();
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <Field
          className={css.search}
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
};

export default SearchBar;
