import { Formik, Form, Field } from "formik";

import css from "./SearchBar.module.css";
export default function SearchBar({ onSearch }) {
  const initialValues = { search: "" };
  const handleSubmit = (values, { resetForm }) => {
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
}
