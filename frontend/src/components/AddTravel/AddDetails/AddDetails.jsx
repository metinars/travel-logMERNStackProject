import classes from './AddDetails.module.css';

// eslint-disable-next-line react/prop-types
const AddDetails = ({ style }) => {
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
        </div>
      </div>
    </>
  );
};

export default AddDetails;
