import "./App.scss";
import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

function App() {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts on page load
    fetch(
      "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setPosts(result);
          setLoading(false);
        },
        (error) => {
          // Maybe show error component if there was an error fetching posts
          console.log(error);
          setLoading(false);
        }
      );
  }, []);

  return (
    <div className="l-application">
      <main className="l-main main-container">
        <h1>Canonical Blog</h1>
        <div className="row row-container">
          {!loading && posts?.length > 0 ? (
            posts.map(function (item, i) {
              return <Card postData={item} key={i}></Card>;
            })
          ) : // We can add a placeholder here for loading if the loading time is significant
          (
            <ClipLoader cssOverride={override} loading={loading} size={500} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
