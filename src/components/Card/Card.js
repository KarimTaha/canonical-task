import "./Card.scss";

const Card = ({ postData }) => {
    // Search in the _embedded.wp:term arrays for the post topic, assumes that the post has 1 topic
    const getTopic = () => {
        const termsArray = postData._embedded["wp:term"];
        for (let termGroup of termsArray) {
            for (let term of termGroup) {
                console.log(term);
                if (term.taxonomy == "topic" && term.id == postData.topic[0]) {
                    return term.name;
                }
            }
        }
        // A post can have no topics from the sample data..
        return "Topic Placeholder"
    }

    // Search in the _embedded.wp:term arrays for the post category, assumes that the post has 1 category
    const getCategory = () => {
        const termsArray = postData._embedded["wp:term"];
        for (let termGroup of termsArray) {
            for (let term of termGroup) {
                console.log(term);
                if (term.taxonomy == "category" && term.id == postData.categories[0]) {
                    // A full mapping is needed if this field is the correct one
                    return term.name=="Articles"?"Article":"Category Placeholder";
                }
            }
        }
        // A post always has a category from sample data
        return "Category Placeholder"
    }

  var date = new Date(postData.date_gmt);

  return (
    <div className="p-card col-4 card">
      <h4 className="semi-bold">{getTopic()}</h4>
      <hr />
      <img className="p-image" src={postData.featured_media} alt=""></img>
      <h3 className="p-card__content semi-bold">
        <a href={postData.link}>{postData.title.rendered}</a>
      </h3>
      {/* This can be moved to bottom-container if it should be aligned at the bottom */}
      <h4 className="signature semi-bold">
        By <a href={postData._embedded.author[0].link}>{postData._embedded.author[0].name}</a> on{" "}
        {date.toLocaleString("en-gb", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </h4>
      <div className="bottom-container">
        <hr />
        <p className="bottom-item semi-bold">{getCategory()}</p>
      </div>
    </div>
  );
};

export default Card;
