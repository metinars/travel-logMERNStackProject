import classes from './AddDetails.module.css';

// eslint-disable-next-line react/prop-types
const AddDetails = ({ style }) => {
  // const [imageUrl, setImageUrl] = useState();
  // const imageUrlRef = useRef();

  // const ImageUrlAddHandler = async () => {
  //   await setImageUrl(imageUrlRef.current.value);
  //   console.log(imageUrl);
  //   imageUrlRef.current.value = '';
  // };
  let className = classes[style];

  return (
    <>
      <div className={className}>
        <div className={classes.containerDetail}>
          <div className={classes.detailItem}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" name="title" required />
          </div>
          <div className={classes.detailItem}>
            <label htmlFor="desc">Description</label>
            <textarea id="desc" name="desc" rows="5" required />
          </div>
          <div className={classes.detailItem}>
            <label htmlFor="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" name="imageUrl" required />
          </div>
          {/* <div>
            <label htmlFor="image">Image Url</label>
            <div className={classes.inputGroup}>
              <input
                ref={imageUrlRef}
                type="text"
                name="image"
                id="image"
                autoComplete="off"
              />
              <button type="button" onClick={ImageUrlAddHandler}>
                Add
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AddDetails;
