import React from "react";
import MenuBar from "../component/MenuBar";
import { useContext } from "react";
import UrlContext from "../context/UrlContext";
import ThreeDotLoading from "../component/Loading";
import * as Yup from "yup";
import { useFormik } from "formik";
import UrlList from "../component/UrlList";

function HomePage() {
  const urlContext = useContext(UrlContext);
  const { loading, ShortenUrls, editUrl, selectedUrl, edit } = urlContext;

  const token = localStorage.getItem("token");

  const urlformdata = useFormik({
    initialValues: {
      longUrl: "",
      tinyUrl: "",
    },
    validationSchema: Yup.object().shape({
      longUrl: Yup.string().url("Invalid URL").required("URL is required"),
      tinyUrl: Yup.string().required("Alias is required"),
    }),
    onSubmit: (userdata) => {
      if (!edit) {
        ShortenUrls(userdata, token);
      } else {
        const url = { ...selectedUrl, ...userdata };
        editUrl(url, token);
      }
    },
  });

  return (
    <>
      <div className="container-fluid pt-2" id="Home">
        <MenuBar />
        <div className="row mx-3 justify-content-between">
          <div className="col-12 col-md-6 mt-5">
            <form onSubmit={urlformdata.handleSubmit}>
              <div className="card p-4">
                <h5 className="card-title mb-4">Shorten a long URL</h5>
                <input
                  className="form-control mb-3"
                  id="longUrl"
                  label="longUrl"
                  name="longUrl"
                  value={urlformdata.values.longUrl}
                  onChange={urlformdata.handleChange}
                  placeholder="Enter the long URL"
                />
                {urlformdata.errors.longUrl && (
                  <div className="text-danger">
                    {urlformdata.errors.longUrl}
                  </div>
                )}

                <div className="d-flex align-items-center mb-3">
                  <input
                    className="form-control flex-grow-1 me-2"
                    type="text"
                    placeholder="https://tinyshortner.onrender.com"
                    disabled
                  />
                  <input
                    className="form-control flex-grow-1"
                    type="text"
                    id="tinyUrl"
                    label="tinyUrl"
                    name="tinyUrl"
                    placeholder="Enter alias"
                    value={urlformdata.values.tinyUrl}
                    onChange={urlformdata.handleChange}
                  />
                </div>
                {urlformdata.errors.tinyUrl && (
                  <div className="text-danger">{urlformdata.errors.tinyUrl}</div>
                )}

                <div className="d-flex justify-content-end">
                  {!edit ? (
                    <button type="submit" className="btn btn-success mt-3">
                      Shorten URL
                    </button>
                  ) : (
                    <div className="btn-group mt-3" role="group">
                      <button type="submit" className="btn btn-success me-2">
                        Shorten URL
                      </button>
                      <button type="submit" className="btn btn-warning">
                        Update URL
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="col-12 col-md-6 mt-5">
            <UrlList urlformdata={urlformdata} />
          </div>
        </div>
      </div>
      {loading && <ThreeDotLoading />}
    </>
  );
}

export default HomePage;
